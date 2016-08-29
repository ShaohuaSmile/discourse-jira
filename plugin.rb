# name: link_to_jira
# about: Plugin to discourse and jira
# version: 0.0.1
# authors: Shaohua
# url: https://github.com/ShaohuaSmile/discourse-jira.git

enabled_site_setting :link_to_jira_plugin_enabled

register_asset "javascripts/link_to_jira_dialect.js", :server_side
register_asset "stylesheets/link_to_jira_plugin.css"
