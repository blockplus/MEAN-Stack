import { getConfig } from 'core/config';
import fetch from 'client/helpers/ajax';
const config = getConfig();

export const updateStripeToken = ({ stripetoken, paiddate, duedate }) =>
  fetch({
    url: `${config.root}${config.urls.updateStripeToken}`,
    method: 'PUT',
    body: {
      stripetoken,
      paiddate,
      duedate,
    },
  });
