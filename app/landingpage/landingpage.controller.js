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

      if (value == 'denverpost.com') {
        vm.newspaperHeader = 'https://denverphilharmonic.org/wp-content/uploads/2013/11/denver-post-logo-720x220.png'
      } else if (value == 'huffingtonpost.com') {
        vm.newspaperHeader = 'http://www.brandchannel.com/wp-content/uploads/2017/05/huffpost-new-logo-2017.jpg'
      } else if (value == 'philly.com') {
        vm.newspaperHeader = 'http://cdn.phillymag.com/wp-content/uploads/2015/07/inquirer-daily-news-philly-com-940x540.jpg'
      } else if (value == 'washingtonpost.com') {
        vm.newspaperHeader = 'http://www.delsol.com/blog/wp-content/uploads/2017/09/washington-post-logo.jpg'
      } else if (value == 'nytimes.com') {
        vm.newspaperHeader = 'https://25h9ni10fbba1euik72l6age-wpengine.netdna-ssl.com/wp-content/uploads/2010/08/new_york_times_logo_large-1600x600.jpg'
      } else if (value == 'wsj.com') {
        vm.newspaperHeader = 'https://unicefstories.files.wordpress.com/2012/11/wsj_logo3.jpeg'
      } else if (value == 'chicagotribune.com') {
        vm.newspaperHeader = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Chicago_Tribune_logo.svg/2000px-Chicago_Tribune_logo.svg.png'
      } else if (value == 'latimes.com') {
        vm.newspaperHeader = 'https://www.filepicker.io/api/file/TRbw19AlSk6Zz6cP8rBN'
      } else if (value == 'bostonglobe.com') {
        vm.newspaperHeader = 'https://ameliasaltsman.com/wp-content/uploads/2017/09/boston-globe-logo.jpg'
      } else if (value == 'usatoday.com') {
        vm.newspaperHeader = 'http://1000logos.net/wp-content/uploads/2017/07/Color-USA-Today-Logo.jpg'
      } else if (value == 'baltimoresun.com') {
        vm.newspaperHeader = 'https://gbc.org/wp-content/uploads/2014/10/Baltimore-Sun-logo.jpg'
      } else if (value == 'miamiherald.com') {
        vm.newspaperHeader = 'http://www.twodaysnewstand.com/uploads/4/5/6/7/45679297/the-miami-herald-logo-2.png?723'
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
