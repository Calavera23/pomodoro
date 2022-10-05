import React, { useState, useRef } from 'react';
import './App.css';
import './timer';

function padTime(time){
  return time.toString().padStart(2,'0');
} 


export default function App() {
  const [title, setTitle]=useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning]=useState(false);
  const intervalRef = useRef(null);

  function startTimer() {
    if(intervalRef.current!==null)
      return;
    setIsRunning(true);
    setTitle(`You're doing great!`);
    intervalRef.current=setInterval(()=> {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft -1;
        
        //reset the timer
        resetTimer();
        return 0;
      });
    },1000);
    console.log(intervalRef);



  }
  
  function stopTimer(){
    if(intervalRef.current==null)
      return;
    
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current=null;
    setTitle('Keep it up!');
    setIsRunning(false);
  }

  function resetTimer(){
    clearInterval(intervalRef.current);
    setTitle('Ready to go another round?');
    setTimeLeft(25*60);
    setIsRunning(false);
    intervalRef.current=null;

  }

  function addFiveMinutes(){
    setTimeLeft(timeLeft+5*60);
  }


  const minutes= padTime(Math.floor(timeLeft/60));
  const seconds = padTime(timeLeft-minutes*60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button  onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
        <button onClick={addFiveMinutes}>Add 5 minutes</button>
      </div>
    </div>
  );
}
