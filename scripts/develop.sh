#!/usr/bin/env bash

set -eo pipefail
set -x

sf org create scratch -f config/project-scratch-def.json --alias mre-missing-output-for-aggregated-only-coverage --set-default
sf project deploy start
