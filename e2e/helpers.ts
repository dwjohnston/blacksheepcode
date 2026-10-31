import { expect, type Page } from "@playwright/test";

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
