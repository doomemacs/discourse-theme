// 1. Adds a .dark / .light class to <html>
// 2. Adds a .{THEMENAME}-theme class to <html>
// 3. Allows us to use a different highlight.js theme per Discourse color scheme

import { withPluginApi } from "discourse/lib/plugin-api";

const themes = {
  // Dark themes
  'doom-one':         { bg: '#21242b', dark: true, hljs: 'atom-one-dark' },
  'doom-dracula':     { bg: '#1e2029', dark: true, hljs: 'hybrid' },
  'doom-city-lights': { bg: '#181e24', dark: true, hljs: 'nord' },
  // Light themes
  'doom-one-light':   { bg: '#dfdfdf', dark: false, hljs: 'atom-one-light' },
  'doom-nord':        { bg: '#3b4252', dark: false, hljs: 'nord' },
};
Object.keys(themes).forEach(key => themes[key].name = key);

// Ugh, I'm sorry universe
const themeMap = (function (themes) {
  let map = {};
  Object.keys(themes).forEach(key => {
    map[themes[key].bg] = key;
  });
  return map;
})(themes);

const hljsLink = (function () {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("class", "hljs-import");
  link.setAttribute("media", "none");
  return document.head.appendChild(link);
})();

function getCurrentTheme() {
  return themes[themeMap[getCurrentThemeColor()]];
}

function getCurrentThemeColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--header_background");
}

let lastTheme;
function setTheme(theme) {
  if (!theme) {
    return;
  }
  try {
    console.log(`Updating theme to ${theme.name} (${getCurrentThemeColor()})`);
    const root = document.documentElement;
    if (root.classList) {
      if (lastTheme) {
        root.classList.remove(`${lastTheme}-theme`);
      }
      root.classList.remove("dark", "light");
      root.classList.add(`${theme.name}-theme`);
      root.classList.add(theme.dark ? "dark" : "light");
    }
    hljsLink.setAttribute('href', settings.theme_uploads[`hljs-${theme.hljs}`]);
    hljsLink.setAttribute('media', 'all');
    lastTheme = theme.name;
  } catch (error) {
    console.error(error);
    console.error(
      "There is a problem with codeblock theme picker, Please check if you've added CSS to the theme_authorized_extensions site setting"
    );
  }
}

let lastColor;
const observer = new MutationObserver(m => {
  m.forEach(mut => {
    if (mut.type === 'attributes'
        && (['content', 'media'].indexOf(mut.attributeName) !== -1)
        && (lastColor !== getCurrentThemeColor())) {
      setTheme(getCurrentTheme());
      lastColor = getCurrentThemeColor();
    }
  });
});

export default {
  name: "doom-theme-init",
  initialize() {
    withPluginApi("0.8.7", api => {
      const meta = document.querySelector('head meta[name="theme-color"]');
      const toggle = document.querySelector(".dark-scheme");
      [ meta, toggle ].forEach(e => observer.observe(e, { attributes: true }));
    });
  }
};
