import {describe, expect, it, vitest} from 'vitest';
import type { AppendIndexFileFn, CreateSubfolderFn, WriteFileFn} from './extractFrontMatter';
import { extractFrontMatter } from './extractFrontMatter';
import path from "path";

describe(extractFrontMatter,() => {

    describe("Scenario 1 - Blue sky", () => {
        it('Runs write file  and append file for each file', async () => {
            const writeFile = vitest.fn<Parameters<WriteFileFn>, ReturnType<WriteFileFn>>(); 
            const appendFile = vitest.fn<Parameters<AppendIndexFileFn>, ReturnType<AppendIndexFileFn>>();
            const createSubfolder = vitest.fn<Parameters<CreateSubfolderFn>, ReturnType<CreateSubfolderFn>>().mockImplementation((subPath) => {
                return Promise.resolve(`generated/${subPath}`)
            })


            await extractFrontMatter(path.join(process.cwd(), "utils", "testdata", "scenario1_bluesky"),writeFile, appendFile, createSubfolder);  

            expect(createSubfolder).toHaveBeenCalledWith("foo");
            expect(createSubfolder).toHaveBeenCalledWith("bar"); 

            expect(writeFile).toHaveBeenCalledWith("generated/bar/a.json", "bar/a", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description A", "title": "I am title A"}})
            expect(writeFile).toHaveBeenCalledWith("generated/bar/b.json", "bar/b", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description B", "title": "I am title B"}})
            expect(writeFile).toHaveBeenCalledWith("generated/foo/c.json", "foo/c", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description C", "title": "I am title C"}, series: {
                name: "foo_series", 
                part:1
            }})
            expect(writeFile).toHaveBeenCalledWith("generated/foo/d.json", "foo/d", {"meta": {"dateCreated": new Date("2022-11-28T00:00:00.000Z"), "description": "I am description D", "title": "I am title D"},
            series: {
                name: "foo_series", 
                part:2 
            }})


            expect(appendFile).toHaveBeenCalledWith("generated/bar/index.js", "a")
            expect(appendFile).toHaveBeenCalledWith("generated/bar/index.js", "b")
            expect(appendFile).toHaveBeenCalledWith("generated/foo/index.js", "c")
            expect(appendFile).toHaveBeenCalledWith("generated/foo/index.js", "d")




        })
    });

    describe("Scenario 2 - Validation Failures", () => {
        it('Throws an error if expected front matter does not exist', async () => {
            const writeFile = vitest.fn<Parameters<WriteFileFn>, ReturnType<WriteFileFn>>(); 
            const appendFile = vitest.fn<Parameters<AppendIndexFileFn>, ReturnType<AppendIndexFileFn>>();
            const createSubfolder = vitest.fn<Parameters<CreateSubfolderFn>, ReturnType<CreateSubfolderFn>>().mockImplementation((subPath) => {
                return Promise.resolve(`generated/${subPath}`)
            })
            await expect(async () => {
                 await extractFrontMatter(path.join(process.cwd(), "utils", "testdata", "scenario2_validation_errors"),writeFile, appendFile, createSubfolder);  
            }).rejects.toThrowError(/Failed Zod validation with/);

        })
    });

});