import React, { PropTypes } from 'react';
import GoogleAnalytics from '../GoogleAnalytics';
import { getConfig } from '../../../core/config';
const config = getConfig();
function Html({ title, description, body }) {
  return (
    <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{title || config.title}</title>
        <meta name="description" content={description || config.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="stylesheet" href="styles/bootstrap.css" />
        <link rel="stylesheet" href="styles/fonts.css" />
        <link rel="stylesheet" href="styles/style.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
        <script src={`/app.js?${new Date().getTime()}`} />
        <script src="https://checkout.stripe.com/checkout.js" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIPgYZ6EWpGdBoO9924wOBTopmkNEXH7k" async defer></script>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,
};

export default Html;
