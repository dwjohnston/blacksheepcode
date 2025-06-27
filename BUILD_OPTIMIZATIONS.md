# Build Performance Optimizations

This document outlines the build performance improvements implemented for the blacksheepcode blog.

## Overview

The build pipeline was taking too long due to several bottlenecks:
- Sequential processing of 67+ MDX files
- Sequential frontmatter extraction
- Missing build caching
- Network dependencies during build
- Outdated GitHub Actions

## Optimizations Implemented

### 1. Parallel File Processing

**Before**: Files were processed sequentially, one by one
**After**: Files are processed in parallel with configurable concurrency

- `utils/transformMdxParallel.ts`: Parallel MDX compilation (default: 10 concurrent files)
- `utils/extractFrontMatterParallel.ts`: Parallel frontmatter extraction (default: 10 concurrent files)

**Performance Impact**: 
- MDX compilation: ~67 files processed in ~3 seconds
- Frontmatter extraction: ~260ms total

### 2. Build Dependencies Optimization

**Added**:
- `sharp` package for faster image optimization
- Font fallbacks to reduce network dependencies
- Next.js compiler optimizations in `next.config.js`

### 3. GitHub Actions Improvements

**Updated**:
- `actions/checkout@v2` → `actions/checkout@v4`
- `actions/setup-node@v2` → `actions/setup-node@v4`
- Added npm caching with `cache: 'npm'`
- Added Next.js build cache
- Added Cypress binary caching

### 4. Performance Monitoring

**Added**:
- `scripts/build-with-metrics.sh`: Measures and reports build performance
- Performance metrics saved to `build-performance.json`

## Usage

### Standard Build
```bash
npm run build
```

### Build with Performance Metrics
```bash
npm run build:optimized
```

### Individual Generation Steps
```bash
npm run generate:mdx      # Parallel MDX compilation
npm run generate:mdxjson  # Parallel frontmatter extraction
npm run generate:all      # All generation steps
```

## Configuration

### Parallel Processing Concurrency

Both parallel processors accept a `maxConcurrency` parameter:

```typescript
// Default: 10 concurrent operations
await compileMDXFilesParallel(inputPath, outputPath, writeFileFn, 10);
await extractFrontMatterParallel(folderPath, writeFn, appendFn, generateFn, writeFileSync, 10);
```

### Environment Variables

- `NEXT_TELEMETRY_DISABLED=1`: Disables Next.js telemetry for faster builds

## Performance Metrics

The build process now reports:
- Generation time (MDX + frontmatter + other assets)
- Next.js build time
- Total build time

Example output:
```
📊 Build Performance Summary:
  Generation time: 6000ms
  Next.js build time: 15000ms
  Total build time: 21000ms
```

## Future Optimizations

Potential additional improvements:
1. Incremental builds (only process changed files)
2. Build result caching between CI runs
3. Further network dependency optimization
4. Bundle analysis and optimization