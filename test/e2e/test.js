'use strict';

(async () => {
  const config = require('./config');
  const tp = require('tape');
  const compareImages = require("resemblejs/compareImages");
  const {remote} = require('webdriverio');
  const browserName = process.argv[2];

  const browser = await remote({
    logLevel: config.logLevel,
    capabilities: {
      browserName,
    }
  });
  await browser.url(config[browserName].url);

  const links = await browser.$$('#ul li a');
  const testsData = [];
  for (const link of links) {
    const data = await compare(link);
    const testName = await link.getText();
    testsData.push([testName, data]);
  }

  for (const [testName, data] of testsData) {
    tp(testName, t => {
      t.equal(data.rawMisMatchPercentage < 1, true);
      t.end();
    });
  }
  await browser.deleteSession();

  async function compare(link) {
    await link.click();
    const [canvasBase64, imageSrc] = await browser.execute(() => {
      const canvas = document.getElementById('canvas');
      const image = document.getElementById('image');
      return [canvas.toDataURL(), image.getAttribute('src')];
    });
    const data = await compareImages(
      canvasBase64,
      config.projectBaseDir + 'test/e2e/' + imageSrc
    );
    return data;
  }

})().catch(e => console.error(e));
