import React, { useRef } from 'react'
import { useState } from 'react';
import './calculatingspeed.css'

const Calculatingspeed = () => {
    const expressionBox = useRef(null);
    const answerBox = useRef(null);
    const [expression, setExpression] = useState(''); // Holds the generated expression
    const [result, setResult] = useState(null); // Holds the evaluated result
    // const [randomExpression,setRandomExpression] = useState(null);
    // const []

    function getRandomExpression()
    {
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
    const temp = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3} ${operator3} ${operand4}`;
    // setRandomExpression(temp);
    setExpression(temp);
    // Evaluate the generated expression
    // try {
    //     const evalResult = eval(randomExpression); // Evaluate the expression using eval
    //     setResult(evalResult.toFixed(2)); // Round result to 2 decimal places (if float)
    //   } catch (error) {
    //     setResult('Error evaluating expression');
    //   }
    }
    function handleStartClick()
    {
        getRandomExpression();
        expressionBox.current.value=expression;
        console.log(result);
    }
    function handleSubmitClick()
    {
        let ans = parseInt(answerBox.current.value);
        setResult((eval(expression)));
        // result = parseInt(result);
        console.log(typeof(ans));
        console.log(typeof(result));
        console.log("ans : ",ans);
        console.log("result : ", result);
        
        if(expression=='')
        {
            alert('Please start the btn :');
        }
        else if(answerBox.current.value=='')
        {
            alert("Please answer the expression !");
        }
        else if(ans==parseInt(result))
        {
            alert("Yess");
            expressionBox.current.value='';
            answerBox.current.value='';
            getRandomExpression();
            expressionBox.current.value=expression;
        }
        else
        {
            alert("Noo");
            expressionBox.current.value='';
            answerBox.current.value='';
            getRandomExpression();
            expressionBox.current.value=expression;
        }
        
    }
  return (
    <>
    <main>
    <div className="container">
    <h1>Calculating Speed</h1>
    <button onClick={handleStartClick}>Start</button> <br /> <br />
    
    <input type="text" placeholder=' Expression :' readOnly ref={expressionBox}/> <br /> <br />
    <input type="number" placeholder='Your Ans :'  ref={answerBox}/> <br /> <br />
    <button onClick={handleSubmitClick}>Submit</button>
    <p>10 sec left</p>
    </div>
    </main>
    </>
  )
}

export default Calculatingspeed