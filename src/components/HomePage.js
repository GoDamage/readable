import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPostsIfNeeded,
  fetchCategories,
  selectCategory,
  sortPostsBy
} from "../actions";
import doSortPosts from "../utils";
import PostList from "./PostList";

class HomePage extends Component {
  static propTypes = {
    isFetchingCategories: PropTypes.bool.isRequired,
    categoryNames: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";
    const sortBy = this.props.match.params.sortby || null;
    dispatch(fetchCategories());
    dispatch(selectCategory(category));
    dispatch(sortPostsBy(sortBy));
    dispatch(fetchPostsIfNeeded(category));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";
    const sortBy = this.props.match.params.sortby || null;

    if (category !== prevProps.selectedCategory) {
      dispatch(selectCategory(category));
      dispatch(fetchPostsIfNeeded(category));
    }
    if (sortBy !== prevProps.sortBy) {
      dispatch(sortPostsBy(sortBy));
    }
  }

  render() {
    const { categoryNames, selectedCategory, posts } = this.props;

    return (
      <div className="homepage">
        <div className="header">
          <h1>
            <Link to="/">Readable</Link>
          </h1>
          <ul className="menu">
            {categoryNames.map(category => (
              <li key={category.path}>
                <Link to={`/cat/${category.path}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <p>
          Order by: <Link to={`/cat/${selectedCategory}/sort/best`}>Best</Link>
          <Link to={`/cat/${selectedCategory}/sort/new`}>New</Link>
        </p>
        <PostList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, postsByCategory, selectedCategory, sortBy } = state;
  const isFetchingCategories = categories["isFetching"] || true;
  const categoryNames = categories["names"] || {};
  const { isFetching, lastUpdated, items } = postsByCategory[
    selectedCategory
  ] || {
    isFetching: true,
    posts: []
  };

  // Sort posts if required.
  const posts = doSortPosts(sortBy, items) || [];

  return {
    isFetchingCategories,
    categoryNames,
    selectedCategory,
    posts,
    isFetching,
    lastUpdated,
    sortBy
  };
}

export default connect(mapStateToProps)(HomePage);
