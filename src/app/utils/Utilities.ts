import {AppComponent} from '../app.component';

export class GeneralUtil {

  static setPageTitle(newTitle: string): void {
    AppComponent.pageTitle = newTitle;
  }

  static replaceAll(str: string, replace: string, replaceWith: string): string {
    return str.split(replace).join(replaceWith);
  }

}
