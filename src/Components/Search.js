import React from "react";
import "./App.css";
import {Link} from "react-router-dom";
import CafeSearch from "../CafeSearch";

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

  appClick = () => {
    console.log("키워드:" + this.state.place);
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
    const {place} = this.state;
    const {appClick} = this;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="목적지를 검색하세요"
            value={place}
            onChange={this.handleChange}
          />
          <button id="searchMain" type="submit" onClick={appClick}>
            검색
          </button>
        </form>
        {/* <CafeSearch place={this.state.place}/> */}
      </div>
    );
  }
}

export default Search;
