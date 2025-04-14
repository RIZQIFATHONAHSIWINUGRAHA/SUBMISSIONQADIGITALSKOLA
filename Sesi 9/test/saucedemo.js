const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Automation", function () {
  let driver;

  this.timeout(30000); // timeout lebih besar

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("Sukses Login", async () => {
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    const urlAfterLogin = await driver.getCurrentUrl();
    assert.ok(urlAfterLogin.includes("/inventory.html"), "Login gagal!");
  });

  it("Urutkan Produk dari A-Z", async () => {
    const sortDropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await sortDropdown.sendKeys("Name (A to Z)");

    const firstProduct = await driver.wait(
      until.elementLocated(By.className("inventory_item_name")),
      5000
    );
    const productName = await firstProduct.getText();

    assert.ok(productName.length > 0, "Produk pertama tidak ditemukan!");
  });
});
