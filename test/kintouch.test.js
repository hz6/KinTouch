const Page = require("./helper/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When You Logged in", () => {

  beforeEach(async () => {
    await page.login();
    await page.click("button");
  });

  test("Should See Post Form", async () => {
    const text = await page.getContentsOf("h3");
    expect(text).toEqual(" New Post ");
  });

})

