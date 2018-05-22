import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategories } from "../actions";

class Header extends Component {
  static propTypes = {
    isFetchingCategories: PropTypes.bool.isRequired,
    categoryNames: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { categoryNames } = this.props;

    return (
      <div className="header">
        <h1>
          <Link to="/">Readable</Link>
        </h1>
        <ul className="menu">
          {categoryNames.map(category => (
            <li key={category.path}>
              <Link to={`/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories } = state;
  const isFetchingCategories = categories["isFetching"] || true;
  const categoryNames = categories["names"] || {};

  return {
    isFetchingCategories,
    categoryNames
  };
}

export default connect(mapStateToProps)(Header);
