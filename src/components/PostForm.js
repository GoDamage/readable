import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editPost } from "../actions";

class PostForm extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    category: "",
    author: ""
  };

  componentDidMount() {
    const { post } = this.props;

    this.setState({
      id: post.id,
      title: post.title,
      body: post.body,
      category: post.category,
      author: post.author
    });
  }
  render() {
    const handleInputChange = e => {
      const { name, value } = e.target;

      this.setState({
        [name]: value
      });
    };

    const handleSubmit = e => {
      e.preventDefault();

      const { id, category, title, body } = this.state;
      const { submitEditPost } = this.props;

      const post = {
        title: title,
        body: body
      };

      submitEditPost(id, category, post);

      this.props.history.push(`/${category}/${id}`);
    };

    return (
      <div className="post__detail">
        <form className="edit-post__form" onSubmit={handleSubmit}>
          <label>
            Title<input
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => handleInputChange(e)}
            />
          </label>

          <label>
            Body<textarea
              name="body"
              value={this.state.body}
              onChange={e => handleInputChange(e)}
            />
          </label>

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitEditPost: (id, category, data) => {
      dispatch(editPost(id, category, data));
    }
  };
}

export default connect(null, mapDispatchToProps)(PostForm);
