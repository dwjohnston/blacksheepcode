
import { expect, describe, it, mock } from 'bun:test'

import { WriteFileFn, compileMDXFiles } from './transformMdx';


describe(compileMDXFiles, () => {

    describe("Scenario 1 - Blue sky", () => {
        it('Runs write file  and append file for each file', async () => {
            const writeFile = mock();

            await compileMDXFiles(
                `${process.cwd()}/utils/testdata/scenario1_bluesky`,
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

    describe("Scenario 2 - Validation Failures", () => {
        it('Throws an error if expected front matter does not exist', async () => {
            const writeFile = mock();

            const result = await compileMDXFiles(`${process.cwd()}/utils/testdata/scenario2_validation_errors`, 'generated', writeFile);
            expect(result).toHaveLength(1);

            // But write file is still called for all files
            expect(writeFile).toHaveBeenCalledTimes(4);


        })
    });
});