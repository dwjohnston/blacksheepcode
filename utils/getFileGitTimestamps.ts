
/**
 * Generated using ChatGPT
 */

import { $ } from 'bun'


/**
 * 
 * @param filePath 
 * @returns 
 */
export async function getFileGitTimestamps(filePath: string)  : Promise<{createdAt: Date, lastEditedAt: Date}>{
    const result = await $`git log --follow --format=${"%H %at"} -- ${filePath}`.quiet().nothrow();
    if (result.exitCode !== 0) {
        throw `Error: ${result.stderr.toString()}`;
    }

    const commits = result.stdout.toString().trim().split('\n');
    if (commits.length === 0) {
        throw `No git history found for file: ${filePath}`;
    }

    const firstCommit = commits[commits.length - 1].split(' ');
    const lastCommit = commits[0].split(' ');

    return {
        createdAt: new Date(parseInt(firstCommit[1], 10) * 1000),
        lastEditedAt: new Date(parseInt(lastCommit[1], 10) * 1000),
    };
}
