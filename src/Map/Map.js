import React, {Fragment} from "react";
import {NaverMap, Marker} from "react-naver-maps"; // 패키지 불러오기
import "./Map.css";

class Map extends React.Component {
  constructor(props) {
    super(props);
    const navermaps = window.naver.maps;

    this.state = {
      map: navermaps,
      input_latlng: "",
      currentLat: "",
      currentLng: "",
      currentLatLng: "",
      zoomControl: true,
      zoom: 2,
      mapTypeId: "normal",
      zoomControlOptions: {
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      },
      scaleControl: true,
      draggable: true,
      scrollWheel: true,
      bounds: null,
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

  componentDidMount() {
    const navermaps = window.naver.maps;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        console.log(position);

        let lat = position.coords.latitude,
          lng = position.coords.longitude;

        let locPosition = new navermaps.LatLng(lat, lng);

        this.setState({
          currentLat: lat,
          currentLng: lng,
          currentLatLng: locPosition,
        });
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        //옵션
        enableHighAccuracy: true, //베터리를 소모해서 더 정확한 위치를 찾음
        maximumAge: 0, //한번찾은 위치정보를 해당 초만큼 캐싱
        timeout: Infinity, //주어진 초에 찾지못하면 에러발생
      }
    );
  }

  render() {
    return (
      <Fragment>
        <NaverMap
          id="map"
          style={{width: "100%", height: "100vh"}}
          onClick={this.handleClick}
          center={{
            lat: this.state.currentLat,
            lng: this.state.currentLng,
          }} // 지도 초기 위치
          bounds={this.state.bounds}
        >
          <Marker
            id="map"
            position={{
              lat: this.state.currentLat,
              lng: this.state.currentLng,
            }}
            onClick={() => {
              alert(
                `여기는 ${this.state.currentLat} : ${this.state.currentLng} 입니다.`
              );
            }}
          ></Marker>
          
        </NaverMap>
      </Fragment>
    );
  }
}

export default Map;
