import React from "react";
import "./Components/App.css";
import Search from "./Components/Search.js";
import {Link} from "react-router-dom";

class App extends React.Component {
  handleCreate = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1> 카 고</h1>
          <h6>주변카페 자리를 확인해보세요~</h6>
        </div>

        <div>
          <Search onCreate={this.handleCreate} />
        </div>

        <div>
          <Link to="/Map">
            <button id="curLocBtn" type="submit">
              현재 위치로 검색
            </button>
          </Link>
        </div>

        <div>
          <Link to="/LogIn">
            <button id="Login" type="submit">
              로그인
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;