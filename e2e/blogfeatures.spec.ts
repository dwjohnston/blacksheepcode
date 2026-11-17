import { expect, test } from "./helpers";

test("400s OK", async ({ page, request }) => {
  const apiResponse = await request.get("/blah", { failOnStatusCode: false });
  expect(apiResponse.status()).toBe(404);

  await page.goto("blah");
  await expect(page.getByText("404 - Page Not Found", { exact: true })).toBeVisible();
});

test("SiteMap exists", async ({ request }) => {
  const response = await request.get("/sitemap.xml", { failOnStatusCode: false });
  expect(await response.text()).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
});

test("robots.txt exists", async ({ request }) => {
  const response = await request.get("/robots.txt", { failOnStatusCode: false });
  expect(await response.text()).toContain("Sitemap: https://blacksheepcode.com/sitemap.xml");
});

test("rss.xml exists", async ({ request }) => {
  const response = await request.get("/rss.xml", { failOnStatusCode: false });
  expect(await response.text()).toContain('<rss version="2.0">');
});
