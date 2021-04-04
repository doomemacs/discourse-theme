import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-title-code",
  initialize() {
    withPluginApi("0.8.7", api => {
      // Convert backticks to <code>...</code> in topic titles
      api.decorateTopicTitle(function(_topicModel, node, _topicTitleType) {
        let str = node.innerHTML;
        let j = 0;
        while (str !== (str = str.replace(/`/, j++ % 2 == 1 ? "</code>" : "<code>"))) {};
        if (j % 2 == 1) { node.innerHTML = str; }
      });
    });
  }
};
