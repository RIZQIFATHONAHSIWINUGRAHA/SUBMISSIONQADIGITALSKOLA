const fs = require("fs");

async function takeScreenshot(driver, filename = "screenshot.png") {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(filename, image, "base64");
}

module.exports = takeScreenshot;
