 export class ComponentExampleObject {
  constructor(browser) {
    this.browser = browser;
  }

  open() {
    this.browser.visit('/')
  }
}
