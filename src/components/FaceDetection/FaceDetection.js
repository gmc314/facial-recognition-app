import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imageURL, box }) => {
  return (
    <div className="center ma"> 
      <div className="absolute mt2">
        <img id="image" width="500px" height="auto" alt="" src={imageURL} />
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
        </div>
      </div>
    </div> 
  ); 
}   
        
export default FaceDetection;