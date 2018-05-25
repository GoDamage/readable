import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";
import { fetchComment, editComment, newComment } from "../actions";
import Header from "./Header";

class EditComment extends Component {
  state = {
    id: "",
    body: "",
    author: ""
  };

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    comment: PropTypes.object.isRequired,
    doFetchComment: PropTypes.func.isRequired,
    submitEditComment: PropTypes.func.isRequired,
    submitNewComment: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { doFetchComment } = this.props;
    const commentId = this.props.match.params.commentid;
    if (commentId) {
      doFetchComment(commentId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { comment } = this.props;
    const isNew = this.props.match.params.commentid ? false : true;

    if (!isNew && comment.body && this.state.body === "") {
      this.setState({ body: comment.body });
    }
  }

  render() {
    const { isFetching } = this.props;
    const isNew = this.props.match.params.commentid ? false : true;

    const handleInputChange = e => {
      const { name, value } = e.target;

      this.setState({
        [name]: value
      });
    };

    const handleSubmit = e => {
      e.preventDefault();

      const { body, author } = this.state;
      const { submitEditComment, submitNewComment } = this.props;
      const { postid, commentid, category } = this.props.match.params;

      if (isNew) {
        const newCommentId = uuid();

        const comment = {
          id: newCommentId,
          timestamp: Date.now(),
          body: body,
          author: author,
          parentId: postid
        };

        submitNewComment(comment);
      } else {
        const comment = {
          timestamp: Date.now(),
          body: body
        };

        submitEditComment(commentid, comment);
      }

      this.props.history.push(`/${category}/${postid}`);
    };

    return (
      <div className="edit-comment">
        <Header />
        <h2 className="page-title">{isNew ? "New" : "Edit"} Comment</h2>

        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div className="edit-form">
            <form className="edit__form" onSubmit={handleSubmit}>
              <label>
                Body<textarea
                  name="body"
                  value={this.state.body}
                  onChange={e => handleInputChange(e)}
                  required
                />
              </label>
              {isNew ? (
                <label>
                  Author<input
                    type="text"
                    name="author"
                    value={this.state.author}
                    onChange={e => handleInputChange(e)}
                    required
                  />
                </label>
              ) : null}
              <input type="submit" value="submit" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, comment } = state.comment;
  return { isFetching, comment };
}

function mapDispatchToProps(dispatch) {
  return {
    doFetchComment: id => {
      dispatch(fetchComment(id));
    },
    submitNewComment: data => {
      dispatch(newComment(data));
    },
    submitEditComment: (id, data) => {
      dispatch(editComment(id, data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
