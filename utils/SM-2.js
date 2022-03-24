// grade : q
// repetitionNumber : n
// easiness : EF
// interval : I
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
