import { useState } from 'react';

const Total = ({ parts }) => {
  const sum = parts.reduce((a, b) => {
    return {
      exercises: a.exercises + b.exercises,
    };
  });

  return <p>
    <b>total of {sum.exercises} exercises</b>
  </p>
};

export default Total;
