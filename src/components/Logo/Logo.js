import React from "react";
import Tilt from 'react-parallax-tilt';
import robot from './robot.png';

const Logo = () => {
  return (
    <Tilt style={{ height: '100px', width: '200px'}} className="Tilt">
      <div>
        <img longdesc="https://www.freepik.com/icon/robot_630426#fromView=search&page=1&position=5&uuid=553f2d3b-6ebe-4c59-bdc8-7a2cc9cd82b4" alt="Icon by Freepik" src={robot}></img>
      </div>
    </Tilt>
  );
}

export default Logo