Changelog
========================================================================

in development
------------------------------------------------------------------------

Added
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* ``npm test``: an end-to-end test that starts ``bin/hubot --test`` (hubot's Shell adapter) against
  a running StackStorm, checks that the action aliases load and show in ``!help``, and runs
  ``!pack get core`` with the reply coming back through the ``chatops.notify`` rule. Plus a unit
  test for the adapter-name shim. Uses Node's built-in test runner, so no test dependencies.

    Contributed by @bishopbm1
* A changelog file.

    Contributed by @nzlosh
* EL9 support and node20 support

    Contributed by @amanda11
* Ubuntu Jammy support

    Contributed by @nzlosh

Fixed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Fix the CI build caused by different OS version.
* Fix CircleCI build for forked PRs.

    Contributed by @armab

Changed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Node.js 24 LTS (``.nvmrc``, ``engines``), and current dependencies:

  - hubot 11.3 -> 13.2 (Express 5; ``connect-multiparty`` removed). Not 14 yet: hubot 14 replaces
    ``robot.commands`` with a CommandBus, and hubot-stackstorm 0.13 still pushes its aliases into
    the old array, so they never load.
  - @hubot-friends/hubot-slack 3.1 -> 3.8.
  - Removed ``botbuilder``. It was added for the Microsoft Teams adapter, which is gone.
  - ``npm-shrinkwrap.json`` regenerated with npm 11 (lockfile v3).
  - ``.npmrc`` with supply-chain guardrails: no install scripts, no git dependencies, only package
    versions published at least 14 days ago.
* ``scripts/st2-adapter-name.js``: hubot 13 reports the Slack adapter as ``SlackBot``, which
  hubot-stackstorm doesn't recognise, so it fell back to plain-text messages. This shim gives it
  the package name, which it does recognise. It is shipped in the RPM and the Docker image.
* ``bin/hubot`` uses ``HUBOT_ADAPTER`` (``slack`` means the bundled hubot-slack) instead of always
  loading Slack, so ``bin/hubot --test`` (the Shell adapter) works again. It runs from a temporary
  directory, because the Shell adapter writes its history file to the working directory.
* RPM: ``Requires: nodejs >= 1:24``. RHEL's nodejs has Epoch 1, so the old ``>= 20.0`` accepted
  any version. The package is ``noarch``, since there are no native modules. ``make build`` runs
  ``npm ci --omit=dev`` (no more ``chown`` of ``/root/st2chatops``), and ``make rpm`` is added.
  The EL9 packaging image uses the ``nodejs:24`` module, without npm 6 or node-gyp.
* ``Dockerfile`` on ``node:24-alpine`` with ``npm ci``, running as the ``node`` user. Its ``CMD``
  works now; it used to treat ``source ... && ...`` as a program name.
* Removed ``dev/``, the Teams-era development image (Python 2, a git dependency, Node 20), and
  ``scripts/self-check.sh`` (Python 2, EL7).

    Contributed by @bishopbm1
* Updated hubot-slack to "^4.10.0"

    Contributed by @lopf

* Removed EL7 and bionic
    Contributed by @amanda11

Removed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Remove skills-validator from npm-shrinkwrap.json

    Contributed by @armab


v0.7.0
------------------------------------------------------------------------
