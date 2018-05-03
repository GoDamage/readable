import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost } from "../actions";

class Post extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const postId = this.props.match.params.postid;
    dispatch(fetchPost(postId));
  }

  render() {
    const { post } = this.props;
    return (
      <div className="post">
        <h2>{post.title}</h2>
        <span>{post.author}</span>
        <p>{post.body}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, post } = state.post;
  return {
    isFetching,
    post
  };
}

export default connect(mapStateToProps)(Post);
