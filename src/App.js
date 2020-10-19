import React, { useEffect, useState} from 'react';
import './App.css';

let x = 0;
let y = 0;
let z = 0;

let x2 = 0;
let y2 = 0;
let z2 = 0;

let a = 0;
let b = 0;
let g = 0;

let count = 0;



    window.addEventListener("deviceorientation", (e) => {
      // console.log('orientat', e.alpha, e.beta, e.gamma);
      // setOrientation(e);
      a = e.alpha;
      b = e.beta;
      g = e.gamma;
      count++;

    }, true);

    window.addEventListener("devicemotion", (e) => {
      // console.log('orientat', e.alpha, e.beta, e.gamma);
      // setOrientation(e);
      x = e.acceleration.x;
      y = e.acceleration.y;
      z = e.acceleration.z;

      x2 = e.accelerationIncludingGravity.x;
      y2 = e.accelerationIncludingGravity.y;
      z2 = e.accelerationIncludingGravity.z;
      
      // count++;

    }, true);

    window.setInterval(() => {
      // setOrientation([a, b, g]);
      console.log(a, b, g, count);
    }, 1000);


function App() {
  const [orientation, setOrientation] = useState([x, y, z, x2, y2, z2, a, b, g]);
  // const [motion, setMotion] = useState({x: 0, y: 0, z: 0});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      setOrientation([x, y, z, x2, y2, z2, a, b, g]);
    }, 200);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>accel</div>
        <div>{orientation[0]}</div>
        <div>{orientation[1]}</div>
        <div>{orientation[2]}</div>
        <div>accel + grav</div>
        <div>{orientation[3]}</div>
        <div>{orientation[4]}</div>
        <div>{orientation[5]}</div>
        <div>orientation</div>
        <div>{Math.round(orientation[6])}</div>
        <div>{Math.round(orientation[7])}</div>
        <div>{Math.round(orientation[8])}</div>
      </header>
    </div>
  );
}

export default App;
