import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sort/:sortby" component={HomePage} />
          <Route exact path="/cat/:category" component={HomePage} />
          <Route
            exact
            path="/cat/:category/sort/:sortby"
            component={HomePage}
          />
          <Route exact path="/cat/:category/post/:postid" component={Post} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
