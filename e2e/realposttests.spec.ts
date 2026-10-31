import { expect, expectMeta, expectSocialImage, expectTitleToContain, test } from "./helpers";

test.describe("real pages", () => {
  test("code blocks exist", async ({ page }) => {
    await page.goto("posts/adding_msw_bundler_to_remix_app_2");
    await expect(page.locator(".react-github-permalink")).toHaveCount(10);
  });

  test.skip("comment blocks", async ({ page }) => {
    await page.goto("posts/adding_msw_bundler_to_remix_app_2");
    await expect(page.locator("iframe.utterances-frame")).toBeAttached();
  });

  test("homepage table of contents links to blog posts correctly", async ({ page }) => {
    const title = "How to configure Remix and mdx-bundler for a serverless platform - barrel files approach, Remix v1";
    const description =
      "If using Remix on a serverless platform such as Netlify we can use a build time compilation and barrel files to access frontmatter metadata.";

    await page.goto("/");
    await page.getByRole("link", { name: title, exact: true }).click();

    await expect(
      page.getByText(
        "In this post, we'll we'll talk about how to achieve the same effect for use in a serverless platform, such a Netlify or AWS Lambda.",
        { exact: true },
      ),
    ).toBeVisible();

    await expectTitleToContain(page, title);
    await expectMeta(page, '[name="twitter:title"]', title);
    await expectMeta(page, '[name="description"]', description);
    await expectMeta(page, '[name="twitter:description"]', description);
    await expectSocialImage(page, "blacksheep_100x100");
  });

  test("rss exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "rss feed", exact: true })).toBeVisible();
  });

  test("custom social image works", async ({ page }) => {
    await page.goto("posts/adding_dark_mode_to_the_blog");
    await expectSocialImage(page, "bsc_dark");
  });
});
