import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import './Aside.scss';

export default class Aside extends Component {
  static proptypes = {
    filterLocations: PropTypes.func.isRequired,
    filteredLocations: PropTypes.array.isRequired,
    isAsideOpen: PropTypes.bool.isRequired
  };

  focusInfoWindow = () => {
    let infoWindow = document.getElementById('info-window');
    infoWindow.focus();
  };

  render() {
    const asideClass = this.props.isAsideOpen ? 'aside visible' : 'aside';
    return (
      <aside className={asideClass}>
        <h1 className="aside-title">Search</h1>
        <div className="aside-input">
          <DebounceInput
            aria-label="Insert place name"
            debounceTimeout={300}
            placeholder="Insert place name"
            onChange={e => this.props.filterLocations(e.target.value)}
          />
        </div>
        <div className="aside-list" tabIndex="0">
          {this.props.filteredLocations.map(location => (
            <div
              tabIndex="1"
              id={location.id}
              key={location.alias}
              className="aside-location"
              aria-label={location.name}
              role="link"
              onClick={this.focusInfoWindow}
              onKeyPress={this.focusInfoWindow}
            >
              <p tabIndex="-1">{location.name}</p>
            </div>
          ))}
        </div>
      </aside>
    );
  }
}
