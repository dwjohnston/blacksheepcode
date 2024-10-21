
/**
 * Generated using ChatGPT
 */

import { exec } from 'child_process'


/**
 * 
 * @param filePath 
 * @returns 
 */
export async function getFileGitTimestamps(filePath: string)  : Promise<{createdAt: Date, lastEditedAt: Date}>{
    return new Promise((resolve, reject) => {
        exec(`git log --follow --format="%H %at" -- "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error: ${stderr}`);
            }

            const commits = stdout.trim().split('\n');
            if (commits.length === 0) {
                return reject(`No git history found for file: ${filePath}`);
            }

            const firstCommit = commits[commits.length - 1].split(' ');
            const lastCommit = commits[0].split(' ');

            const result = {
                createdAt: new Date(parseInt(firstCommit[1], 10) * 1000),
                lastEditedAt: new Date(parseInt(lastCommit[1], 10) * 1000),
            };

            resolve(result);
        });
    });
}