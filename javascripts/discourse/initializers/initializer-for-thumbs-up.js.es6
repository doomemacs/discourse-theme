import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-thumbs-up",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.replaceIcon('d-liked', 'thumbs-up');
      api.replaceIcon('d-unliked', 'far-thumbs-up');
      api.replaceIcon('notification.liked', 'far-thumbs-up');
      api.replaceIcon('notification.liked_2', 'far-thumbs-up');
      api.replaceIcon('notification.liked_many', 'far-thumbs-up');
      api.replaceIcon('notification.liked_consolidated', 'far-thumbs-up');
      api.replaceIcon('heart', 'thumbs-up');
    });
  }
};
