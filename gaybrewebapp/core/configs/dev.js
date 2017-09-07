export const configDev = {
  root: 'http://www.koder4hire.com:3000',
  domains: {
    cookie: 'localhost',
  },
  urls: {
    signin: '/prologin',
    signup: '/proregister',
    business: '/probusiness',
    resetPassword: '/forgotpassword',
    changePassword: '/api/prouser/password',
    logout: '/prologout',
    apiBusiness: '/api/probusiness',
    updateProfile: '',
    updateStripeToken: '/api/prouser/stripe',
    allLocations: '/api/probusiness/all',
    uploadPhotos: '/api/cloudinary',
  },
};
