/**
    The MIT License

    Copyright (c) 2021 Google LLC.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
 */
import { Injectable } from '@angular/core';

export const BROWSER_THEME = '(prefers-color-scheme: dark)';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  isDark: boolean = preferredTheme() === 'dark' ? true : false;

  constructor() {

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
    } else {
      this.removeStyle('dark');
      document.body.classList.remove('dark');
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

