import React from "react";
import './FaceDetection.css';

const FaceDetection = ({ imageURL, boundingBox }) => {
  console.log( boundingBox )
  return (
    <div className="center ma"> 
      <div className="absolute mt2">
        <img id="image" width="500px" height="auto" alt="" src={imageURL} />
        <div className="bounding-box" style={{top: boundingBox.topRow, right: boundingBox.rightCol, bottom: boundingBox.bottomRow, left: boundingBox.leftCol}}>
        </div>
      </div>
    </div> 
  );
}
//
        
        
export default FaceDetection