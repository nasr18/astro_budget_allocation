// rebalance the budget allocations equally
function rebalanceBudget(streamTypes, budgetAllotted) {
  const remainingBudget = Object.values(budgetAllotted).reduce(
    (acc, budget) => acc + budget,
    0,
  );
  const equalAllocation = remainingBudget / streamTypes.length;
  for (const streamType of streamTypes) {
    budgetAllotted[streamType] = equalAllocation;
  }
  return budgetAllotted;
}

function generateRandomConsumption() {
  return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
}

function checkBalance(stream1Budget, stream2Budget) {
  const totalBudget = stream1Budget + stream2Budget;
  const stream1BudgetBalance = (stream1Budget / totalBudget) * 100;
  const stream2BudgetBalance = (stream2Budget / totalBudget) * 100;
  return { stream1BudgetBalance, stream2BudgetBalance };
}

// Function to simulate the budget allocation
function simulateBudgetAllocation(streams, streamTypes) {
  while (
    streams["TV Linear"] > 0 &&
    streams["Over-the-top Video on Demand"] > 0
  ) {
    streams["TV Linear"] -= generateRandomConsumption();
    streams["Over-the-top Video on Demand"] -= generateRandomConsumption();

    const { stream1BudgetBalance, stream2BudgetBalance } = checkBalance(
      streams["TV Linear"],
      streams["Over-the-top Video on Demand"],
    );
    // console.log({ stream1BudgetBalance, stream2BudgetBalance });

    // Then check the balance of both streams.
    //   i. If both have balance of 0% or less, exit program.
    //   ii. If both have balance of less than 5% OR have balance of 5% or more, do nothing.
    //   iii. If one of them have balance of less than 5%, rebalance both streams to have equal balance.

    if (stream1BudgetBalance <= 0 && stream2BudgetBalance <= 0) {
      // console.log("if");
      break;
    } else if (stream1BudgetBalance < 5 || stream2BudgetBalance < 5) {
      // console.log("else if");
      rebalanceBudget(streamTypes, streams);
    }
  }

  return streams;
}

// Unit Test
const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("Budget Allocation Test", function () {
  it("should not have negative budgets", function () {
    const streams = {
      "TV Linear": 50_000,
      "Over-the-top Video on Demand": 50_000,
    };
    const streamTypes = Object.keys(streams);

    const [stream1Budget, stream2Budget] = simulateBudgetAllocation(
      streams,
      streamTypes,
    );
    console.log("result", { stream1Budget, stream2Budget });

    assert.ok(stream1Budget >= 0, "Stream 1 budget should not be negative.");
    assert.ok(stream2Budget >= 0, "Stream 2 budget should not be negative.");
  });
});
