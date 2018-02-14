window.addEventListener('load', function () {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  })

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    console.log(articleRequest);
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
    console.log(data);
    const article = data.response.docs;
    for (let i = 0; i < article.length; i++) {
      if (article != 0) {
        const element = article[i];
        const contenido = `<div><h2>${element.headline.main}</h2><br><h3>${element.snippet}</h3><br><img src="https://static01.nyt.com/${element.multimedia[0].url}"></div>`
        responseContainer.innerHTML = contenido;
        console.log(element);
        console.log('------------------------');
      }
      /* 
        responseContainer.append(`${element}` + `<br>` + `${snippet}` + "----/-/-/-/-/-/-/-/-/-/-/-/-" + `${multi}`); */

    }
  }
  function handleError() {
      console.log('se ha presentado un error');

  }


  const btn1 = document.querySelector('#submit-btn1');
  btn1.addEventListener('click', function () {
    event.preventDefault();
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f93fd9d4a03041ea99e88d17baa5b6c4`;
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    //  .then(updateProfile)
    .catch(displayErrors);
  });

  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res;
  }

  function parseJSON(res) {
    return res.json()
    .then(function (response) {
        return data.response.docs;
    })
  }

  function updateProfile(data) {
    const element = article[i];
    const contenido = `<div><h2>${element.headline.main}</h2><br><h3>${element.snippet}</h3><br><img src="https://static01.nyt.com/${element.multimedia[0].url}"></div>`
    responseContainer.innerHTML = contenido;
  }

  function displayErrors(err) {
    console.log("INSIDE displayErrors!");
    console.log(err);
  }
});