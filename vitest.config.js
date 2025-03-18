/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ["src/**/*.(test|spec).ts", "utils/**/*.(test|spec).ts"],
    },
})