import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import './GoogleMap.scss';

import MapStyle from '../../utils/MapStyle';
import Marker from '../Marker/Marker';
import InfoWindow from '../InfoWindow/InfoWindow';

export default class GoogleMap extends Component {
  state = {
    map: {},
    isSrcOnDOM: false,
    infoWindow: {}
  };

  static proptypes = {
    filteredLocations: PropTypes.array.isRequired,
    gotError: PropTypes.func.isRequired
  };

  // Create new map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -22.9485526, lng: -43.2081308 },
      zoom: 12.5,
      styles: MapStyle
    });
    this.setState({
      map: map,
      isSrcOnDOM: true,
      infoWindow: new window.google.maps.InfoWindow()
    });
  };

  // Put script on the DOM with the google maps api as src and start map
  componentDidMount() {
    // If google maps doesnt exists, create script tag and load api
    if (!window.google) {
      // Create script tag
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.defer = true;
      script.async = true;

      // Add script src
      const API_KEY = process.env.REACT_APP_MAPS_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

      // Get first script tag from DOM and add the new script
      const DOMscript = document.getElementsByTagName('script')[0];
      DOMscript.insertAdjacentElement('beforebegin', script);

      // If there's a error on script
      script.onerror = () => {
        this.props.gotError();
      };

      // If there's a error on google map
      window.gm_authFailure = () => {
        this.props.gotError();
      };

      // When added, start map
      script.addEventListener('load', () => {
        this.initMap();
      });
    } else {
      this.initMap();
    }
  }

  // Info Window is a global object and is unique
  // it will switch between markers
  createInfoWindow = (marker, location) => {
    let component, content, infoWindow;

    infoWindow = this.state.infoWindow;
    component = <InfoWindow tabIndex="1" location={location} />;
    content = renderToString(component);

    // Center map on marker
    this.state.map.setCenter(marker.getPosition());

    if (infoWindow.marker !== marker) {
      // Set infowindow to this marker
      infoWindow.marker = marker;

      // Set content and open info window
      infoWindow.setContent(content);
      infoWindow.open(this.state.map, marker);

      // Close info window when clicking on the X
      infoWindow.addListener('closeclick', () => {
        infoWindow.close();
      });
    }
  };

  render() {
    return (
      <div aria-label="location" role="application" id="map">
        {this.state.isSrcOnDOM &&
          this.props.filteredLocations.map(location => (
            <Marker
              key={location.alias}
              location={location}
              map={this.state.map}
              createInfoWindow={this.createInfoWindow}
            />
          ))}
      </div>
    );
  }
}
