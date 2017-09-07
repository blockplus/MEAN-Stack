import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from 'core/Location';
import Layout from 'client/components/Layout';
import store from 'client/store';
import { fetchAllLocations, storeFetchedPlaces } from 'client/actions/locations';
import cookie from 'cookie';
const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js
// eslint-disable-next-line

const route = async (path, callback) => {
  const handler = routes[path] || routes['/404'];
  const component = await handler();
  await callback(<Layout>{React.createElement(component)}</Layout>);
};
const delay = (time) => new Promise(resolve => { setTimeout(resolve, time); });


async function run() {
  const container = document.getElementById('app');
  const { user_token: token } = cookie.parse(document.cookie);
  const { pathname } = document.location;
  if (token) {
    let locations = [];
    try {
      locations = await Promise.race([
        await fetchAllLocations(),
        delay(2000).then(() => [])
      ]);
    } catch (e) {
      console.error('Can\'t fetch locations');
    }
    store.dispatch(storeFetchedPlaces(locations));
  }
  if (token && pathname === '/') {
    document.location = '/locations';
  }
  Location.listen(location => {
    route(location.pathname, async (component) => ReactDOM.render(component, container, () => {
      window.ga('send', 'pageview');
    }));
  });
}

if (canUseDOM) {
  // Run the application when both DOM is ready and page content is loaded
  if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, false);
  }
}

export default { route, routes };
