// 1. Adds a .dark / .light class to <html>
// 2. Adds a .{THEMENAME}-theme class to <html>
// 3. Allows us to use a different highlight.js theme per Discourse color scheme

import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init",
  initialize() {
    withPluginApi("0.8.7", api => {
      try {
        let root = document.documentElement;

        // Ugh, I'm sorry universe
        let [theme, dark, hljs_theme] = {
            "rgb(40, 44, 52)":    [ "doom-one",         true,  "atom-one-dark" ],
            "rgb(40, 42, 54)":    [ "doom-dracula",     true,  "hybrid" ],
            "rgb(29, 37, 44)":    [ "doom-city-lights", true,  "nord" ],
            "rgb(250, 250, 250)": [ "doom-one-light",   false, "atom-one-light" ]
        }[window.getComputedStyle(root).backgroundColor];

        root.classList.add(`${theme}-theme`);
        root.classList.add(dark ? "dark" : "light");

        const path = settings.theme_uploads[`hljs-${hljs_theme}`];
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", path);
        document.head.appendChild(link);
      } catch (error) {
        console.error(error);
        console.error(
          "There is a problem with codeblock theme picker, Please check if you've added CSS to the theme_authorized_extensions site setting"
        );
      }
    });
  }
};
