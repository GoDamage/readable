import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { fetchPosts, selectCategory, sortPostsBy, votePost } from "../actions";
import doSortPosts from "../utils";
import Header from "./Header";

class HomePage extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";
    const sortBy = this.props.match.params.sortby || null;
    dispatch(selectCategory(category));
    dispatch(sortPostsBy(sortBy));
    dispatch(fetchPosts(category));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";
    const sortBy = this.props.match.params.sortby || null;

    if (category !== prevProps.selectedCategory) {
      dispatch(selectCategory(category));
      dispatch(fetchPosts(category));
    }
    if (sortBy !== prevProps.sortBy) {
      dispatch(sortPostsBy(sortBy));
    }
  }

  render() {
    const { selectedCategory, posts, dispatch } = this.props;

    return (
      <div className="homepage">
        <Header />
        <p>
          Order by: <Link to={`/${selectedCategory}/sort/best`}>Best</Link>
          <Link to={`/${selectedCategory}/sort/new`}>New</Link>
        </p>
        <ul className="posts">
          {posts.map(post => (
            <li className="post-teaser" key={post.id}>
              <div className="post-teaser__vote">
                <button
                  onClick={() =>
                    dispatch(votePost(post.id, "upVote", selectedCategory))
                  }
                >
                  &#9650;
                </button>
                <strong>{post.voteScore}</strong>
                <button
                  onClick={() =>
                    dispatch(votePost(post.id, "downVote", selectedCategory))
                  }
                >
                  &#9660;
                </button>
              </div>
              <div className="post-teaser__content">
                <h2>
                  <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </h2>
                <span className="post-teaser__author-details">
                  Posted by <strong>{post.author}</strong>,
                  <Timestamp time={post.timestamp / 1000} precision={3} />
                </span>
                <p>{post.body}</p>
                <span className="post-teaser__comment-count">
                  {post.commentCount} comments
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsByCategory, selectedCategory, sortBy } = state;
  const { isFetching, lastUpdated, items } = postsByCategory[
    selectedCategory
  ] || {
    isFetching: true,
    posts: []
  };

  // Sort posts if required.
  const posts = doSortPosts(sortBy, items) || [];

  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated,
    sortBy
  };
}

export default connect(mapStateToProps)(HomePage);
