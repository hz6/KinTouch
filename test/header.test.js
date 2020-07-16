const Page = require("./helper/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("Initialise Main Page", async () => {
  const text = await page.getContentsOf("a.navbar-brand");
  expect(text).toEqual("KinTouch");
});

test("Check Login button", async () => {
  const text = await page.getContentsOf("a.nav-link");
  expect(text).toEqual("Login");
});

test("Google OAuth Login", async () => {
  await page.click("a.nav-link");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("Show Logout Option After Login", async () => {
  await page.login();
  const text = await page.getContentsOf("a[href='/auth/logout']");
  expect(text).toEqual("Logout");
})

test("Should show My Posts option", async () => {
  const text = await page.getContentsOf("a[href='/user']");
  expect(text).toEqual("My Posts");
})
