# Rio de Janeiro Places

This is a single page app that get places from Rio de Janeiro using the Yelp API and display them on a Google Map. You can search for places by clicking on the menu on header, wich opens a aside with text input and the list of all places. This site is acessible and works offline.

## How to run

This project was made using react-create-app, so there is no secret. Just run using `npm start` or `yarn start` to run on `http://localhost:3000/`.

## Testing offline
The service worker is from the create-react-app and it only works in production mode, so you must
use `yarn build` or `npm run build`.

## Dependencies

- [React](https://reactjs.org/)
- [Google Maps Javascript API](https://cloud.google.com/maps-platform/?hl=pt-BR)
- [Yelp API](https://www.yelp.com/developers/documentation/v3)
