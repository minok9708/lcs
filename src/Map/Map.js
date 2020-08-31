import React, {Fragment} from "react";
import {NaverMap, Marker, Rectangle} from "react-naver-maps"; // 패키지 불러오기
import "./Map.css";
import {markerdata} from "../markerdata.js";

const Rect = (props) => (
  <Rectangle
    strokeOpacity={0}
    strokeWeight={0}
    fillOpacity={0.2}
    fillColor={"#f00"}
    {...props}
  />
);

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
      /*  zoom: 10, */
      mapTypeId: "normal",
      zoomControlOptions: {
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      },
      scaleControl: true,
      draggable: true,
      scrollWheel: true,
      bounds: null,
      rect: null,
    };

    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
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

  changeBounds(bounds) {
    this.setState({bounds});

    /* console.log(bounds) */

    if (this.rectTimeout) clearTimeout(this.rectTimeout);
    this.rectTimeout = setTimeout(() => {
      this.setState({rect: <Rect bounds={this.state.bounds} />});
    });
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds);
    console.log(bounds._min);
  }

  componentDidMount() {
    const navermaps = window.naver.maps;

    this.changeBounds(this.mapRef.getBounds());

    if (navigator.geolocation) {
      alert("Geolocation API 사용 가능");

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

          let bounds = new navermaps.LatLngBounds();

          console.log(bounds);
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
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  render() {
    return (
      <Fragment>
        <NaverMap
          naverRef={(ref) => {
            this.mapRef = ref;
          }}
          id="map"
          style={{width: "100%", height: "100vh"}}
          onClick={this.handleClick}
          center={{
            lat: this.state.currentLat,
            lng: this.state.currentLng,
          }} // 지도 초기 위치
          bounds={this.state.bounds}
          onBoundsChanged={
            this.handleBoundsChanged
          } /* 지도가 움직이는걸 느낄 때 */
        >
          {this.state.rect} {/* bound 사각형 생성 */}
          {/* {console.log(this.state.rect)} */}
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
          {/* 마커 리스트 가지고 동적으로 반복하여 생성  */}
          {markerdata.map((marker, index) => {
            return (
              <Marker
                name={marker.name}
                key={index}
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
                title={marker.name}
                animation={0}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red.png",
                }}
                // http://maps.google.com/mapfiles/ms/icons/red.png
                onClick={() => {
                  alert(`여기는 ${marker.name}입니다.`);
                }}
              />
            );
          })}
        </NaverMap>
      </Fragment>
    );
  }
}

export default Map;
