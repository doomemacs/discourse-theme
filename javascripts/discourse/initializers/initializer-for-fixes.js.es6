import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-fixes",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.decorateCooked(function($elem) {
        $elem.find("aside.accepted-answer").click(function () {
          $(this).find('a.back')[0].click();
        });
      }, { id: "discourse-accepted-answer-move" });
    });
  }
};
