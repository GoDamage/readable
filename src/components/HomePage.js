import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPostsIfNeeded,
  fetchCategories,
  selectCategory
} from "../actions";
import PostList from "./PostList";

class HomePage extends Component {
  static propTypes = {
    isFetchingCategories: PropTypes.bool.isRequired,
    categoryNames: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";
    dispatch(fetchCategories());
    dispatch(selectCategory(category));
    dispatch(fetchPostsIfNeeded(category));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const category = this.props.match.params.category || "all";

    if (category !== prevProps.selectedCategory) {
      dispatch(selectCategory(category));
      dispatch(fetchPostsIfNeeded(category));
    }
  }

  render() {
    const { categoryNames, items } = this.props;

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
        <PostList posts={items} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, postsByCategory, selectedCategory } = state;
  const isFetchingCategories = categories["isFetching"] || true;
  const categoryNames = categories["names"] || {};
  const { isFetching, lastUpdated, items } = postsByCategory[
    selectedCategory
  ] || {
    isFetching: true,
    items: []
  };
  return {
    isFetchingCategories,
    categoryNames,
    items,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(HomePage);
