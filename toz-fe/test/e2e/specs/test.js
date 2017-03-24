// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('a[href="#/transfer"]', 1000)
      .click('a[href="#/transfer"]')
      .assert.containsText('.transfer-data > :nth-child(1)', 'Dane do przelewu')
      .assert.containsText('.transfer-data > :nth-child(2)', 'Nazwa')
      .assert.containsText('.transfer-data > :nth-child(3)', '666')
      .assert.containsText('.transfer-data > :nth-child(4)', 'Szczecin')
      .assert.containsText('.transfer-data > :nth-child(5)', 'Poland')
      .assert.containsText('.transfer-data > :nth-child(6)', '666')
      .assert.containsText('.transfer-data > :nth-child(7)', '02-123')
      .assert.containsText('.transfer-data > :nth-child(8)', 'Hołdu Pruskiego')
      .assert.containsText('.transfer-data > :nth-child(9)', 'mbank')
      .assert.containsText('.transfer-data > :nth-child(10)', '61 1090 1014 0000 0712 1981 2874')
      .assert.containsText('.transfer-data > :nth-child(11)', 'mail@testowy.com')
      .assert.containsText('.transfer-data > :nth-child(12)', '+48123123123')
      .assert.containsText('.transfer-data > :nth-child(13)', '+48123123123')
      .assert.containsText('.transfer-data > :nth-child(14)', 'http://patronage.com/')
      .end()
  }
}
