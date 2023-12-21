const {db} = require('../apiKey/apiKey');

const newsById = async (request, h) => {  
  try {
    const {id} = request.params;    

    const news = db.collection('news').doc(id);
    const doc = await news.get();
    if (!doc.exists) {
      const response = h.response({
        error:true,
        message: `news with ${id} not found`,
      })
      return response;
    } 
    const data = {
      id: doc.id,
      description : doc.data().description,
      link_url :doc.data().link_url,
      photo_url :doc.data().photo_url,
      title :doc.data().title,
      type : doc.data().type,
    };

    const response = h.response(data)
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

const allNews = async (request, h) => {
  try{    
    const type = request.query.type;
    const news = db.collection('news');
    
    let snapshot;
    if(type){
      snapshot = await news
      .where('type', 'array-contains', type).get();
    }else{
      snapshot = await news.get();
    }
    
    const data = [];
    snapshot.forEach(doc => {
      const temp = {
        id : doc.id,
        description : doc.data().description,
        link_url :doc.data().link_url,
        photo_url :doc.data().photo_url,
        title :doc.data().title,
        type : doc.data().type,
      };
      data.push(temp);
    });

    const response = h.response({
      error: false,
      message: `All news retrieved`,
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
    newsById,
    allNews,
  };
  