import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This app will recognize a face in pictures you give it."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-3">
          <input className="f5 pa2 w-70 center" placeholder="Enter a URL" onChange={ onInputChange } type="text"/>
          <button className="w-30 grow f4 link ph3 pv dib black bg-orange" onClick={ onButtonSubmit } > Detect Face </button>  
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm