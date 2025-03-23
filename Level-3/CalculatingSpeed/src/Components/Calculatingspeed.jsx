import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './calculatingspeed.css'

const Calculatingspeed = () => {
    const expressionBox = useRef(null);
    const answerBox = useRef(null);
    const startBtn = useRef(null);
    const submitBtn = useRef(null);
    const [expression, setExpression] = useState(''); // Holds the generated expression
    const [result, setResult] = useState(null); // Holds the evaluated result
    const [time, setTime] = useState(20);  // Timer starting from 20
    const [isRunning, setIsRunning] = useState(false);  // Controls the stopwatch state
    const [correctExpressionCount,setCorrectExpressionCount] = useState(0);
    const [totalExpressionCount,setTotalExpressionCount] = useState(0);

    // const [randomExpression,setRandomExpression] = useState(null);

    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
          timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
        }
    
        // Cleanup to clear the interval when the component unmounts or timer stops
        return () => clearInterval(timer);
      }, [isRunning, time]); // Dependencies - runs when `isRunning` or `time` changes
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
  
    // Generate 4 random operands (numbers between 1 and 10)
    const operand1 = getRandomNumber(1, 10);
    const operand2 = getRandomNumber(1, 10);
    const operand3 = getRandomNumber(1, 10);
    const operand4 = getRandomNumber(1, 10);

    // Generate 3 random operators
    const operator1 = getRandomOperator();
    const operator2 = getRandomOperator();
    const operator3 = getRandomOperator();

    // Construct the expression string
    const temp = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3} ${operator3} ${operand4}`;
    // setRandomExpression(temp);
    console.log(temp);
    setExpression(temp);
    console.log("Expression : ",expression);
    setTotalExpressionCount((totalExpressionCount)=>{totalExpressionCount+1});

    
    
    // Evaluate the generated expression
    // try {
    //     const evalResult = eval(randomExpression); // Evaluate the expression using eval
    //     setResult(evalResult.toFixed(2)); // Round result to 2 decimal places (if float)
    //   } catch (error) {
    //     setResult('Error evaluating expression');
    //   }
    }
    if(time==0)
    {
        let container=document.querySelector('.container');
        let p=document.createElement('p');
        p.innerText=`You solved ${correctExpressionCount} out of ${totalExpressionCount} !`;
        container.appendChild(p);
        let h3=document.createElement('h3');
        h3.innerText="Game Over !!!!";
        h3.classList.add('gameOverStatement');
        container.appendChild(h3);
        disableEverything();

        // alert("Game Over !!!!!");
    }
    function handleStartClick()
    {
        if (!isRunning) {
            setIsRunning(true);  // Start the stopwatch when 'Start' is clicked
          }
        getRandomExpression();
        expressionBox.current.value=expression;
        // console.log("Expression : ",expression);
    }
    function disableEverything()
    {
        expressionBox.current.disabled=true;
        answerBox.current.disabled=true;
        startBtn.current.disabled = true;
        submitBtn.current.disabled = true;
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
            setCorrectExpressionCount((correctExpressionCount)=>{correctExpressionCount+1});
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
    <button onClick={handleStartClick} ref={startBtn}>Start</button> <br /> <br />
    
    <input type="text" placeholder=' Expression :' readOnly ref={expressionBox}/> <br /> <br />
    <input type="number" placeholder='Your Ans :'  ref={answerBox}/> <br /> <br />
    <button onClick={handleSubmitClick} ref={submitBtn}>Submit</button>
    <p>{time} sec left</p>
    </div>
    </main>
    </>
  )
}

export default Calculatingspeed