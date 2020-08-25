import React from "react";
import "./App.css";
import {Link} from "react-router-dom";
import CafeSearch from "../CafeSearch";

class Search extends React.Component {
  /* 메인페이지 검색기능 */
  state = {
    keyword: "",
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  appClick = () => {
    console.log("키워드:" + this.state.keyword);
  };

  handleSubmit = (e) => {
    //전송할 때 페이지 리로딩 방지()
    e.preventDefault();
    //상태값을 oncreate를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    //상태 초기화
    this.setState({
      place: "",
    });
  };

  render() {
    const {keyword} = this.state;
    const {appClick} = this;

    return (
      <div>
        <div>
          <form id="bar" /* 서버로 keyword 보내기 */
            action="http://cafeaddy.xyz:8080/api/name"
            method="post"
            /* onSubmit={this.handleSubmit} */
          >
            <input
              type="text"
              placeholder="목적지를 검색하세요"
              value={keyword}
              onChange={this.handleChange}
              name="name"
            />
            <input
              id="searchMain"
              type="submit"
              value="검색"
              onClick={appClick}
            />
          </form>
        </div>

        <div>
          <h4>"{keyword}"에 대한 검색 결과입니다.</h4>
        </div>
      </div>
    );
  }
}

export default Search;
