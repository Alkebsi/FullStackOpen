import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

// WebBMI
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const { height, weight } = req.query;
    const value = {
      height,
      weight,
      message: calculateBmi(Number(height), Number(weight))
    };
    
    res.status(200).json(value);
  } else {
    res.status(400).json({ error: 'malformated parameters' });
  }
});

const PORTA = 3003;

app.listen(PORTA, () => {
  console.log(`Server running on port ${PORTA}`);
});

// WebExercises
const apk = express();
apk.use(express.json());

apk.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    res.status(400).json({error: 'parameters missing'});
  } 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  else if (isNaN(target) || !Array.isArray(daily_exercises)) {
    res.status(400).json({error: 'malformatted parameters'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  console.log(typeof daily_exercises, typeof target, result);
  res.json(result);
});

apk.get('/exercises', (_req, res) => {
  res.send('Just send post requests to this endpoint!');
});

const PORTB = 3002;

apk.listen(PORTB, () => {
  console.log(`Server running on port ${PORTB}`);
});