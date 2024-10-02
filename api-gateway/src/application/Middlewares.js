function cacheMiddleware(req, res, next) {
    // middleware como cache ou autenticação
    console.log('Cache middleware executado');
    next();  ]
  }
  
  module.exports = {
    cacheMiddleware
  };
  
