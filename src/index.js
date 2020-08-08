import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Map from "./Map/Map";
import LogIn from "./LogIn/LogIn";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {RenderAfterNavermapsLoaded} from "react-naver-maps";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <RenderAfterNavermapsLoaded ncpClientId="p8lftt0b2s">
        <React.StrictMode>
          <Route exact path="/" component={App}></Route>
          <Route path="/map" component={Map}></Route>
          <Route path="/login" component={LogIn}></Route>
        </React.StrictMode>
      </RenderAfterNavermapsLoaded>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
