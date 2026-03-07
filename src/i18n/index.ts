// https://vue-i18n.intlify.dev/guide/introduction.html

import type { I18nOptions } from "vue-i18n";
import { createI18n, type Composer } from "vue-i18n";

import en_US from "./languages/en-US.json";
// import en_TH from "./languages/en-TH.json";
// import vi_VN from "./languages/vi-VN.json";
import ja_JP from "./languages/ja-JP.json";
import ko_KR from "./languages/ko-KR.json";
import zh_TW from "./languages/zh-TW.json";

const options: I18nOptions = {};
const locale = window.localStorage.getItem("locale");

options.legacy = false;
options.locale = locale || "en-US";
options.fallbackLocale = "en-US";
options.globalInjection = true;
options.messages = {};
options.messages["en-US"] = en_US;
// options.messages["en-TH"] = en_TH;
// options.messages["vi-VN"] = vi_VN;
options.messages["ja-JP"] = ja_JP;
options.messages["ko-KR"] = ko_KR;
options.messages["zh-TW"] = zh_TW;

const i18n = createI18n(options);

export const t = (i18n.global as unknown as Composer).t;
export default i18n;
