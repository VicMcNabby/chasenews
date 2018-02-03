(function() {
  angular
    .module('chasenews')
    .controller('LandingPageController', LandingPageController)

  function LandingPageController($http) {
    const vm = this
    const categoryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=97793d5202374fb4a27b059b27194ecd'
    const newspaperURL = 'https://newsapi.org/v2/everything?apiKey=97793d5202374fb4a27b059b27194ecd'
    vm.beforeSearch = true;
    vm.loading = false;
    vm.categoryMenu = true;
    vm.newspaperButton = true;
    vm.newspaperClicked = false;
    vm.backToTop = false;

    $(`.menu`).on('click', function() {
      $(`.menu`).removeClass('active');
      $(this).addClass('active');
    });

    $(`#btn`).on('click', function() {
      $(`.menu`).removeClass('active');
      $(`.menu2`).removeClass('active2');
    });

    $(`.menu2`).on('click', function() {
      $(`.menu2`).removeClass('active2');
      $(this).addClass('active2');
    });


    vm.getCategory = function(value) {

      vm.beforeSearch = false;
      vm.loading = true;
      vm.backToTop = false;
      let category = value
      vm.searchHeader = ''

      $http.get(`${categoryURL}&category=${category}`)
        .then(results => {
          console.log(results);

          if (value == 'sports') {
            vm.searchHeader = 'Sports'
          } else if (value == 'technology') {
            vm.searchHeader = 'Technology'
          } else if (value == 'entertainment') {
            vm.searchHeader = 'Entertainment'
          } else if (value == 'business') {
            vm.searchHeader = 'Business'
          } else if (value == 'science') {
            vm.searchHeader = 'Science'
          } else if (value == 'general') {
            vm.searchHeader = 'General'
          } else if (value == 'health') {
            vm.searchHeader = 'Health'
          }

          vm.loading = false;
          vm.backToTop = true;
          vm.news = results.data.articles
          let news = vm.news
          let theDate = results.data.articles.description

          news.map(article => {
            if (!article.urlToImage) {
              article.urlToImage = 'images/ChaseNews.png'
            } else {
              article.urlToImage = article.urlToImage
            }
          })

          news.map(article => {

            let theDate = article.publishedAt

            function dateConvert() {
              date = new Date(theDate);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              dt = date.getDate();

              if (dt < 10) {
                dt = '0' + dt;
              }
              if (month < 10) {
                month = '0' + month;
              }
              return month + '/' + dt + '/' + year
            }
            vm.standardDate = dateConvert()
          })
        })
      vm.news = []
    }


    vm.getNewspaper = function(value) {

      vm.beforeSearch = false;
      vm.loading = true
      vm.backToTop = false;
      let newspaper = value

      if (value == 'cnn.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1280px-CNN.svg.png'
      } else if (value == 'huffingtonpost.com') {
        vm.newspaperHeader = 'http://www.brandchannel.com/wp-content/uploads/2017/05/huffpost-new-logo-2017.jpg'
      } else if (value == 'msnbc.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/MSNBC_2008_logo.svg/2000px-MSNBC_2008_logo.svg.png'
      } else if (value == 'independent.co.uk') {
        vm.newspaperHeader = 'https://static.independent.co.uk/static-assets/brand-logo.png'
      } else if (value == 'cbsnews.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/CBS_News.svg/1280px-CBS_News.svg.png'
      } else if (value == 'npr.org') {
        vm.newspaperHeader = 'https://www.npr.org/about/images/press/Logos/NPRLogo_RGB.png'
      } else if (value == 'economist.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/TheEconomistLogo.svg/2000px-TheEconomistLogo.svg.png'
      } else if (value == 'usatoday.com') {
        vm.newspaperHeader = 'http://1000logos.net/wp-content/uploads/2017/07/Color-USA-Today-Logo.jpg'
      } else if (value == 'newsweek.com') {
        vm.newspaperHeader = 'https://i1.wp.com/www.divorcelawyersformen.com/wp-content/uploads/2017/03/newsweek.png?ssl=1'
      } else if (value == 'nbcnews.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/NBC_News_2011.svg/1200px-NBC_News_2011.svg.png'
      }

      vm.newspaperClicked = true;

      $http.get(`${newspaperURL}&domains=${newspaper}`)
        .then(results => {
          console.log(results);
          vm.loading = false
          vm.backToTop = true;
          vm.news = results.data.articles
          let news = vm.news
          let theDate = results.data.articles.description

          news.map(article => {
            if (!article.urlToImage) {
              article.urlToImage = 'images/ChaseNews.png'
            } else {
              article.urlToImage = article.urlToImage
            }
          })

          news.map(article => {

            let theDate = article.publishedAt

            function dateConvert() {
              date = new Date(theDate);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              dt = date.getDate();

              if (dt < 10) {
                dt = '0' + dt;
              }
              if (month < 10) {
                month = '0' + month;
              }
              return month + '/' + dt + '/' + year
            }
            vm.standardDate = dateConvert()
          })
        })

      vm.news = []
    }

    vm.showNewspapers = function() {
      vm.categoriesButton = true;
      vm.newspaperMenu = true;
      vm.newspaperButton = false;
      vm.categoryMenu = false;
      vm.news = '';
      vm.searchHeader = '';
      vm.newspaperHeader = '';
      vm.beforeSearch = true;
      vm.hideCategoryMenuButton = true;
      vm.backToTop = false;
    }

    vm.showCategories = function() {
      vm.newspaperButton = true;
      vm.categoryMenu = true;
      vm.categoriesButton = false;
      vm.newspaperMenu = false;
      vm.news = '';
      vm.searchHeader = '';
      vm.newspaperHeader = '';
      vm.newspaperClicked = false;
      vm.beforeSearch = true;
      vm.hideCategoryMenuButton = false;
      vm.backToTop = false;
    }

  }
}());
