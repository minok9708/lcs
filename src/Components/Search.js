import React from "react";
import "./App.css";
import {Link} from "react-router-dom";

class Search extends React.Component {
  /* 메인페이지 검색기능 */
  state = {
    place: "",
  };

  handleChange = (e) => {
    this.setState({
      place: e.target.value,
    });
  };

  handleSubmit = (e) => {
    //페이지 리로딩 방지
    e.preventDefault();
    //상태값을 oncreate를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    //상태 초기화
    this.setState({
      place: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="search"
          placeholder="목적지를 검색하세요"
          value={this.state.place}
          onChange={
            this.handleChange
          } /* 택스트 값이 바뀔때마다 발생하는이벤트 */
        ></input>

        <map place={this.state.place}></map>
        <button id="searchMain" type="submit">
          검색
        </button>
        {/*<div>{this.state.place}</div> */}
      </form>
    );
  }
}

export default Search;
