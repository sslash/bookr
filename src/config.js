require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  app: {
    title: 'Tromsøbygget booking',
    description: 'Bookingsystem.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Booking system',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Booking system',
        'og:description': 'Booking system.'
      }
    }
  }
}, environment);
