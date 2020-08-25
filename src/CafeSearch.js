import React, {Component} from "react";
import "./CafeSearch.css";
import Search from "./Components/Search.js";
import cafe_list from "./cafe_list.json";

class CafeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {   /* 링크 수정해야함 */
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
  }

  render() {
    const {posts} = this.state;

    const postsLsit = posts.map((posts) => (
      <div key={posts.id} id={posts.id}>
        <h4>{posts.title}</h4>
        <h4>{posts.body}</h4>
      </div>
    ));

    return (
      <div>
        <div>
          <center>
            <Search onCreate={this.handleCreate} />
          </center>
        </div>

        <div>{postsLsit}</div>
      </div>
    );
  }
}

export default CafeSearch;
