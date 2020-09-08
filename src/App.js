import React from "react";
import "./Components/App.css";
import Search from "./Components/Search.js";
import CafeSearch from "./CafeSearch.js";
import {Link} from "react-router-dom";

class App extends React.Component {
  handleCreate = (data) => {
    console.log(data);
  };

  render() {
    return (
      <center>
        <div className="App">
          <div>
           {/*  <img src={"https://cdn.icon-icons.com/icons2/591/PNG/512/barista-icons_coffee-shop-sign_icon-icons.com_55423.png"} className="App-logo" alt="logo" /> */}
            <h1> 카페어디</h1>
            <h6>주변카페 자리를 확인해보세요~</h6>
          </div>

          <div>
            <Link to="/cafesearch">
              <form>
                <input type="search" id="selectMain" />
                <button id="searchMain">검색</button>
              </form>
            </Link>
          </div>

          <div>
            <Link to="/map">
              <button id="curLocBtn" type="submit">
                현재 위치로 검색
              </button>
            </Link>
          </div>

          <div>
            <Link to="/login">
              <button id="Login" type="submit">
                로그인
              </button>
            </Link>
          </div>
        </div>
      </center>
    );
  }
}

export default App;
