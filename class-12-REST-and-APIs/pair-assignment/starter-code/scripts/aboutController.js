(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // $('#about').show().siblings().hide(); //We're performing this code twice? Once here and once in repoView.

    // DONE: Call a function to load all the data.
    // Pass a view function as a callback, so the view will render after the data is loaded.
    repos.requestRepos(repoView.index);

  };

  module.aboutController = aboutController;
})(window);
