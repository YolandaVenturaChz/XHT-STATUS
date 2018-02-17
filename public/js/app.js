$(document).ready(function () {
  const form = $('#search-form');
  const searchField = $('#search-keyword');
  const responseContainer = $('#response-container');
  const res = $('#sub');
  let searchedForText = " ";


  form.submit(function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.val();
    getNews();
  })

  res.submit(function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f93fd9d4a03041ea99e88d17baa5b6c4`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        addNews(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  function getNews(data) {

    const articleRequest = new XMLHttpRequest();
    articleRequest.onreadystatechange = function () {

      if (articleRequest.readyState == 4 && articleRequest.status == 200) {
        articleRequest.onload = addNews;
        articleRequest.onerror = handleError;
      }
    }
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f93fd9d4a03041ea99e88d17baa5b6c4`);
    articleRequest.send();
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs;
 
    for (let i = 0; i < article.length; i++) {
      console.log(article);
      const element = article[i];
      
      console.log('------------------------');
      if (element != 0) {
       
        responseContainer.append(`<div class="col-12 col-md-6 cap"><div><div class ="up"><h2>${element.headline.main}</h2>
        <p>${element.snippet}</p></div><div class="ret"> <a href="https://www.nytimes.com/2018/02/02/style/modern-love-when-your-body-tells-you-what-your-brain-wont.html">
        Sigue este articulo</a><p>${element.byline.original}</div></div>
         <img src="https://static01.nyt.com/${element.multimedia[0].url}" class="img-responsive">
        </div>`);
       console.log(element.byline.person[0]);
       
      }
      
    }
   
    function handleError() {
      console.log('se ha presentado un error');

    }
  }
  
});