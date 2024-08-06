import { Injectable } from '@angular/core';

export const BROWSER_THEME = '(prefers-color-scheme: dark)';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  isDark: boolean = preferredTheme() === 'dark' ? true : false;

  constructor() {
    console.log("Setting theme.")

    this.setTheme();
    this.watchThemeChanges();
  }

  /**
   * Set the stylesheet with the specified key.
   */
  setTheme(key: string = preferredTheme()) {
    if (this.isDark) {
      const href = 'dark.css';
      getLinkElementForKey(key).setAttribute('href', href);
      document.body.classList.add(key);

      console.log('Dark theme was set');
    } else {
      this.removeStyle('dark');
      document.body.classList.remove('dark');

      console.log('Dark theme was set');
    }
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  watchThemeChanges() {
    window.matchMedia(BROWSER_THEME).addEventListener('change', event => {
      this.isDark = preferredTheme() === 'dark' ? true : false;
      const preferredScheme = event.matches ? 'dark' : 'light';
      this.setTheme(preferredScheme);
    });
  }
}

function preferredTheme(): 'dark' | 'light' {
  return window.matchMedia(BROWSER_THEME).matches ? 'dark' : 'light';
}

function getLinkElementForKey(key: string) {
  console.log('check if there is an existing link create link');
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}

