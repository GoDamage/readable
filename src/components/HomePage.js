import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPostsIfNeeded } from "../actions";
import Post from "./Post";

class HomePage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded("all"));
  }

  render() {
    const { items } = this.props;

    return (
      <div className="homepage">
        {items.map(item => (
          <li key={item.id}>
            <Post postDetails={item} />
          </li>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsByCategory } = state;
  const { isFetching, lastUpdated, items } = postsByCategory["all"] || {
    isFetching: true,
    items: []
  };
  return { items, isFetching, lastUpdated };
}

export default connect(mapStateToProps)(HomePage);
