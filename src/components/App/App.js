import React, { Component } from "react";
import Header from "../Header/Header";
import PaletteMaker from "../PaletteMaker/PaletteMaker";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PaletteMaker />
      </div>
    );
  }
}

export default App;
