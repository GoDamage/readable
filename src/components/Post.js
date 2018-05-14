import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost, fetchComments, votePost } from "../actions";

class Post extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    isFetchingComments: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const postId = this.props.match.params.postid;
    dispatch(fetchPost(postId));
    dispatch(fetchComments(postId));
  }

  render() {
    const { post, comments, dispatch } = this.props;
    return (
      <div className="post">
        <h2>{post.title}</h2>
        <button onClick={() => dispatch(votePost(post.id, "upVote"))}>
          Upboat
        </button>
        <strong>{post.voteScore}</strong>
        <button onClick={() => dispatch(votePost(post.id, "downVote"))}>
          Downboat
        </button>
        <span>{post.author}</span>
        <p>{post.body}</p>
        <ul className="comments">
          {comments.map(comment => <li key={comment.id}>{comment.body}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, post, isFetchingComments, comments } = state.post;
  return {
    isFetching,
    post,
    isFetchingComments,
    comments
  };
}

export default connect(mapStateToProps)(Post);
