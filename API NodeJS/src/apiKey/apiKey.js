const Firestore = require('@google-cloud/firestore');
const {Storage} = require('@google-cloud/storage');

/*
const db = new Firestore({
  projectId: 'your project ID' ,
  keyFilename: './src/apiKey/database.json',
});
*/

const storage = new Storage({keyFilename: './src/apiKey/database.json'});


// const nearbyKey = 'your nearbySearch API key';


module.exports = {nearbyKey, db, storage};