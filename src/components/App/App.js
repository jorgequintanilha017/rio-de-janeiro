import React, { Component, Fragment } from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';

import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Loading from '../Loading/Loading';

import './App.scss';

export default class App extends Component {
  state = {
    isLoading: true,
    hasError: false,
    allLocations: [],
    filteredLocations: [],
    isAsideOpen: false
  };

  toggleAside = () => {
    this.setState({
      isAsideOpen: !this.state.isAsideOpen
    });
  };

  getLocations = () => {
    let cors = 'https://cors-anywhere.herokuapp.com/';
    let api = 'https://api.yelp.com/v3/';
    let API_KEY = process.env.REACT_APP_YELP_KEY;

    return fetch(
      `${cors}${api}businesses/search?location=Rio+de+Janeiro&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    )
      .then(response => response.json())
      .then(results => {
        this.setState({
          isLoading: false,
          allLocations: results.businesses,
          filteredLocations: results.businesses
        });
      })
      .catch(error => {
        this.gotError();
      });
  };

  filterLocations = query => {
    let filteredLocations = this.state.allLocations.filter(location => {
      return location.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    this.setState({ filteredLocations: filteredLocations });
  };

  gotError = () => {
    this.setState({ hasError: true });
  };

  componentDidMount() {
    this.getLocations();
  }

  componentDidCatch = (error, info) => {
    this.gotError();
  };

  render() {
    const wrapperClass = this.state.isAsideOpen ? 'wrapper slide' : 'wrapper';
    return (
      <Fragment>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.hasError ||
          this.state.filteredLocations === undefined ? (
          <Loading error={true} />
        ) : (
          <Fragment>
            <Aside
              filterLocations={this.filterLocations}
              filteredLocations={this.state.filteredLocations}
              isAsideOpen={this.state.isAsideOpen}
            />
            <main className={wrapperClass}>
              <Header
                title={'Rio de Janeiro Places'}
                onClick={this.toggleAside}
              />
              <GoogleMap
                filteredLocations={this.state.filteredLocations}
                gotError={this.gotError}
              />
            </main>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
