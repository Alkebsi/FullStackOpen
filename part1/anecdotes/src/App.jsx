import { useState } from 'react';

const Best = ({ votes, anecdotes }) => {
  const [best, setBest] = useState([0, 0]);
  const [perviusVote, setPerviusVote] = useState(0);
  const [bestVote, setBestVote] = useState(0);

  const final = votes.map((vote, index) => {
    if (vote > perviusVote) {
      setBest([vote, index]);
      setPerviusVote(vote);
      setBestVote(vote);
    }

    if (vote == bestVote && vote !== 0) {
      return (
        <p key={index}>
          {anecdotes[index]}
          <br />
          has {vote} votes
        </p>
      );
    }
  });

  return final;
};

const App = () => {
  // Setting random values
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  // Button Functions
  const handleAnecdotes = () => {
    setSelected(Math.round(Math.random() * 7));
  };

  const handleVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;

    setVotes(votesCopy);
  };

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>
        {anecdotes[selected]}
        <br />
        had {votes[selected]} votes
      </p>

      <button onClick={handleVotes}>vote</button>
      <button onClick={handleAnecdotes}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Best votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
