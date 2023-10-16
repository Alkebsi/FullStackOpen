import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.extra}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.all} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positive} extra="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  // Show more statistics about the gathered feedback
  const average = (1 / all) * (good - bad);
  const positive = (good / all) * 100;

  // Button Incrementing functions
  const increaseGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const increaseBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
