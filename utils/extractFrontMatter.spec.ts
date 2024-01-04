import {describe, expect, it, jest} from '@jest/globals';
import { AppendIndexFileFn, CreateSubfolderFn, WriteFileFn, extractFrontMatter } from './extractFrontMatter';
import path from "path";

describe(extractFrontMatter,() => {

    describe("Scenario 1 - Blue sky", () => {
        it('Runs write file  and append file for each file', async () => {
            const writeFile = jest.fn<WriteFileFn>(); 
            const appendFile = jest.fn<AppendIndexFileFn>();
            const createSubfolder = jest.fn<CreateSubfolderFn>().mockImplementation((subPath) => {
                return Promise.resolve(`generated/${subPath}`)
            })


            await extractFrontMatter(path.join(process.cwd(), "utils", "testdata", "scenario1_bluesky"),writeFile, appendFile, createSubfolder);  

            expect(createSubfolder).toHaveBeenCalledWith("foo");
            expect(createSubfolder).toHaveBeenCalledWith("bar"); 

            expect(writeFile).toHaveBeenCalledWith("generated/bar/a.json", "bar/a", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description A", "title": "I am title A"}})
            expect(writeFile).toHaveBeenCalledWith("generated/bar/b.json", "bar/b", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description B", "title": "I am title B"}})
            expect(writeFile).toHaveBeenCalledWith("generated/foo/c.json", "foo/c", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description C", "title": "I am title C"}})
            expect(writeFile).toHaveBeenCalledWith("generated/foo/d.json", "foo/d", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description D", "title": "I am title D"}})


            expect(appendFile).toHaveBeenCalledWith("generated/bar/index.js", "a")
            expect(appendFile).toHaveBeenCalledWith("generated/bar/index.js", "b")
            expect(appendFile).toHaveBeenCalledWith("generated/foo/index.js", "c")
            expect(appendFile).toHaveBeenCalledWith("generated/foo/index.js", "d")




        })
    });

    describe("Scenario 2 - Validation Failures", () => {
        it('Throws an error if expected front matter does not exist', async () => {
            const writeFile = jest.fn<WriteFileFn>(); 
            const appendFile = jest.fn<AppendIndexFileFn>();
            const createSubfolder = jest.fn<CreateSubfolderFn>().mockImplementation((subPath) => {
                return Promise.resolve(`generated/${subPath}`)
            })
            await expect(async () => {
                 await extractFrontMatter(path.join(process.cwd(), "utils", "testdata", "scenario2_validation_errors"),writeFile, appendFile, createSubfolder);  
            }).rejects.toThrowError(/Failed Zod validation with/);

        })
    });

});