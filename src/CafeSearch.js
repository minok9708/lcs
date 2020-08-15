import React, {Component} from "react";
import "./CafeSearch.css";
import Search from "./Components/Search.js";

class CafeSearch extends React.Component {
  render() {
    return (
      <div>
        <div id="bar">
          <center>
            <Search onCreate={this.handleCreate} />
          </center>
        </div>

        <div>
          <CafeList />
        </div>
      </div>
    );
  }
}

class CafeList extends React.Component {
  render() {
    return (
      <div>
        <h4>"{}에 대한 검색 결과입니다."</h4>
        <table>
          
        </table>
      </div>
    );
  }
}

export default CafeSearch;
