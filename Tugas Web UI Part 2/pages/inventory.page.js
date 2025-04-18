const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  }

  async sortAZ() {
    const dropdown = await this.driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.sendKeys("Name (A to Z)");
  }

  async getFirstProductName() {
    return await this.driver
      .findElement(By.className("inventory_item_name"))
      .getText();
  }
}

module.exports = InventoryPage;
