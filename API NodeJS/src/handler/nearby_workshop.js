const axios = require('axios');
const {nearbyKey} = require('../apiKey/apiKey');

const getPlacesNearbyHandler = async (request, h) => {
  try {
    const {
      latitude, longitude, radius, count
    } = request.payload;

    //const apiKey = 'AIzaSyD-sMEjpOpZuAiaj6Xs6ip0KgUU8FjIDTQ';

    const requestData = {
      includedTypes: 'car_repair',
      maxResultCount: count,
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude,
          },
          radius: radius,
        },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': nearbyKey,
      'X-Goog-FieldMask': 'places.displayName,places.location,places.id,places.rating,places.formattedAddress,places.nationalPhoneNumber',
    };

    const url = 'https://places.googleapis.com/v1/places:searchNearby';

    const responseReq = await axios.post(url, requestData, { headers });
    // console.log(typeof responseReq)

    const data = [];
    responseReq.data.places.forEach((place) => {
      const temp = {
        id: place.id,
        nationalPhoneNumber: place.nationalPhoneNumber,
        name: place.displayName.text,
        rating: place.rating,
          latitude: place.location.latitude,
          longitude: place.location.longitude,
        
        formattedAddress: place.formattedAddress,
      };
      data.push(temp);
      place.name = place.displayName.text;
      delete place.displayName;
    });

    const response = h.response({
      status: 'success',
      message: 'Bengkel berhasil ditemukan',
      result: data,
    });

    return response;
  } catch (error) {
    // console.error('Error:', error.message);

    const response = h.response({
      status: 'fail',
      message: error.message,
    });

    return response;
  }
};

module.exports = {
  getPlacesNearbyHandler,
};
