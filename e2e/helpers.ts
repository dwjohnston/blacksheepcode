import { test as base, expect, type Page } from "@playwright/test";

// Same hydration/React messages the old Cypress `uncaught:exception` handlers ignored.
const IGNORED_PAGE_ERRORS = [
  "Hydration failed because the initial UI does not match what was rendered on the server.",
  "There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.",
  "Minified React error",
  "Unknown root exit status.",
];

// Fails the test on any other uncaught client-side exception, as Cypress did by default.
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, runTest) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => {
      if (!IGNORED_PAGE_ERRORS.some((message) => error.message.includes(message))) {
        pageErrors.push(error);
      }
    });
    await runTest(page);
    expect(pageErrors.map((error) => error.stack ?? error.message), "uncaught page exceptions").toEqual([]);
  },
});

export { expect };

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function expectTitleToContain(page: Page, title: string) {
  await expect(page).toHaveTitle(new RegExp(escapeRegExp(title)));
}

export async function expectMeta(page: Page, selector: string, content: string) {
  await expect(page.locator(`meta${selector}[content="${content}"]`)).toBeAttached();
}

// Bundled image URLs contain a content hash that changes between bundler versions,
// so match on the image's name and extension rather than the exact hash.
export async function expectSocialImage(page: Page, imageName: string, extension = "webp") {
  const prefix = `https://blacksheepcode.com/_next/static/media/${imageName}.`;
  for (const selector of ['[name="twitter:image"]', '[property="og:image"]']) {
    await expect(page.locator(`meta${selector}[content^="${prefix}"][content$=".${extension}"]`)).toBeAttached();
  }
}
