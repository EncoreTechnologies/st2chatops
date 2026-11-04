// Licensed to the StackStorm, Inc ('StackStorm') under one or more
// contributor license agreements.  See the NOTICE file distributed with
// this work for additional information regarding copyright ownership.
// The ASF licenses this file to You under the Apache License, Version 2.0
// (the "License"); you may not use this file except in compliance with
// the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

const adapterName = require('../scripts/st2-adapter-name');

const robot = (name) => ({ adapterName: name, logger: { debug() {} } });

test('names the Slack adapter by its package, as hubot-stackstorm expects', () => {
  // hubot 13 reports the class name; hubot-stackstorm only knows the package name
  const bot = robot('SlackBot');
  adapterName(bot);
  assert.strictEqual(bot.adapterName, '@hubot-friends/hubot-slack');
});

test('leaves other adapters alone', () => {
  for (const name of [ 'Shell', '@hubot-friends/hubot-slack', undefined ]) {
    const bot = robot(name);
    adapterName(bot);
    assert.strictEqual(bot.adapterName, name);
  }
});
