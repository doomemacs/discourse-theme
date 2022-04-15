import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-icon-tags",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.onPageChange(_url => {
        $('.discourse-tag.bullet .tag-icon').each(function() {
          $(this).parent().addClass('has-icon');
        });
      })
    });
  }
};
