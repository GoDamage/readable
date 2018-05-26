import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as postActions from "../actions/post";
import * as commentActions from "../actions/comment";
import Header from "./Header";
import Timestamp from "react-timestamp";

class Post extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    isFetchingComments: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    fetchPost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props.dispatch);
    const { dispatch, fetchPost, fetchComments } = this.props;
    const postId = this.props.match.params.postid;
    dispatch(fetchPost(postId));
    dispatch(fetchComments(postId));
  }

  render() {
    const { post, dispatch, isFetching, votePost, deletePost } = this.props;
    const { category } = this.props.match.params;
    const isDeleted = !post.id && !isFetching ? true : false;

    const IsDeletedRender = () => (
      <div className="fourohfour">
        <h2 className="page-title">404</h2>
        <p>Nothing to see here</p>
        <Link to="/">Return to the homepage</Link>
      </div>
    );

    const Comments = () => {
      const {
        post,
        comments,
        dispatch,
        voteComment,
        deleteComment
      } = this.props;

      return (
        <ul className="comments">
          <h3>{comments.length} comments</h3>
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
      );
    };

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

            <Comments />

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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...postActions,
    ...commentActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
