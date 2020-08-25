import React, { Fragment } from "react";
import { NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기
import "./Map.css";
import { _possibleConstructorReturn } from "react-naver-maps/dist/hocs-018c38ad";

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state={
    lat:0,
    lng:0,
  }
}

  render() {
    return (
      <Fragment>
        {getLocation()}
        {NaverMapAPI()}
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
      map={navermaps}
      input_latlng={getLocation.LatLng}
      zoom={2}
      defaultCenter={{ lat: /* getLocation.lat */37.554722, lng: /* getLocation.lng */126.970833}} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
      zoomControl={true}
      scaleControl={true}
      draggable={true}
      scrollWheel={true}
      scaleControl={false}
      logoControl={false}
      mapDataControl={false}
      zoomControl={true}
      minZoom={6}
    >
      <Marker
        id="marker1"
        key={Marker.id}
        position={new navermaps.LatLng(37.554722, 126.970833)}
        animation={0} /* 마커 애니메이션설정 */
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

      <Marker
        id="marker4"
        key={Marker.id}
        position={new navermaps.LatLng(37.6505726, 127.05075719999999)}
        animation={0} /* 마커 애니메이션설정 (0.1.2)*/
        onClick={() => {
          alert("영수오빠네입니다");
        }}
      ></Marker>

      <Marker
        id="marker5"
        key={Marker.id}
        position={new navermaps.LatLng(37.5874336, 127.07221989999998)}
        animation={0} /* 마커 애니메이션설정 (0.1.2)*/
        onClick={() => {
          alert("민옥이네입니다.");
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
function getLocation(LatLng) {
  const navermaps = window.naver.maps;
  if (navigator.geolocation) {
    // GPS를 지원하는 경f우
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude,
          lng = position.coords.longitude;
          const LatLng ={lat,lng};

        /* let locPosition = new navermaps.LatLng(lat,lng); */
        console.log(LatLng);

        NaverMapAPI(<NaverMap defaultCenter={LatLng}/>)
        
        /* displayMarker(locPosition);
        console.log(locPosition); */
        
        alert(lat + " " + lng);
      
        return LatLng.lat + LatLng.lng
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
/* 
function displayMarker(locPosition,message){
  const navermaps = window.naver.maps;

  //마커 생성
  let marker =new navermaps.Marker({
    map:navermaps,
    position:locPosition
  });
  
  let iwContent= message,
  iwRemoveable= true;
  
  var infowindow =new navermaps.infowindow({
    content:iwContent,
    removable:iwRemoveable
  });
  
infowindow.open(navermaps,marker);

  NaverMap.defaultCenter(locPosition); 
}
 */

export default Map;