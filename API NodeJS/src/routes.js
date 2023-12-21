const {
  getPlacesNearbyHandler,
} = require('./handler/nearby_workshop');

const {
  addUserData, getUserData, addDetailUserData, getDetailUserData
} = require('./handler/user');

const {
  allNews, newsById
} = require('./handler/news');

const routes = [
  {
    method: 'POST',
    path: '/nearby',
    handler: getPlacesNearbyHandler,
  },
  {
    method: 'POST',
    path: '/signup',
    handler: addUserData,
  },
  {
    method: 'POST',
    path: '/login',
    handler: getUserData,
  },
  {
    method: 'POST',
    path: '/detailuser', 
    handler: addDetailUserData,
    options: {
      payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data',
          multipart: true,
      },
    },
  },
  {
    method: 'GET',
    path: '/detailuser/{email}',
    handler: getDetailUserData,
  },
  {
    method: 'GET',
    path: '/news',
    handler: allNews,
  },
  {
    method: 'GET',
    path: '/news/{id}',
    handler: newsById,
  },
];

module.exports = routes;
