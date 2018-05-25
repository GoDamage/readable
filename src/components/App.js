import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";
import EditPost from "./EditPost";
import EditComment from "./EditComment";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sort/:sortby" component={HomePage} />
          <Route exact path="/new" component={EditPost} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/sort/:sortby" component={HomePage} />
          <Route exact path="/:category/:postid" component={Post} />
          <Route
            exact
            path="/:category/:postid/new-comment"
            component={EditComment}
          />
          <Route exact path="/:category/:postid/edit" component={EditPost} />
          <Route
            exact
            path="/:category/:postid/:commentid/edit"
            component={EditComment}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
