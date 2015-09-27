module.exports = {
  'Auto scroll to website' : function (browser) {
    browser
      .url('http://localhost:3000/#/')
      .setAlertText('David')
      .acceptAlert()
      .waitForElementVisible('#message-form-input', 1000)
      .click('#message-form-input')

    for (var i = 0; i <= 30; i++) {
      browser
        .setValue('#message-form-input', ['hello world', browser.Keys.ENTER]);
    }
  }
};
