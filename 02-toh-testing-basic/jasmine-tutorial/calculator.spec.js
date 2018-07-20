function scoreCalculator(scores) {
  return scores.reduce((acc, val) => val < 0 ? acc: acc + val, 0);
}

describe('scoreCalculator', () => {

});
