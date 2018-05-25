import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPost,
  fetchComments,
  votePost,
  voteComment,
  deletePost,
  deleteComment
} from "../actions";
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
    const { post, comments, dispatch, isFetching } = this.props;
    const { category } = this.props.match.params;
    const isDeleted = !post.id && !isFetching ? true : false;

    const IsDeletedRender = () => (
      <div className="fourohfour">
        <h2 className="page-title">404</h2>
        <p>Nothing to see here</p>
      </div>
    );

    return (
      <div className="post">
        <Header />
        {isDeleted ? (
          <IsDeletedRender />
        ) : (
          <div>
            <h2 className="page-title">{category}</h2>
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
                  <Link
                    className="button"
                    to={`/${post.category}/${post.id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className="button"
                    onClick={() => dispatch(deletePost(post.id, post.category))}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>

            <ul className="comments">
              <h3>{comments.length} comments</h3>
              {comments.map(comment => (
                <li className="comment" key={comment.id}>
                  <div className="comment__vote">
                    <button
                      onClick={() =>
                        dispatch(voteComment(comment.id, "upVote"))
                      }
                    >
                      &#9650;
                    </button>
                    <strong>{comment.voteScore}</strong>
                    <button
                      onClick={() =>
                        dispatch(voteComment(comment.id, "downVote"))
                      }
                    >
                      &#9660;
                    </button>
                  </div>
                  <div className="comment__detail">
                    <p className="comment__author">
                      <strong>{comment.author}</strong>
                    </p>
                    <p>{comment.body}</p>
                    <Link
                      className="button"
                      to={`/${post.category}/${post.id}/${comment.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="button"
                      onClick={() => dispatch(deleteComment(comment.id))}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              className="button"
              to={`/${post.category}/${post.id}/new-comment`}
            >
              New comment
            </Link>
          </div>
        )}
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
