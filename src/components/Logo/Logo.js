import React from "react";
import Tilt from "react-parallax-tilt";
import robot from "./robot.png";

const Logo = () =>  {
  return (
    <div className="ma4 mt0">
      <Tilt options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div>
          <img style={{paddingTop: "5px"}} alt="robot logo" longdesc="https://www.freepik.com/icon/robot_630426#fromView=search&page=1&position=5&uuid=553f2d3b-6ebe-4c59-bdc8-7a2cc9cd82b4" src={robot}/>
        </div>
      </Tilt>
    </div>
  );
}
export default Logo