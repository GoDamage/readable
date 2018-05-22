import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost, fetchComments, votePost, voteComment } from "../actions";
import Header from "./Header";
import Timestamp from "react-timestamp";

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
        <Header />
        <div className="post__detail">
          <div className="post__vote">
            <button onClick={() => dispatch(votePost(post.id, "upVote"))}>
              &#9650;
            </button>
            <strong>{post.voteScore}</strong>
            <button onClick={() => dispatch(votePost(post.id, "downVote"))}>
              &#9660;
            </button>
          </div>
          <div className="post__content">
            <h2>{post.title}</h2>

            <span className="post__author-details">
              Posted by <strong>{post.author}</strong> on{" "}
              <Timestamp time={post.timestamp / 1000} />
            </span>
            <p>{post.body}</p>
            <span className="post__edit-actions">
              <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link>
            </span>
          </div>
        </div>

        <ul className="comments">
          <h3>{post.commentCount} comments</h3>
          {comments.map(comment => (
            <li className="comment" key={comment.id}>
              <div className="comment__vote">
                <button
                  onClick={() => dispatch(voteComment(comment.id, "upVote"))}
                >
                  &#9650;
                </button>
                <strong>{comment.voteScore}</strong>
                <button
                  onClick={() => dispatch(voteComment(comment.id, "downVote"))}
                >
                  &#9660;
                </button>
              </div>
              <div className="comment__detail">
                <p className="comment__author">
                  <strong>{comment.author}</strong>
                </p>
                {comment.body}
              </div>
            </li>
          ))}
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
