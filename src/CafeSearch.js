import React, {Component} from "react";
import "./CafeSearch.css";
import Search from "./Components/Search.js";
import {markerdata} from "./markerdata.js";
import Axios from "axios";

class CafeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    /* 링크 수정해야함 */
    /*   fetch("http://cafeaddy.xyz:8080/api/cafes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );  */
/* 
      Axios({
        method: "get",
        headers: {"Content-Type": `application/json`},
        url: "http://cafeaddy.xyz:8080/api/cafes",
      })
        .then(function (response) {
          /* 정상적으로 데이터를 받았을경우 
          console.log(response);
        })
        .catch((error) => {
          /* 에러 catch 
          console.log("error:", error.response);
        });*/
  } 

  render() {
    const {posts} = this.state;

    /*   Axios({
      url: "http://cafeaddy.xyz:8080/api/cafes",
      method: "get",
    });  */

    /* 검색 결과 리스트 */
    const postsLsit = posts.map((posts) => (
      <div key={posts.id} id={posts.id}>
        <h4>{posts.title}</h4>
        <h4>{posts.body}</h4>
      </div>
    ));

    return (
      <div>
        <div>
          <center style={{width:"100%", backgroundColor:"gray"}}>
            <Search  onCreate={this.handleCreate} onSubmit={this.handleSubmit}/>
          </center>
        </div>
        <div>
        {/* <h4>"{this.handleSubmit}"에 대한 검색 결과입니다.</h4> */}
        </div>

        <div>{postsLsit}</div>
      </div>
    );
  }
}

export default CafeSearch;
