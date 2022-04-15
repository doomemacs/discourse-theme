// Always show the "edit reason" input in the composer, by default.

import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "doom-theme-init-composer-reason",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.modifyClass('controller:composer', {
        pluginId: 'doom-theme-init-composer-reason',
        open() {
          this._super(...arguments);
          this.set("showEditReason", true);
        }
      })
    });
  }
};
