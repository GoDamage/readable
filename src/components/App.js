import React, { Component } from "react";
import { fetchPosts } from "../utils/api";

class App extends Component {
  loadPosts = () => {
    fetchPosts().then(post => console.log(post));
  };
  render() {
    return (
      <div className="App">
        <p>Hello world</p>
        <button className="loadPosts" onClick={this.loadPosts}>
          Load Posts
        </button>
      </div>
    );
  }
}

export default App;
