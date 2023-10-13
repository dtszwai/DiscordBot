const i18next = require("i18next");

i18next.init({
  fallbackLng: "en-GB",
  resources: {
    "en-GB": {
      translation: require("./locales/en-GB.json"),
    },
    "en-US": {
      translation: require("./locales/en-GB.json"),
    },
    "zh-TW": {
      translation: require(`./locales/zh-TW.json`),
    },
    "zh-CN": {
      translation: require(`./locales/zh-TW.json`),
    },
  },
});

module.exports = (lng) => i18next.getFixedT(lng);
