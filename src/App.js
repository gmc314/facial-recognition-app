import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';

const initializeClarifaiAPI = (imageURL) => {
  const PAT = '';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      boundingBox: [{}], 
    }
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const topRow = boundingBox.top_row.toFixed(3);
    const leftCol = boundingBox.left_col.toFixed(3);
    const bottomRow = boundingBox.bottom_row.toFixed(3);
    const rightCol = boundingBox.right_col.toFixed(3);
    //const prob = data.outputs[0].data.regions[0].data.concepts[0].value;
    return {
      //probability: prob,
      topRow: height*topRow,
      leftCol: width*leftCol,
      bottomRow: width*(1 - bottomRow),
      rightCol: height*(1 - rightCol)
    }
  };

  displayBoundingBoxes = (box) => {
    this.setState({boundingBox: box});
  };
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});    
    const MODEL_ID = 'face-detection';
    const requestOptions = initializeClarifaiAPI(this.state.input);
    
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => this.displayBoundingBoxes(this.calculateFaceLocation(result)))
      .catch(error => console.log(error));
  };

  render() {
    const { imageURL, boundingBox} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <SignIn />
        <Rank name={ "Grant" } entries={ "5" }/>
        <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit={ this.onButtonSubmit }/>
        <FaceDetection boundingBox={ boundingBox } imageURL={ imageURL }/>
      </div>
    );
  }
}

export default App;
