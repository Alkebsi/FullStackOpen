import express from 'express';
import { calculateBmi } from './bmiCalculator';
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
    }
    
    res.status(200).send(value);
  } else {
    res.status(400).send({ error: 'malformated parameters' });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});