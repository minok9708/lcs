import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./LogIn.css";

class LogIn extends React.Component {
  state = {
    id: "",
    pw: "",
  };

  handleIdChange = (e) => {
    /* id 핸들 */
    this.setState({
      id: e.target.value,
    });
  };

  handlePwChange = (f) => {
    /* 비밀번호 핸들 */
    this.setState({
      pw: f.target.Value,
    });
  };

  handleSubmit = (e) => {
    //페이지 리로딩 방지
    e.preventDefault();
    //상태값을 oncreate를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    //상태 초기화
    this.setState({
      id: "",
      pw: "",
    });
  };

  render() {
    return (
      <div id="content">
        <form>
          <div id="id">
            <input
              type="text"
              id="id"
              placeholder="아이디를 입력하세요."
              value={this.state.id}
              onChange={this.handleIdChange}
            ></input>
          </div>
          <div>{console.log(this.state.id)}</div>

          <div id="pw">
            <input
              type="password"
              id="pw"
              placeholder="비밀번호를 입력하세요."
              Value={this.state.pw}
              onChange={this.handlePwChange}
            />
          </div>
          <div>{console.log(this.state.pw)}</div>

          <div id="middle">
            <button id="login" onSubmit={this.handleSubmit}>
              로그인
            </button>
          </div>
          {/*console.log("아이디:", this.state.id, "비밀번호:", this.state.pw)*/}
          <hr style={{marginBottom: "2%", width: "26%"}} />
          <div id="Btn">
            <input type="submit" id="idSearchBtn" Value="아이디 찾기" />

            <input type="submit" id="pwSearchBtn" Value="비밀번호 찾기" />

              <input type="submit" id="signUpBtn" Value="회원가입" />
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
