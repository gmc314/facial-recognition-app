import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from "particles-bg"; 

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
    
    return {
      topRow: height*topRow,
      leftCol: width*leftCol,
      bottomRow: width*(1 - bottomRow),
      rightCol: height*(1 - rightCol)
    }
  };

  displayBoundingBox = (box) => {
    this.setState({box: box});
  };
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    const { user, input } = this.state;
    fetch("https://face-recognition-server-1yyw.onrender.com/imageurl", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          input: input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://face-recognition-server-1yyw.onrender.com/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayBoundingBox(this.calculateFaceLocation(response))
      })
      .catch(console.log);
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({isSignedIn: true});
    } 
    this.setState({route: route});
  };

  render() {
    const { imageURL, box, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === "home"
          ? <div>
              <Logo />
              <Rank
                name={user.name}
                entries={user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceDetection box={box} imageURL={imageURL} />
            </div>
          : (
             route === "signin"
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;