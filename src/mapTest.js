import React from "react"; // 패키지 불러오기
import Map from "./Map/Map.js"

class mapTest extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bounds: Map.handleBoundsChange(bounds),
    }
  }
  render() {
    return(
      <div>
        <Map>
          {this.bounds}
        </Map>
      </div>
    )

  }
}

export default mapTest;
