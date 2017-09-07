import { getConfig } from 'core/config';
import fetch from 'client/helpers/ajax';

const config = getConfig();
export const updateLocation = (data, id) => fetch({
  url: `${config.root}${config.urls.apiBusiness}/${id}`,
  method: 'PUT',
  body: { ...data },
});

export const saveLocation = location => fetch({
  url: `${config.root}${config.urls.apiBusiness}`,
  method: 'post',
  body: location,
});

export const getLocation = id => fetch({
  url: `${config.root}${config.urls.business}/${id}`,
  method: 'get',
});

export const deleteLocation = id => fetch({
  url: `${config.root}${config.urls.apiBusiness}/${id}`,
  method: 'delete',
});

export const getAllLocations = () => fetch({
  url: `${config.root}${config.urls.allLocations}`,
  method: 'get',
});
