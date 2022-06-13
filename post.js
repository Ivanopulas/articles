(() => {

  let heading = document.getElementById('heading');
  let text = document.getElementById('text');
  let commentsBox = document.getElementById('comments');

  const pageParams = new URLSearchParams(window.location.search);
  let id = pageParams.get('id');

  async function getItem() {
    let response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    let data = await response.json();

    heading.textContent = await data.data.title;
    text.textContent = await data.data.body;
  }

  async function getComments() {
    let response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    let comments = await response.json();

    let key;
    for (key in comments.data) {

      let item = document.createElement('li');
      commentsBox.append(item);
      item.classList.add('article__comment');

      let name = document.createElement('h3');
      item.append(name);
      name.classList.add('article__name');
      name.textContent = comments.data[key].name;

      let email = document.createElement('a');
      item.append(email);
      email.classList.add('article__email');
      email.href = 'mailto:' + comments.data[key].email;
      email.textContent = comments.data[key].email;

      let commentText = document.createElement('p');
      item.append(commentText);
      commentText.classList.add('article__comment-text');
      commentText.textContent = comments.data[key].body;

    }
  }

  document.addEventListener('DOMContentLoaded', async () => {

    await getItem();
    await getComments();

  })

})()
