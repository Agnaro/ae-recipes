const mealComparer = require("./mealCompare.util");

const MEALS = [
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435394e9838a0f0862a0e9",
    day: "Monday",
    type: "Breakfast",
    name: "dfdf",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5cebbcae70f3ee3df82d4353",
    day: "Sunday",
    type: "Dinner",
    name: "Chicken",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435398e9838a0f0862a0ea",
    day: "Thursday",
    type: "Breakfast",
    name: "dfdf",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5cebc4cca328e93f90c7a8ea",
    day: "Wednesday",
    type: "Breakfast",
    name: "Eggs",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435420e9838a0f0862a0ed",
    day: "Wednesday",
    type: "Dinner",
    name: "dfdf",
    __v: 0
  }
];

const sortedMEAL = [
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435394e9838a0f0862a0e9",
    day: "Monday",
    type: "Breakfast",
    name: "dfdf",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5cebc4cca328e93f90c7a8ea",
    day: "Wednesday",
    type: "Breakfast",
    name: "Eggs",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435420e9838a0f0862a0ed",
    day: "Wednesday",
    type: "Dinner",
    name: "dfdf",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5d435398e9838a0f0862a0ea",
    day: "Thursday",
    type: "Breakfast",
    name: "dfdf",
    __v: 0
  },
  {
    users: ["5cea85804812830e38b964c4"],
    _id: "5cebbcae70f3ee3df82d4353",
    day: "Sunday",
    type: "Dinner",
    name: "Chicken",
    __v: 0
  }
];

describe("The meal comparer", () => {
  it("should sort by day and then type of meal", () => {
    expect(MEALS.sort(mealComparer)).toEqual(sortedMEAL);
  });
});
