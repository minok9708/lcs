import React, {Component, Fragment} from "react";
import {NaverMap, Marker} from "react-naver-maps"; // 패키지 불러오기
import Search from "../Components/Search";
import "./Map.css";

class Map extends React.Component {
  // map = new naver.maps.Map('mapDiv', {option});
  constructor(props) {
    super(props);
    const navermaps = window.naver.maps;

    this.state = {
      map: navermaps,
      input_latlng: "",
      zoomControl: true,
      zoom: 2,
      mapTypeId: "normal",
      center: navermaps.LatLng(36.480058, 127.289039), // 126.9861108, 37.4983439

      zoomControlOptions: {
        center: new navermaps.LatLng(36.480058, 127.289039), //36.4203004, 128.317960
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      },

      scaleControl: true,
      draggable: true,
      scrollWheel: true,
    };
  }
  handleClick = (e) => {
    console.log("e.coord >>>", e.coord);
    this.setState({
      input_latlng: e.coord + "",
    });
  };

  handleToZoomLevelOne = (e) => {
    this.setState({
      zoom: 10,
    });
  };

  render() {
    return (
      <Fragment>
        {getLocation()}
        {NaverMapAPI()}
        <view>
          <div>{<Search onCreate={this.handleCreate} />}</div>
        </view>
      </Fragment>
    );
  }
}

function NaverMapAPI() {
  const navermaps = window.naver.maps;
  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100%", // 네이버지도 가로 길이
        height: "922px", // 네이버지도 세로 길이
      }}
      defaultCenter={{lat: 37.9036062 ,lng: 127.0385797}} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    >
      <Marker
        id="marker1"
        key={Marker.id}
        position={new navermaps.LatLng(37.554722, 126.970833)}
        animation={2} /* 마커 애니메이션설정 */
        onClick={() => {
          alert("여기는 N서울타워입니다.");
        }}
      ></Marker>
      <Marker
        id="marker2"
        key={Marker.id}
        position={new navermaps.LatLng(37.5939431, 127.075976)}
        animation={0} /* 마커 애니메이션설정 (0.1.2)*/
        onClick={() => {
          alert("여기는 중랑역입니다.");
        }}
      ></Marker>
      <Marker
        id="marker3"
        key={Marker.id}
        position={new navermaps.LatLng(37.9036062, 127.0385797)}
        animation={0} /* 마커 애니메이션설정 (0.1.2)*/
        onClick={() => {
          alert("신한대학교입니다.");
        }}
      ></Marker>
    </NaverMap>
  );
}

/* gPS권한 허용/차단 
getCurrentPosition:현재위치 정보 가져옴
latitude:위도
longitude:경도 
*/
function getLocation() {
  if (navigator.geolocation) {
    // GPS를 지원하는 경우
    navigator.geolocation.getCurrentPosition(
      function (position) {
        alert(position.coords.latitude + " " + position.coords.longitude);
        console.log(
          "위도: " +
            position.coords.latitude +
            " " +
            "경도: " +
            position.coords.longitude
        ); /* 알림으로 나타냄 */
      },
      function (error) {
        //위치값 찾기 에러났을때
        console.error(error);
      },
      {
        //옵션
        enableHighAccuracy: true, //베터리를 소모해서 더 정확한 위치를 찾음
        maximumAge: 0, //한번찾은 위치정보를 해당 초만큼 캐싱
        timeout: Infinity, //주어진 초에 찾지못하면 에러발생
      }
    );
  } else {
    //GPS를 지원하지 않는 경우
    alert("GPS를 지원하지 않습니다");
  }
}

export default Map;
