import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import Header from "./Header";
import PostForm from "./PostForm";

class EditPost extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const postId = this.props.match.params.postid;
    dispatch(fetchPost(postId));
  }

  render() {
    const { isFetching, post, dispatch, history } = this.props;

    const form = isFetching ? (
      <p>Loading...</p>
    ) : (
      <PostForm post={post} history={history} />
    );

    /*{type === "post" && (
      <label>
        Category<select>
          {categoryList.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    )}*/

    return (
      <div className="edit-post">
        <Header />
        {form}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, post } = state.post;
  //const categoryList = state.categories.names;
  return { isFetching, post };
}

export default connect(mapStateToProps)(EditPost);
