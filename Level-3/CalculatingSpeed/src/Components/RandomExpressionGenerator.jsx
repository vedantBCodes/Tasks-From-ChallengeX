// import React, { useState } from 'react';

const RandomExpressionGenerator = ({expression , result,setExpression,setResult}) => {
 

  // Function to generate a random number within a range
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Function to generate a random operator from ['+', '-', '*', '/']
  const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
  };

  // Function to generate a random expression with 4 operands and 3 operators
  
    // Generate 4 random operands (numbers between 1 and 100)
    const operand1 = getRandomNumber(1, 100);
    const operand2 = getRandomNumber(1, 100);
    const operand3 = getRandomNumber(1, 100);
    const operand4 = getRandomNumber(1, 100);

    // Generate 3 random operators
    const operator1 = getRandomOperator();
    const operator2 = getRandomOperator();
    const operator3 = getRandomOperator();

    // Construct the expression string
    const randomExpression = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3} ${operator3} ${operand4}`;
    setExpression(randomExpression);

    // Evaluate the generated expression
    try {
      const evalResult = eval(randomExpression); // Evaluate the expression using eval
      setResult(evalResult.toFixed(2)); // Round result to 2 decimal places (if float)
    } catch (error) {
      setResult('Error evaluating expression');
    }

  return (
<>
<h1>{expression}</h1>
<h1>{result}</h1>
</>
  )}

export default RandomExpressionGenerator;
