const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Google Search Test", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Visit SauceDemo dan cek page title", async function () {
    await driver.get("https://www.saucedemo.com");

    const title = await driver.getTitle();
    assert.strictEqual(title.includes("Swag Labs"), true, "Title tidak sesuai");
  });
});
