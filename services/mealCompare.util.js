const compareFunction = (a, b) => {
  const DAYS = new Map([
    ["Monday", 1],
    ["Tuesday", 2],
    ["Wednesday", 3],
    ["Thursday", 4],
    ["Friday", 5],
    ["Saturday", 6],
    ["Sunday", 7]
  ]);
  const TYPES = new Map([
    ["Breakfast", 1],
    ["Lunch", 2],
    ["Dinner", 3],
    ["Dessert", 4]
  ]);
  if (DAYS.get(a.day) < DAYS.get(b.day)) {
    return -1;
  } else {
    if (a.day === b.day) {
      if (a.type === b.type) {
        return 0;
      } else {
        if (TYPES.get(a.type) < TYPES.get(b.type)) {
          return -1;
        } else {
          return 1;
        }
      }
    } else {
      return 1;
    }
  }
};

module.exports = compareFunction;
