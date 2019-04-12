import React from 'react';
import PropTypes from 'prop-types';
import './InfoWindow.scss';

// Some locations doesn't have elements like display phone or price
function checkIfHasElement(element, text) {
  if (element) {
    return (
      <p>
        <strong>{text}: </strong>
        {element}
      </p>
    );
  }
}

const InfoWindow = props => (
  <div className="info" tabIndex="0" id="info-window">
    <h3>{props.location.name}</h3>

    <figure className="info__img">
      <img src={props.location.image_url} alt={props.location.name} />
    </figure>

    <p>
      <strong>Address: </strong>
      {props.location.location.display_address.slice(0, 1)}
    </p>

    <p>
      <strong>Categories: </strong>
      {props.location.categories.map(category =>
        props.location.categories.length === 1 ||
        props.location.categories[props.location.categories.length - 1] ===
          category
          ? `${category.title}`
          : `${category.title}, `
      )}
    </p>

    {checkIfHasElement(props.location.display_phone, 'Phone')}

    {checkIfHasElement(props.location.price, 'Price')}

    <a
      href={props.location.url}
      aria-label="Click to see more information on Yelp"
    >
      <img
        className="info__yelp"
        alt="Yelp Logo"
        src="https://s3-media2.fl.yelpcdn.com/assets/srv0/styleguide/1ea40efd80f5/assets/img/brand_guidelines/yelp_fullcolor.png"
      />
    </a>
  </div>
);

InfoWindow.proptypes = {
  location: PropTypes.object.isRequired
};

export default InfoWindow;
