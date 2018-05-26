import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";
import * as commentActions from "../actions/comment";
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
    dispatch: PropTypes.func.isRequired,
    fetchComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    newComment: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { dispatch, fetchComment } = this.props;
    const commentId = this.props.match.params.commentid;
    if (commentId) {
      dispatch(fetchComment(commentId));
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
      const { dispatch, editComment, newComment } = this.props;
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

        dispatch(newComment(comment));
      } else {
        const comment = {
          timestamp: Date.now(),
          body: body
        };

        dispatch(editComment(commentid, comment));
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
              <div className="form-actions">
                <input className="button" type="submit" value="submit" />
                <button
                  className="button"
                  onClick={() => this.props.history.goBack}
                >
                  Cancel
                </button>
              </div>
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

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...commentActions
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
