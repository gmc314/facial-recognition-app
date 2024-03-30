import React from "react";

const FaceDetection = ({ imageURL }) => {
  return (
    <div className="center ma"> 
      <div className="mt2">
        <img id="image" width="500px" height="auto" alt="" src={imageURL} />
      </div>    
    </div> 
  );
}

export default FaceDetection