(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  // These functions are being created, but not called. These functions are called in routes.js by using the page() functions, enabling on click handlers.

  articlesController.index = function(ctx, next) { /***************************************************************/
    articleView.index(ctx.articles);              /* Create the method which runs the articleView.index on the   */
  };                                             /*  arbirary 'articles' key of ctx.                            */
                                                /***************************************************************/

  // DONE: Middleware for grabbing one article by ID:
  articlesController.loadById = function(ctx, next) { /*********************************************************/
    var articleData = function(article) {            /* The method named loadById creates a function named,   */
      ctx.articles = article;                       /* articleData, which uses a parameter named 'article'   */
      next();                                      /* When articleData is called, assign the arbitary var   */
    };                                            /* articles equal to the parameter passed. Then run the  */
                                                 /* function that is next in line in the page() call.     */
                                                /*********************************************************/
    Article.findWhere('id', ctx.params.id, articleData); // Run a SQL query to find all ids equal to the id of the //
  };                                                    // context. Then pass that to the articleData() function  //

  // DONE: Middleware for loading up articles by a certain author:
  articlesController.loadByAuthor = function(ctx, next) { // Exact same comment as above... 1) Create the method "loadByAuthor"
    var authorData = function(articlesByAuthor) { // 2) Create but do not call this function "authorData" with one parameter of "articlesByAuthor"
      ctx.articles = articlesByAuthor; // 3) Set the arbitary "articles" key in history api to the data recieved.
      next(); // 4) Run the next function in line (as identified in the page() function called).
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData); // 5) SQL Query to grab data and pass it as a parameter to authorData().
  };

  // DONE: Middleware for grabbing all articles with a certain category:
  articlesController.loadByCategory = function(ctx, next) { /*********************************************/
    var categoryData = function(articlesInCategory) {      /*    ,---.    ,-.     ,-. ,-.   ,-----.     */
      ctx.articles = articlesInCategory;                  /*     \___    |   |    |  |  |   |_____     */
      next();                                            /*          |   |---|    |  |  |   |         */
    };                                                  /*       ----`   |   |    |  |  |   `-----   */
                                                       /*********************************************/

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE: Middleware for grabbing ALL articles:
  articlesController.loadAll = function(ctx, next) { // Like before, we are creating a new method named loadAll.
    var articleData = function(allArticles) { // We are creating a function named articleData
      ctx.articles = Article.all;  // We're assigning the array of Articles.all to the arbitary variable 'ctx.articles'
      next(); //Run the next function in line as definited from the page() function.
    };

    if (Article.all.length) {              /********************************************************************/
      ctx.articles = Article.all;          /* Here we check if Article.all has length. If it does, then we can */
      next();                              /* just run a similar function as above. But if it does not, then   */
    } else {                               /* we need to go grab all the data with the fetchAll method.        */
      Article.fetchAll(articleData);       /********************************************************************/
    }
  };


  module.articlesController = articlesController;
})(window);
