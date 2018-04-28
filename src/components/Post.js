import React, { Component } from "react";
import PropTypes from "prop-types";

class Post extends Component {
  static propTypes = {
    postDetails: PropTypes.object.isRequired
  };
  render() {
    const { postDetails } = this.props;
    return (
      <div className="post">
        <h1>{postDetails.title}</h1>
        <p>{postDetails.body}</p>
      </div>
    );
  }
}

export default Post;
