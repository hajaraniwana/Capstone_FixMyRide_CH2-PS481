const {db} = require('../apiKey/apiKey');

const bcrypt = require('bcrypt');
const {
  authenticateToken,
  generateToken
} = require('../authentication');

const addUserData = async (request, h) => {
  try {
    const {
      email, 
      username, 
      password,
    } = request.payload;

    const hashedPassword = await bcrypt.hash(password,10);
    const data = {
      username: username,
      password: hashedPassword,
    };
    await db.collection('users').doc(email).set(data);

    const response = h.response({
      error: false,
      message: 'User created',
    });    
    return response;

  } catch (error) {
    console.error('Error:', error.message);
    
    const response = h.response({
      error: true,
      message: error.message,
    });

    return response;    
  }
};

const getDetailUserData = async (request, h) => {
  try {
    const token = request.headers['authorization'];
    if(!authenticateToken(token)){
      const response = h.response({
        status: 'fail',
        message: 'token tidak valid',
      });
      return response;
    }

    const {email} = request.params;
    const docRef = db.collection('users').doc(email);
    const user = await docRef.get();

    if (user.empty) {
      const response = h.response({
        error: true,
        message: 'Email not found',
      });
      return response;
    }

    const data={
      email: user.id,
      name : user.data().username,      
      image_url:user.data().profile_image,
    };
    const response = h.response({
      error:false,
      message: 'email found',
      data : data,
    })
    return response;

  }   
  catch (error) {
    console.error('Error:', error.message);
    
    const response = h.response({
      error: true,
      message: error.message,
    });

    return response;    
  }
};

const addDetailUserData = async (request, h) => {
  try{
    const formData = request.payload;
    const token = request.headers['authorization'];
    if(authenticateToken(token)==false){
      const response = h.response({
        status: 'fail',
        message: 'token tidak valid',
      });
      return response;
    }

    const email = formData.email,
    image = formData.image;

    const docRef = db.collection('users').doc(email);
    const user = await docRef.get();

    // The ID of your GCS bucket
    const bucketName = 'fixmyride_profilepicture';     

    // The new ID for your GCS file
    const fileName = `${user.id}.png`;
    const encodedFileName = fileName.replace(/@/g, "");
    
    const url_image = `https://storage.googleapis.com/${bucketName}/${encodedFileName}`;

    //ada gambar baru
    if(image._data.length!=0){ 
      // The content to be uploaded in the GCS file
      const contents = formData.image._data;

      // Import Node.js stream
      const stream = require('stream');
      const {storage} = require('../apiKey/apiKey')
      
      // Get a reference to the bucket
      const myBucket = storage.bucket(bucketName);

      // Create a reference to a file object
      const file = myBucket.file(encodedFileName);

      // Create a pass through stream from a string
      const passthroughStream = new stream.PassThrough();
      passthroughStream.write(contents);
      passthroughStream.end();

      async function streamFileUpload() {
        passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
          // The file upload is complete
        });

        // console.log(`${destFileName} uploaded to ${bucketName}`);
      }

      streamFileUpload().catch(console.error);
    }
    
    
    await docRef.update({
      profile_image : url_image,
    });

    const response = h.response({
      error: false,
      message: 'data has been created',
      link : url_image,
    });
    return response;
  }
  catch (error){
    console.error('error',error.message);

    const response = h.response({
      error: true,
      message: error.message,
    });
    return response;
  }
};

const getUserData = async (request, h) => {
  try{
    const {
      email, 
      password,
    } = request.payload;
    
    const docRef = db.collection('users').doc(email);
    const user = await docRef.get();

    // email not found
    if (user.empty) {
      const response = h.response({
        error: true,
        message: 'Email not found',
      });  
      return response;
    }     

    // check password
    const isMatch = await bcrypt.compare(password,user.data().password);
    if (!isMatch){
      const response = h.response({
        error: true,
        message: `Wrong password`,
      });
      return response;
    } 

    // login success
    const access_token = generateToken(email);
    const data = {
      token : access_token,
      name : user.data().username,
      email : user.id,
    }
    
    const response = h.response({
      error: false,
      message: `login success`,
      data : data,
    });

    return response;
  }
  catch (error) {
    console.error('error:', error.message);

    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
}
  module.exports = {
    addUserData,
    getUserData,
    addDetailUserData,
    getDetailUserData,
  };
  