// grade : q
// repetitionNumber : n | The repetition number n, which is the number of times the card has been successfully recalled (meaning it was given a grade ≥ 3) in a row since the last time it was not.
// easiness : EF | The easiness factor EF, which loosely indicates how "easy" the card is (more precisely, it determines how quickly the inter-repetition interval grows). The initial value of EF is 2.5.
// interval : I | The inter-repetition interval I, which is the length of time (in days) SuperMemo will wait after the previous review before asking the user to review the card again.
const SM2 = ({ grade, repetitionNumber, easiness, interval }) => {
  // correct response else incorrect response
  if (grade >= 3) {
    if (repetitionNumber === 0) {
      interval = 1;
    } else if (repetitionNumber === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness);
    }
    repetitionNumber += 1;
  } else {
    repetitionNumber = 0;
    interval = 1;
  }

  easiness = easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easiness < 1.3) {
    easiness = 1.3;
  }

  return { repetitionNumber, easiness, interval };
};

export default SM2;
