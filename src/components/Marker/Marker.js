import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
  constructor(props) {
    super(props);
    this.createMarker = this.createMarker.bind(this);
    this.addMouseEvents = this.addMouseEvents.bind(this);
    this.markerColor = this.markerColor.bind(this);
    this.marker = {};
  }

  static proptypes = {
    location: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    createInfoWindow: PropTypes.func.isRequired
  };

  createMarker = () => {
    let location, position;

    location = this.props.location;

    position = {
      lat: location.coordinates.latitude,
      lng: location.coordinates.longitude
    };

    this.marker = new window.google.maps.Marker({
      map: this.props.map,
      position: position,
      title: location.name,
      icon: this.markerColor('default'),
      animation: window.google.maps.Animation.DROP,
      id: location.id
    });
  };

  // Change marker color when hovered
  addMouseEvents = () => {
    let events, markerSearchEl;

    // Events we will add
    events = ['mouseover', 'mouseout', 'click', 'keydown'];

    // Get the element from the search list
    markerSearchEl = document.getElementById(this.props.location.id);

    events.forEach(event => {
      let mouseFunc = () => {
        switch (event) {
          case 'mouseover':
            this.marker.setIcon(this.markerColor('light'));
            break;
          case 'mouseout':
            this.marker.setIcon(this.markerColor('default'));
            break;
          default:
            this.props.createInfoWindow(this.marker, this.props.location);
            break;
        }
      };

      markerSearchEl.addEventListener(event, mouseFunc);

      window.google.maps.event.addListener(this.marker, event, mouseFunc);
    });
  };

  // Used when marker is clicked, hovered(mouseover) or focused
  markerColor = markerColor => {
    let markerImage = new window.google.maps.MarkerImage(
      `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${
        markerColor === 'default' ? '576574' : 'e74c3c'
      }|40|_|%E2%80%A2`,
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21, 34)
    );
    return markerImage;
  };

  componentDidMount = () => {
    this.createMarker();
    this.addMouseEvents();
  };

  componentWillUnmount = () => {
    this.marker.setMap(null);
  };

  render() {
    return null;
  }
}
