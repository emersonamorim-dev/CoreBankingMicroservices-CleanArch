function cacheMiddleware(req, res, next) {
    // Lógica do middleware, como cache ou autenticação
    console.log('Cache middleware executado');
    next();  // Continua para a próxima função/middleware
  }
  
  module.exports = {
    cacheMiddleware
  };
  