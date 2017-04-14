module.exports = {
  'Pets list e2e test': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('a[href="#/pets"]', 1000)
      .click('a[href="#/pets"]')
      .pause(1000)
      .assert.elementPresent('.carousel')
      .assert.elementCount('img', 4)
      .click('a[href="#/petDetails/321ec3c1-b3b3-4cd4-8659-5d2bf9cd9f7b"]')
      .assert.containsText('#app > div > h2:nth-child(1)', 'Name: Dotnet')
      .assert.containsText('#app > div > h2:nth-child(2)', 'Description: Dotnet')
      .click('a[href="#/pets"]')
      .pause(1000)
      .click('a[href="#/petDetails/b9a1dc63-5163-4397-b457-3f494e4c6b73"]')
      .assert.containsText('#app > div > h2:nth-child(1)', 'Name: TestEdycji')
      .assert.containsText('#app > div > h2:nth-child(2)', 'Description: description:3')
      .click('a[href="#/pets"]')
      .pause(1000)
      .click('a[href="#/petDetails/808c43a1-7438-49b3-88c0-4bb53c7161e5"]')
      .assert.containsText('#app > div > h2:nth-child(1)', 'Name: TestDodawania')
      .assert.containsText('#app > div > h2:nth-child(2)', 'Description: d')
      .click('a[href="#/pets"]')
      .pause(1000)
      .click('a[href="#/petDetails/79ec8ac5-4ac7-40d1-824b-287a238f9bb8"]')
      .assert.containsText('#app > div > h2:nth-child(1)', 'Name: MarekQA')
      .assert.containsText('#app > div > h2:nth-child(2)', 'Description: Test edycji dwa')
      .end()
  }
}
