#!/usr/bin/env bash

set -eo pipefail

sf data query --use-tooling-api --query "SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate" --json
