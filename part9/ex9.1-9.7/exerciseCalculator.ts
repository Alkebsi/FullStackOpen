interface calculatedExercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): calculatedExercises => {
  const periodLength = dailyExerciseHours.length;
  let sumHours = 0;
  let trainingDays = 0;
  let success = false;
  let rating = 1;
  let ratingDescription = 'needs some extra work';

  for (let i = 0; i < dailyExerciseHours.length; i++) {
    if (dailyExerciseHours[i] !== 0) {
      trainingDays += 1;
    }

    sumHours += dailyExerciseHours[i];
  }

  const average = sumHours / dailyExerciseHours.length;

  if (average >= target) {
    success = true;
  } else {
    success = false;
  }

  if (average >= target + 1) {
    rating = 3;
    ratingDescription = 'at your best! keep up the good work';
  } else if (success && average < target + 1) {
    rating = 2;
    ratingDescription = 'very excellent. keep it up';
  } else {
    rating = 1;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export const parseInputs = (args: string[]) => {
  if (isNaN(Number(args[2]))) {
    throw new Error('Inputs must be numbers');
  }

  const target = Number(args[2]);
  const days = [];

  if (args.length > 3 && args.length < 25) {
    for (let i = 3; i < args.length; i++) {
      if (isNaN(Number(args[i]))) {
        throw new Error('Inputs must be numbers');
      } else {
        days.push(Number(args[i]));
      }
    }
  } else {
    throw new Error('Too Much/Little Inputs');
  }

  return {
    target,
    days
  };
};