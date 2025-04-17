const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("SauceDemo Test Suite", function () {
  let driver;

  // ⬅️ HOOK: Sebelum semua test, buka browser
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // ⬅️ HOOK: Setelah semua test, tutup browser
  after(async function () {
    await driver.quit();
  });

  // ⬅️ HOOK: Sebelum setiap test, buka halaman login
  beforeEach(async function () {
    await driver.get("https://www.saucedemo.com/");
  });

  it("Login Berhasil", async function () {
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Validasi URL setelah login
    await driver.wait(until.urlContains("/inventory"), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl.includes("inventory"), true);
  });

  it("Urutkan Produk dari A-Z", async function () {
    // Login dulu
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    await driver.wait(until.urlContains("/inventory"), 5000);

    // Temukan dan pilih opsi sort A-Z
    const sortSelect = await driver.findElement(
      By.className("product_sort_container")
    );
    await sortSelect.sendKeys("Name (A to Z)");

    // Validasi produk pertama adalah Sauce Labs Backpack
    const firstItem = await driver.findElement(
      By.className("inventory_item_name")
    );
    const itemName = await firstItem.getText();
    assert.strictEqual(itemName, "Sauce Labs Backpack");
  });
});
