(() => {

  let articlesArray;
  let pagesAmount;
  let page;
  let articlesList = document.getElementById('list');
  let paginationBox = document.getElementById('pagination');

  async function loadTodoItems() {

    const pageParams = new URLSearchParams(window.location.search);
    page = pageParams.get('page');
    let response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    articlesArray = await response.json();
  }

  function writePagination() {
    pagesAmount = Number(articlesArray.meta.pagination.pages);

    let index;
    for (index = 0; index < pagesAmount; index++) {

      let paginationItem = document.createElement('a');
      paginationBox.append(paginationItem);
      paginationItem.classList.add('articles__pagination-item');
      paginationItem.textContent = index + 1;
      paginationItem.href = `index.html?page=${index + 1}`;

    }

  }

  function writeList() {
    let key;
    for (key in articlesArray.data) {

      let item = document.createElement('li');
      articlesList.append(item);
      item.classList.add('articles__item');

      let link = document.createElement('a');
      item.append(link);
      link.classList.add('articles__item-link');
      // link.setAttribute('target', '_blank');
      link.href = `post.html?id=${articlesArray.data[key].id}`;


      let itemHeading = document.createElement('h2');
      link.append(itemHeading);
      itemHeading.classList.add('articles__item-heading');
      itemHeading.textContent = articlesArray.data[key].title;

      let itemText = document.createElement('p');
      link.append(itemText);
      itemText.classList.add('articles__item-text');
      itemText.textContent = articlesArray.data[key].body.slice(0, 200) + ' ... ';

    }
  }

  document.addEventListener('DOMContentLoaded', async () => {

    await loadTodoItems();
    writePagination();
    writeList();

  })

})()
