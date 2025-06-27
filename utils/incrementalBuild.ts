import fs from "fs-extra";
import path from "path";

/**
 * Check if source files are newer than generated files
 * Returns true if regeneration is needed
 */
export async function needsRegeneration(
  sourceDir: string,
  outputDir: string,
  extensions: string[] = ['.mdx']
): Promise<{ needsRegen: boolean; sourceFiles: string[]; reason: string }> {
  try {
    // Check if output directory exists
    if (!await fs.pathExists(outputDir)) {
      return {
        needsRegen: true,
        sourceFiles: [],
        reason: 'Output directory does not exist'
      };
    }

    // Get all source files
    const sourceFiles = await getFilesRecursively(sourceDir, extensions);
    
    if (sourceFiles.length === 0) {
      return {
        needsRegen: false,
        sourceFiles: [],
        reason: 'No source files found'
      };
    }

    // Find the newest source file
    let newestSourceTime = 0;
    for (const file of sourceFiles) {
      const stats = await fs.stat(file);
      newestSourceTime = Math.max(newestSourceTime, stats.mtime.getTime());
    }

    // Find the oldest output file (if any exist)
    const outputFiles = await getFilesRecursively(outputDir, ['.mjs', '.json']);
    
    if (outputFiles.length === 0) {
      return {
        needsRegen: true,
        sourceFiles,
        reason: 'No output files found'
      };
    }

    let oldestOutputTime = Infinity;
    for (const file of outputFiles) {
      const stats = await fs.stat(file);
      oldestOutputTime = Math.min(oldestOutputTime, stats.mtime.getTime());
    }

    const needsRegen = newestSourceTime > oldestOutputTime;
    const reason = needsRegen 
      ? `Source files newer than output (${new Date(newestSourceTime).toISOString()} > ${new Date(oldestOutputTime).toISOString()})`
      : 'Output files are up to date';

    return {
      needsRegen,
      sourceFiles,
      reason
    };

  } catch (error) {
    return {
      needsRegen: true,
      sourceFiles: [],
      reason: `Error checking files: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function getFilesRecursively(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await getFilesRecursively(fullPath, extensions);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }
  
  return files;
}

/**
 * Smart generation that only runs if needed
 */
export async function smartGenerate(
  sourceDir: string,
  outputDir: string,
  generationFn: () => Promise<void>,
  stepName: string
): Promise<{ skipped: boolean; reason: string }> {
  const check = await needsRegeneration(sourceDir, outputDir);
  
  if (!check.needsRegen) {
    console.log(`⚡ Skipping ${stepName}: ${check.reason}`);
    return { skipped: true, reason: check.reason };
  }
  
  console.log(`🔄 Running ${stepName}: ${check.reason}`);
  await generationFn();
  return { skipped: false, reason: check.reason };
}