#!/usr/bin/env node

import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));

console.log("=== Apex Code Coverage by Class");
console.log("CLASSES  PERCENT  UNCOVERED LINES");
console.log("───────  ───────  ───────────────");

const lines = input.result.records
  .map((record) => {
    const totalLines = record.NumLinesCovered + record.NumLinesUncovered;
    if (totalLines > 0) {
      record.Percentage =
        (record.NumLinesCovered /
          (record.NumLinesCovered + record.NumLinesUncovered)) *
        100;
    } else {
      record.Percentage = 0;
    }
    return record;
  })
  .sort((a, b) => b.Percentage - a.Percentage)
  .map(
    (record) =>
      `${record.ApexClassOrTrigger.Name}\t${record.Percentage}%\t${
        record.NumLinesUncovered > 0 ? record.NumLinesUncovered : ""
      }`
  );
console.log(lines.join("\n"));
