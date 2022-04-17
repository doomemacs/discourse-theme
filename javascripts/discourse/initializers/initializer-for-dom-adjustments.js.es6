import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-dom-adjustments",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.onPageChange(_url => {
        // Add a .has-icon class to tags that are given an icon by the Tag Icons
        // component, so we can target them from CSS.
        $('.discourse-tag.bullet .tag-icon').each(function() {
          $(this).parent().addClass('has-icon');
        });

        // Add a .group-$FLAIR class to usernames, so they can be given colors
        // that match their primary group (moderator, admin, and regulars).
        $('#topic .topic-post').each(function() {
          let group = $(this).find('.avatar-flair').attr('title');
          if (group) {
            $(this).find('.username a')
                   .parent()
                   .addClass(`group-${group.toLowerCase().replaceAll(' ', '_')}`);
          }
        });
      })
    });
  }
};
