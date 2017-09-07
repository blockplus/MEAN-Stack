import React, { PropTypes, Component } from 'react/addons';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { default as update } from 'react-addons-update';
import style from './Map.scss';
import { default as shallowEqual } from 'fbjs/lib/shallowEqual';
import PlaceCard from '../Card'

const defaultCenter = {
  lat: 55.776164,
  lng: 37.626362,
};

function offsetCenter({ offsetx, offsety, map }) {
  try {
    const scale = Math.pow(2, map.getZoom());
    const worldCoordinateCenter = map.getProjection().fromLatLngToPoint(map.getCenter());
    const pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0);
    const worldCoordinateNewCenter = new google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
    );
    const newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
    return {
      lat: newCenter.lat(),
      lng: newCenter.lng(),
    };
  } catch (e) {
    console.error('Get get goole map');
  }
  return defaultCenter;
}
function coordinatesToLatLon(coordinates) {
  const [lng = defaultCenter.lng, lat = defaultCenter.lat] = coordinates;
  return {
    lng,
    lat,
  };
}
// const delay = (time) => new Promise(resolve => { setTimeout(resolve, time); });

export default class MainMapPage extends Component {
  static propTypes = {
    layout: PropTypes.string,
    center: PropTypes.object,
  }

  state = {
    markers: [],
    center: defaultCenter,
    startProps: undefined,
  }

  componentWillMount() {
    const { center: centerMap = {} } = this.props;
    const { coordinates = [] } = centerMap;
    const center = coordinatesToLatLon(coordinates);
    this.setState({ startProps: this.props,center, markers: [{position: center}] }) //eslint-disable-line
    this.updateCenter();
  }

  componentWillReceiveProps(nextProps) {
    const { center: centerMap = {} } = nextProps;
    const { coordinates = [] } = centerMap;
    const center = coordinatesToLatLon(coordinates);
    if (!shallowEqual(nextProps, this.state.startProps)) {
      this.setState({ startProps: nextProps, center, markers: [{ position: center }] });
      this.updateCenter();
    }
  }

  addMarker({ markers, event, index }) {
    return update(markers, {
      $push: [
        {
          position: event.latLng,
          index,
        },
      ],
    });
  }

  updateCenter() {
    setTimeout(() => {
      const centerMapNew = offsetCenter({ map: this._googleMapComponent, offsetx: 200 });
      if (centerMapNew) this.setState({ center: centerMapNew });
    }, 2000);
  }
  // async handleMapClick(event) {
  //   const { markers: prevMarkers } = this.state;
  //   const mapZoom = this._googleMapComponent.getZoom();
  //   if (prevMarkers.length >= 3) return;
  //   await delay(500);
  //   if (mapZoom === this._googleMapComponent.getZoom()) {
  //     const markers = this.addMarker({ markers: prevMarkers, event, index: prevMarkers.length });
  //     this.setState({
  //       center: event.latLng,
  //       markers,
  //     });
  //   }
  // }

  render() {
    const { markers, center } = this.state;
    const { lat, lng } = center;
    return (
      <div id="map" className={style.map}>
        <section style={{ height: '100%', position: 'relative' }}>
          <PlaceCard />
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{
                  height: '100%',
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={map => {this._googleMapComponent = map; }}
                defaultZoom={8}
                center={center}
                defaultCenter={{ lat, lng }}
              >
                  {markers.map(({ position, index }) =>
                    <Marker
                      position={position}
                      key={index}
                    />
                  )}
              </GoogleMap>
            }
          />
        </section>
      </div>
    );
  }
}



// import shouldPureComponentUpdate from 'react-pure-render/function';
//
// import MainMapLayout from './main_map_layout.jsx';
// import IceTable from 'components/controls/fixed_table_examples/ice_table.jsx';
// import MainMapBlock from './main_map_block.jsx';
//
// import { Connector } from 'redux/react';
// import { bindActionCreators } from 'redux';
//
// import * as allMapActions from 'actions/map_actions.js';

// slice actions to support map and table interfaces
// const mapActions = (({
//   changeBounds: onBoundsChange,
//   markerHoverIndexChange: onMarkerHover,
//   showBallon: onChildClick }) => ({
//     onBoundsChange,
//     onMarkerHover,
//     onChildClick,
//   }
// ))(allMapActions);
