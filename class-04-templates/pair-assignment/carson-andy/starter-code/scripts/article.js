var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  // DONE: Use handlebars to render your articles.
  //       - Get your template from the DOM.
  var theTemplateScript = $("#address-template").html();
  var theTemplateFunction = Handlebars.compile(theTemplateScript);
  var dataSource = this;
  var theCompiledHtml = theTemplateFunction(dataSource);

  //       - Now "compile" your template with Handlebars.

  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced by key in the template.
  //   For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  console.log(theCompiledHtml);
  // DONE: Use the function that Handlebars gave you to return your filled-in html template for THIS article.
  //$('.content-placeholder').html(theCompiledHtml);
  //console.log($('.content-placeholder').html(theCompiledHtml));
  return theCompiledHtml;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('.content-placeholder').append(a.toHtml())
});
