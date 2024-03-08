export const calculateBmi = (height: number, weight: number): string => {
  const squareHeight: number = Math.pow(height / 100, 2);
  const bmi = weight / squareHeight;
  
  if (height < 50 || weight < 20) {
    return "A cute child, better you visit your doctor, not BMI!";
  }
  
  if (bmi < 18.5) {
    return "Skinny (underweight)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "Fatty (overweight)";
  } else if (bmi > 29.9) {
    return "Too Much (Obese)";
  } else {
    throw new Error("You have provided wrong inputs!");
  }
}