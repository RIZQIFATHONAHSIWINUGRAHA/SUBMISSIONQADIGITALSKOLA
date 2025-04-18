const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/login.page");
const InventoryPage = require("../pages/inventory.page");
const takeScreenshot = require("../utils/visualHelper");

describe("SauceDemo Automation Test", function () {
  this.timeout(30000);
  let driver, loginPage, inventoryPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("Sukses Login", async function () {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes("inventory"));
  });

  it("Urutkan Produk dari A-Z", async function () {
    await inventoryPage.sortAZ();
    const firstProduct = await inventoryPage.getFirstProductName();
    assert.ok(firstProduct);
  });

  it("Visual Testing - Ambil Screenshot Inventory Page", async function () {
    await takeScreenshot(driver, "inventory_screenshot.png");
    const fs = require("fs");
    assert.ok(fs.existsSync("inventory_screenshot.png"));
  });
});
