// Description:
//   Lets hubot-stackstorm recognise the Slack adapter on hubot 13.
//
// Notes:
//   Since hubot 13.1.2, robot.adapterName is the adapter's class name ("SlackBot") instead of the
//   package it was loaded from. hubot-stackstorm 0.13 picks its Slack message formatting by the
//   package name and otherwise falls back to plain text. hubot loads ./scripts before
//   external-scripts.json, so this runs before hubot-stackstorm reads the name.

'use strict';

const ADAPTER_PACKAGES = {
  SlackBot: '@hubot-friends/hubot-slack',
};

module.exports = (robot) => {
  const pkg = ADAPTER_PACKAGES[robot.adapterName];
  if (pkg) {
    robot.logger.debug(`st2chatops: adapter ${robot.adapterName} is ${pkg} for hubot-stackstorm`);
    robot.adapterName = pkg;
  }
};
