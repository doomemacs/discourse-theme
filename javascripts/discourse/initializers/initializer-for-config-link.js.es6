import { withPluginApi } from "discourse/lib/plugin-api";
import site from "discourse/models/site";

export default {
  name: "doom-theme-init-config-link",
  initialize() {
    withPluginApi("0.8.7", api => {
      api.registerConnectorClass('user-profile-primary', 'config-link', {
        setupComponent(args, component) {
          component.set('configLink', args.model.get('configLink'));
        }
      });
      api.registerConnectorClass('user-card-metadata', 'config-link', {
        setupComponent(args, component) {
          component.set('configLink', args.user.get('configLink'));
        }
      });
      api.modifyClass('model:user', {
        pluginId: 'doom-theme-init-config-link',
        configLink: function() {
          const siteUserFields = site.currentProp('user_fields');
          if (!Ember.isEmpty(siteUserFields)) {
            const configField = siteUserFields.filterBy('name', 'Config Location')[0];
            if (!configField) return;
            const userFieldId = configField.get('id');
            const userFields = this.get('user_fields');
            if (userFields
                && userFields[userFieldId]
                && userFields[userFieldId].match(/^https?:\/\//)) {
              const link = `<a href="${userFields[userFieldId]}" target='_blank' rel='nofollow'>${userFields[userFieldId]}</a>`;
              return Ember.Object.create({ link, name: configField.get('name') });
            }
          }
        }.property('user_fields.@each.value')
      });
    });
  }
};
