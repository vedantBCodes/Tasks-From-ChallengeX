import React, { useRef } from 'react'
import { useState } from 'react';
import './Guessinggame.css'

const Guessinggame = () => {

const input = useRef(null);
const msgContainer = useRef(null);
var [num,setNum] = useState(Math.floor(Math.random()*101));
const [isDiabled,setIsDiabled] = useState(true);
const [guessNumbers,setGuessNumbers] = useState([]);


// console.log(num);  //for Testing
var msg1=document.createElement("p");
var msg2=document.createElement("p");

function handleSubmit()
{
    var enteredNum=input.current.value;
    if(enteredNum=="")
    {
        alert("Please enter a number :");
        return;
    }
    setGuessNumbers([...guessNumbers,enteredNum]);
    msg1.innerText="";
    if(enteredNum<num)
    {
      msgContainer.current.innerHTML='';
        msg1.innerText="Too Low !";
        msg2.innerText=`Your Guesses :${[...guessNumbers,enteredNum]}`;
        msgContainer.current.appendChild(msg1);
        msgContainer.current.appendChild(msg2);
        input.current.value="";
    }
    else if(enteredNum>num)
    {
      msgContainer.current.innerHTML='';
        msg1.innerText="Too High !";
        msg2.innerText=`Your Guesses :${[...guessNumbers,enteredNum]}`;
        msgContainer.current.appendChild(msg1);
        msgContainer.current.appendChild(msg2);
        input.current.value="";
    }
    else
    {
      msgContainer.current.innerHTML='';
        msg1.innerText="You got it ! Congrats";
        msg2.innerText=`Your Guesses :${[...guessNumbers,enteredNum]}`;
        msgContainer.current.appendChild(msg1);
        msgContainer.current.appendChild(msg2);
        input.current.value="";
        setIsDiabled(false);
        input.current.disabled = true;
    }
}

function onStartBtnHandle()
{
  msgContainer.current.innerHTML='';
    input.current.disabled = false;
    setIsDiabled(true);
    setNum(Math.floor(Math.random()*101));
    guessNumbers.splice(0, guessNumbers.length);
}
  return (
   <>
   <main>
   <div className="container">
        <h1>Guess the number</h1>
        <p>Guess number between 0 to 100</p>
        <input type="number" placeholder="Enter a number" min="0" max="100" ref={input}/>
        <div id="Btns">
            <button id="submitBtn" onClick={handleSubmit}  disabled={!isDiabled}>Submit</button>
            <button id="startBtn" onClick={onStartBtnHandle} disabled={isDiabled}>Start Game</button>
        </div>
        <div id="msg" ref={msgContainer}>
        </div>
    </div>
    </main>
   </>
  )
}

export default Guessinggame