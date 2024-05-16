#!/usr/bin/env bash

set -eo pipefail

sf org create scratch -f config/project-scratch-def.json --alias mre-template --set-default
sf project deploy start
