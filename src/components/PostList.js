import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  render() {
    const { posts } = this.props;

    return (
      <div>
        <ul className="posts">
          {posts.map(post => (
            <li key={post.id}>
              <div className="post">
                <h2>
                  <Link to={`/cat/${post.category}/post/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <p>{post.body}</p>
                <strong>{post.voteScore}</strong>
                <p>{post.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
