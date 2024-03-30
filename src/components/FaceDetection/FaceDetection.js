import React from "react";

const FaceDetection = ({ imageURL }) => {
  return (
    <div className="center ma"> 
      <div className="mt2">
        <img width="500px" height="auto" alt="" src={imageURL} />
      </div>    
    </div> 
  );
}

export default FaceDetection