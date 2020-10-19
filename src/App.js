import React, { useEffect, useState} from 'react';
import './App.css';
import { pedometer } from 'pedometer';

let x = 0;
let y = 0;
let z = 0;

let a = 0;
let b = 0;
let g = 0;

// let count = 0;

let accs = [];
let gyros = [];

const DEG_TO_RADS =  Math.PI / 180;



  window.addEventListener("deviceorientation", (e) => {
    // console.log('orientat', e.alpha, e.beta, e.gamma);
    // setOrientation(e);
    a = e.alpha;
    b = e.beta;
    g = e.gamma;
    // count++;

  }, true);

  window.addEventListener("devicemotion", (e) => {
    // console.log('orientat', e.alpha, e.beta, e.gamma);
    // setOrientation(e);
    x = e.acceleration.x;
    y = e.acceleration.y;
    z = e.acceleration.z;

    // x2 = e.accelerationIncludingGravity.x;
    // y2 = e.accelerationIncludingGravity.y;
    // z2 = e.accelerationIncludingGravity.z;
    
    // count++;

  }, true);

  window.setInterval(() => {
   
    accs.push([x, y, z]);
    
    // pitch roll yaw (beta, gamma, alpha)
    gyros.push([b * DEG_TO_RADS, g * DEG_TO_RADS, a * DEG_TO_RADS]);

  }, 50);

let steps = 0;

function calcSteps() {
  const res = pedometer(accs, gyros, 20, {});
  steps = res.length;
  console.log([x, y, z, a, b, g], steps, res);
  accs = [];
  gyros = [];
}

function App() {
  const [orientation, setOrientation] = useState([x, y, z, a, b, g]);
  // const [motion, setMotion] = useState({x: 0, y: 0, z: 0});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      setOrientation([x, y, z, a, b, g]);
    }, 200);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>accel</div>
        <div>{Number(orientation[0]).toFixed(2)}</div>
        <div>{Number(orientation[1]).toFixed(2)}</div>
        <div>{Number(orientation[2]).toFixed(2)}</div>
        <br/><br/><div>orientation</div>
        <div>{Math.round(orientation[3])}</div>
        <div>{Math.round(orientation[4])}</div>
        <div>{Math.round(orientation[5])}</div>
        <br/><br/>
        <button onClick={calcSteps}>
          calc
        </button>
        <br/><br/>
        <div>{steps}</div>
      </header>
    </div>
  );
}

export default App;
