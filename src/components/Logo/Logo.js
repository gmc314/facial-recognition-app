import React from "react";
import Tilt from 'react-parallax-tilt';
import robot from './robot.png';

const Navigation = () => {
  return (
    <Tilt style={{ height: '100px', width: '200px'}} className="Tilt">
      <div>
        <img alt="logo" src={robot}></img>
      </div>
    </Tilt>
  );
}

export default Navigation