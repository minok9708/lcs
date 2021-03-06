import React, {Fragment} from "react";
import {NaverMap, Marker} from "react-naver-maps"; // 패키지 불러오기
import "./Map.css";
/* import "../Components/App.css"; */
import axios from "axios";
import Search from "../Components/Search.js";

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
        position: navermaps.Position.TOP_RIGHT,
        style: navermaps.ZoomControlStyle.BUTTON,
      },
      scaleControl: true,
      draggable: true,
      scrollWheel: true,
      bounds: null,
      rect: null,
      swLatitude: "",
      swLongitude: "",
      neLatitude: "",
      neLongitude: "",
      cafeData: [],
    };

    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }

  // 컴포넌트가 DOM 위에 만들어지기 전에 실행됨
  componentWillMount() {
    console.log("componentWillMount");
    // this.loadItem(); // loadItem 호출
  }

  handleToZoomLevelOne = (e) => {
    this.setState({
      zoom: 10,
    });
  };

  changeBounds(bounds) {
    this.setState({bounds});

    // 현재 영역정보의 남서쪽 정보를 얻어옴
    let swLatlng = bounds.getSW();

    // 현재 영역정보의 북동쪽 정보를 얻어옴
    let neLatlng = bounds.getNE();

    // 요기 if 문안에 통신 코드 작성하게 되면 지정한 초만큼 기다렸다가 통신
    if (this.rectTimeout) clearTimeout(this.rectTimeout);
    this.rectTimeout = setTimeout(() => {
      console.log(bounds.getSW());
      console.log(bounds.getNE());

      this.setState({
        swLatitude: swLatlng._lat,
        swLongitude: swLatlng._lng,
        neLatitude: neLatlng._lat,
        neLongitude: neLatlng._lng,
      });

      // /* 화면 좌표 서버로 전송 */
      let mapUrl = "https://cafeaddy.xyz:8080/api/cafes/around";
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        url: mapUrl,
        data: {},
        params: {
          neLongitude: this.state.neLongitude,
          neLatitude: this.state.neLatitude,
          swLongitude: this.state.swLongitude,
          swLatitude: this.state.swLatitude,
        },
      })
        .then(({data}) => {
          this.setState({
            cafeData: data.data,
          });
        })
        .catch((error) => {
          console.log("error:", error.response);
        });

      // axios
      //   .get('http://cafeaddy.xyz:8080/api/cafes/around', {
      //     params : {
      //       test
      //     }
      //   })
      //   .then(({data}) => {
      //     this.setState({
      //       cafeData: data.data,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("error:", error.response);
      //   });
    }, 500);
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds);
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다.
  // 이 안에서 다른 JavaScript 프레임워크를 연동하거나,
  // setTimeout, setInterval 및 AJAX 처리 등을 넣습니다
  componentDidMount() {
    const navermaps = window.naver.maps;

    /* 맵 생성시 초기 bounds 알기위해 레퍼런스에 직접 접근하기 위함 */
    this.changeBounds(this.mapRef.getBounds());

    /* GPS 사용 가능 */
    if (navigator.geolocation) {
      /*  alert("Geolocation API 사용 가능"); */

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          console.log(position);

          let lat = position.coords.latitude,
            lng = position.coords.longitude;

          let locPosition = new navermaps.LatLng(lat, lng);

          /* 화면 좌표 서버로 전송 */
          /* this.mapRef. */
          /* let mapUrl = "http://cafeaddy.xyz:8080/api/cafes/around";
          axios({
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            url: mapUrl,
            data: {},
            params: {
              neLongitude: this.mapRef.getBounds().getNE()._lng,
              neLatitude: this.mapRef.getBounds().getNE()._lat,
              swLongitude: this.mapRef.getBounds().getSW()._lng,
              swLatitude: this.mapRef.getBounds().getSW()._lat,
            },
          })
            .then(({data}) => {
              this.setState({
                cafeData: data.data,
              });
              alert("성공");
            })
            .catch((error) => {
              console.log("error:", error.response);
            }); */

          /* 현재 위치에 대한 정보를 setState를 통해서 state에 저장 */
          this.setState({
            currentLat: lat,
            currentLng: lng,
            currentLatLng: locPosition,
            loding: false,
          });

          // 현재위치를 찾은 후 그 위치로 화면 전환
          this.mapRef.panTo(
            new navermaps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
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
      // 현재 위치 권한 얻어오기 불가할때
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  render() {
    const {currentLat, currentLng} = this.state;
    const {cafeData} = this.state;

    return (
      <Fragment>
        <NaverMap
          naverRef={(ref) => {
            this.mapRef = ref;
          }}
          id="navermap"
          style={{width: "100%", height: "100vh"}}
          onClick={this.handleClick} // 맵 클릭했을때 이벤트
          bounds={this.state.bounds}
          onBoundsChanged={
            this.handleBoundsChanged /* 지도가 움직이는걸 느낄 때 */
          }
          defaultCenter={{
            lat: 37.5666805, // 현재위치 Lat
            lng: 126.9784147, // 현재위치 Lng
          }}
        >
          <Search />

          {/* bound 사각형 생성 */}
          {this.state.rect}

          <Marker
            id="map"
            position={{
              lat: currentLat,
              lng: currentLng,
            }}
            onClick={() => {
              alert(
                `여기는 ${this.state.currentLat} : ${this.state.currentLng} 입니다.`
              );
            }}
          ></Marker>

          {/* 마커 리스트 가지고 동적으로 반복하여 생성  */}
          {cafeData.map((marker, index) => {
            return (
              <Marker
                name={marker.name}
                key={index}
                position={{
                  lat: marker.latitude,
                  lng: marker.longitude,
                }}
                title={marker.name}
                animation={0}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red.png",
                }}
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
