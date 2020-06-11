import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    // return browser.get(browser.baseUrl) as Promise<unknown>;
    return browser.get('http://localhost:5000/') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root div.toolbar span')).getText() as Promise<string>;
  }
}
