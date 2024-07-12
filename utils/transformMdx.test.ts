
import { expect, describe, it, vitest, vi } from 'vitest'

import { WriteFileFn, compileMDXFiles } from './transformMdx';
import path from 'path';


describe(compileMDXFiles, () => {

    describe("Scenario 1 - Blue sky", () => {
        it('Runs write file  and append file for each file', async () => {
            const writeFile = vitest.fn();

            await compileMDXFiles(
                path.join(process.cwd(), "utils", "testdata", "scenario1_bluesky"),
                'generated',
                writeFile
            );


            expect(writeFile).toHaveBeenCalledTimes(4);
            expect(writeFile).toHaveBeenCalledWith("generated/bar/a.mjs", expect.any(String))
            expect(writeFile).toHaveBeenCalledWith("generated/bar/b.mjs", expect.any(String))
            expect(writeFile).toHaveBeenCalledWith("generated/foo/c.mjs", expect.any(String))
            expect(writeFile).toHaveBeenCalledWith("generated/foo/d.mjs", expect.any(String))
        })
    });

    describe.only("Scenario 2 - Validation Failures", () => {
        it('Throws an error if expected front matter does not exist', async () => {
            const writeFile = vitest.fn();

            await expect(async () => {
                await compileMDXFiles(path.join(process.cwd(), "utils", "testdata", "scenario2_validation_errors"), 'generated', writeFile);
            }).rejects.toThrowError(/A Zod validation error was encountered/);

            expect(writeFile).toHaveBeenCalledTimes(2);


        })
    });
});