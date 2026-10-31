import { expect, test, type Page } from "@playwright/test";
import { expectMeta, expectSocialImage, expectTitleToContain } from "./helpers";

async function expectBasicMdx(page: Page) {
  await expect(page.getByRole("heading", { name: "This is a basic MDX test.", exact: true })).toBeVisible();
  await expect(page.getByText("This is some text", { exact: true })).toBeVisible();
}

test.describe("Test pages", () => {
  test("Basic MDX Rendering", async ({ page }) => {
    await page.goto("test/basic_mdx");
    await expectBasicMdx(page);
  });

  test("Image rendering", async ({ page }) => {
    await page.goto("/test/images");

    await expect(page.getByRole("heading", { name: "images", exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: "this is the image alt text", exact: true })).toBeVisible();
  });

  test("Frontmatter", async ({ page }) => {
    await page.goto("/test/frontmatter");

    await expect(page.getByRole("heading", { name: "frontmatter", exact: true })).toBeVisible();

    await expectTitleToContain(page, "I am the title");
    await expectMeta(page, '[name="twitter:title"]', "I am the title");
    await expectMeta(page, '[name="description"]', "I am the description");
    await expectMeta(page, '[name="twitter:description"]', "I am the description");
  });

  test("external component", async ({ page }) => {
    await page.goto("/test/external_component");

    await expect(page.getByText("I contain a react-github-permalink", { exact: true })).toBeVisible();

    // Not asserting on the permalink's actual content, because we quickly hit the GitHub rate limit
    await expect(page.locator(".react-github-permalink").first()).toBeAttached();
  });

  test("external component in series", async ({ page }) => {
    await page.goto("/test/external_component_in_series");

    // For some reason the presence of the series causes issues with the external components
    await expect(page.getByRole("link", { name: "Series - Post 1", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Series - Post 2", exact: true })).toBeVisible();

    await expect(page.getByText("I contain a react-github-permalink", { exact: true })).toBeVisible();

    // Not asserting on the permalink's actual content, because we quickly hit the GitHub rate limit
    await expect(page.locator(".react-github-permalink").first()).toBeAttached();
  });

  test("series - has the right content", async ({ page }) => {
    await page.goto("/test/series1");

    await expect(page.getByText("I am series - post 1 content", { exact: true })).toBeVisible();
    await expect(page.getByText("I am the series description", { exact: true })).toBeVisible();

    await expect(page.getByRole("link", { name: "Series - Post 1", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Series - Post 2", exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Next: Series - Post 2", exact: true }).click();
    await expect(page.getByText("I am series - post 2 content", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Next: Series - Post 2", exact: true })).toHaveCount(0);
  });

  test("trailing slash doesn't matter", async ({ page }) => {
    await page.goto("test/basic_mdx/");
    await expectBasicMdx(page);
  });

  test("query params - won't break things", async ({ page }) => {
    await page.goto("test/basic_mdx?q=foo");
    await expectBasicMdx(page);
  });

  test("/test will show a test index page", async ({ page, request }) => {
    await page.goto("test");
    await expect(page.getByText("Test Posts")).toBeVisible();

    const response = await request.get("/test", { failOnStatusCode: false });
    expect(response.ok()).toBe(true);
  });

  test("comment blocks", async ({ page }) => {
    await page.goto("test/basic_mdx?q=foo");
    await expect(page.locator("iframe.utterances-frame")).toBeAttached();
  });

  test("custom social image works", async ({ page }) => {
    await page.goto("/test/images");
    await expectSocialImage(page, "bsc_dark");
  });
});
