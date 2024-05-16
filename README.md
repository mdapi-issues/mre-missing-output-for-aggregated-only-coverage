# mre-missing-output-for-aggregated-only-coverage

> Minimal reproducible example to demonstrate a bug where `sf apex run test --code-coverage --wait 10` does not output the `Apex Code Coverage by Class` when "Store Only Aggregated Code Coverage" is enabled in the Test Execution settings (`apexSettings > enableAggregateCodeCoverageOnly > true`).

[![Actions Status](https://github.com/mdapi-issues/mre-missing-output-for-aggregated-only-coverage/actions/workflows/default.yml/badge.svg?branch=main)](https://github.com/mdapi-issues/mre-missing-output-for-aggregated-only-coverage/actions?query=branch:main)

> [!IMPORTANT]
> A green status badge means the issue was successfully reproduced.
>
> A red status badge means the issue was fixed or the pipeline failed for another reason.

## Expected

The output after `=== Apex Code Coverage by Class` should look like:

```
=== Apex Code Coverage by Class
CLASSES  PERCENT  UNCOVERED LINES
───────  ───────  ───────────────
Greeter  100%
```

## Actual

The output after `=== Apex Code Coverage by Class` is empty:

```
=== Apex Code Coverage by Class
```

## Full Output: Actual vs Expected

```diff
=== Test Summary
NAME                 VALUE
───────────────────  ─────────────────────────────
Outcome              Passed
Tests Ran            1
Pass Rate            100%
Fail Rate            0%
Skip Rate            0%
Test Run Id          7077Y00004lsieX
Test Execution Time  9 ms
Org Id               00D7Y000000GND2UAO
Username             test-8nhp9pk7g82s@example.com
Org Wide Coverage    100%


=== Test Results
TEST NAME           OUTCOME  MESSAGE  RUNTIME (MS)
──────────────────  ───────  ───────  ────────────
Test_Greeter.greet  Pass              9


=== Apex Code Coverage by Class
- CLASSES  PERCENT  UNCOVERED LINES
- ───────  ───────  ───────────────
- Greeter  100%
```

and using `--json`:

```json
{
  "status": 0,
  "result": {
    "summary": {
      "failRate": "0%",
      "failing": 0,
      "hostname": "https://drive-customer-3519-dev-ed.scratch.my.salesforce.com",
      "orgId": "00D7Y000000GND2UAO",
      "outcome": "Passed",
      "passRate": "100%",
      "passing": 1,
      "skipped": 0,
      "testRunId": "7077Y00004lsqtT",
      "testStartTime": "2024-05-16T15:47:34.000Z",
      "testsRan": 1,
      "userId": "0057Y00000CFK0HQAX",
      "username": "test-8nhp9pk7g82s@example.com",
      "commandTime": "83 ms",
      "testExecutionTime": "16 ms",
      "testTotalTime": "16 ms",
      "orgWideCoverage": "100%",
      "testRunCoverage": "0%"
    },
    "tests": [
      {
        "Id": "07M7Y00000OLYuLUAX",
        "QueueItemId": "7097Y000002jGN4QAM",
        "StackTrace": null,
        "Message": null,
        "AsyncApexJobId": "7077Y00004lsqtTQAQ",
        "MethodName": "greet",
        "Outcome": "Pass",
        "ApexClass": {
          "Id": "01p7Y00000FfRORQA3",
          "Name": "Test_Greeter",
          "NamespacePrefix": null
        },
        "RunTime": 16,
        "FullName": "Test_Greeter.greet"
      }
    ],
    "coverage": {
      "coverage": [],
      "records": [],
      "summary": {
        "totalLines": 0,
        "coveredLines": 0,
        "orgWideCoverage": "100%",
        "testRunCoverage": "0%"
      }
    }
  },
  "warnings": []
}
```

## Workaround

We can query and format the Apex Code Coverage by Class (with "Store Only Aggregated Code Coverage" enabled)
using the Tooling API (`SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate`).

## Instructions

> [!NOTE]
>
> "Store Only Aggregated Code Coverage" is enabled in [config/project-scratch-def.json](./config/project-scratch-def.json).

```console
sf org create scratch -f config/project-scratch-def.json --alias mre-missing-output-for-aggregated-only-coverage --set-default
sf project deploy start
sf apex run test --test-level RunLocalTests --code-coverage --wait 10
```
