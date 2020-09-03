import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./LogIn.css";

class LogIn extends React.Component {
  state = {
    id: "",
    pw: "",
  };

  /* input value 변경 ==> onChange */
  appChange = (e) => {
    /* id 핸들 */
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /* 로그인 버튼 클릭 ==> onClick */
  appClick = () => {
    console.log("아이디:" + this.state.id + "비밀번호:" + this.state.pw);
  };

  /* 엔터키로 사용했을 때 */
  appKeyPress = (e) => {
    if (e.key === "Enter") {
      this.appClick();
    }
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
    const {id, pw} = this.state;
    let {appClick, appKeyPress} = this;

    return (
      <div id="content">
        <form
          id="login"
         /*  action="http://cafeaddy.xyz:8080/api/name" */
          method="POST"
        >
          <div id="id">
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력하세요."
              value={id}
              onChange={this.appChange}
            />
          </div>

          <div id="pw">
            <input
              type="password"
              name="pw"
              placeholder="비밀번호를 입력하세요."
              Value={pw}
              onChange={this.appChange}
              onKeyPress={appKeyPress}
            />
          </div>

          <div id="middle">
            <button
              id="login"
              /*  onSubmit={this.handleSubmit}  */ onClick={appClick}
            >
              로그인
            </button>
          </div>

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
