import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";
import { editPost, newPost } from "../actions";

class PostForm extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    category: "",
    author: ""
  };

  static propTypes = {
    post: PropTypes.object.isRequired,
    isNew: PropTypes.bool.isRequired,
    categoryNames: PropTypes.array.isRequired,
    isFetchingCategories: PropTypes.bool.isRequired,
    submitEditPost: PropTypes.func.isRequired,
    submitNewPost: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { post, isNew } = this.props;

    if (!isNew) {
      this.setState({
        id: post.id,
        title: post.title,
        body: post.body,
        category: post.category,
        author: post.author
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isNew, categoryNames } = this.props;
    if (isNew && categoryNames.length > 0 && this.state.category === "") {
      this.setState({ category: categoryNames[0].name });
    }
  }

  render() {
    const { categoryNames, isFetchingCategories, isNew } = this.props;

    const handleInputChange = e => {
      const { name, value } = e.target;

      this.setState({
        [name]: value
      });
    };

    const handleSubmit = e => {
      e.preventDefault();

      const { id, category, title, body, author } = this.state;
      const { submitEditPost, submitNewPost } = this.props;

      if (isNew) {
        const postId = uuid();

        const post = {
          id: postId,
          timestamp: Date.now(),
          title: title,
          body: body,
          author: author,
          category: category
        };

        submitNewPost(category, post);

        this.props.history.push(`/${category}/${postId}`);
      } else {
        const post = {
          title: title,
          body: body
        };

        submitEditPost(id, category, post);

        this.props.history.push(`/${category}/${id}`);
      }
    };

    const handleCancel = () => {
      const { isNew } = this.props;
      if (isNew) {
        this.props.history.push("/");
      } else {
        this.props.history.goBack();
      }
    };

    return (
      <div className="edit-form">
        <form className="edit__form" onSubmit={handleSubmit}>
          <label>
            Title<input
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => handleInputChange(e)}
              required
            />
          </label>

          <label>
            Body<textarea
              name="body"
              value={this.state.body}
              onChange={e => handleInputChange(e)}
              required
            />
          </label>

          {isNew && isFetchingCategories && <p>Loading Categories</p>}

          {isNew &&
            !isFetchingCategories &&
            categoryNames.length > 0 && (
              <label>
                Category<select
                  onChange={e => handleInputChange(e)}
                  value={this.state.category}
                  name="category"
                  required
                >
                  {categoryNames.map(cat => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

          {isNew && (
            <label>
              Author<input
                type="text"
                name="author"
                value={this.state.author}
                onChange={e => handleInputChange(e)}
                required
              />
            </label>
          )}

          <div className="form-actions">
            <input className="button" type="submit" value="submit" />
            <button className="button" onClick={() => handleCancel()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories } = state;
  const isFetchingCategories = categories["isFetching"];
  const categoryNames = categories["names"];

  return {
    isFetchingCategories,
    categoryNames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewPost: (category, data) => {
      dispatch(newPost(category, data));
    },
    submitEditPost: (id, category, data) => {
      dispatch(editPost(id, category, data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
