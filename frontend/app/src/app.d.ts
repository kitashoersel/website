/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="@sveltejs/kit" />

type Locales = import('$i18n/i18n-types').Locales;
type TranslationFunctions = import('$i18n/i18n-types').TranslationFunctions;

declare namespace App {
  interface Locals {
    locale: Locales;
    LL: TranslationFunctions;
  }
}

interface ReadonlyArray<T> {
  includes(searchElement: any, fromIndex?: number): searchElement is T;
}
