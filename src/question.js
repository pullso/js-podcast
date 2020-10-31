export class Question {
  static create(question) {
    return fetch('https://javascript-podcast.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        question.id = res.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }
  
  static renderList() {
    const questions = getQuestionsFromLocalStorage()
    
    const html = questions.length
      ? questions.map(questionToCard)
                 .reverse()
                 .join('')
      : '<div class="mui--text-headline">Вопросов от вас пока нет</div>'
    
    const list = document.querySelector('#list')
    
    list.innerHTML = html
  }
  
  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У Вас нет токена</p>')
    }
    return fetch(
      `https://javascript-podcast.firebaseio.com/questions.json?auth=${ token }`)
      .then(res => res.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${ response.error }</p>`
        }
        return response ? Object.keys(response)
                                .map(key => ({
                                  ...response[key],
                                  id: key,
                                })) : []
      })
  }
  
  static listToHTML(questions) {
    let questionsHTML = questions.length
      ? `<ol>${ questions.map((q) => `<li>${ q.text } | ${ new Date(
        q.date).toLocaleDateString() }</li>`)
                         .join('') }</ol>`
      : `<p>Вопросов пока нет</p>`
    return questionsHTML
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function questionToCard(question) {
  return `
    <div class = 'mui--text-black-54'><b>
      ${ new Date(question.date).toLocaleDateString() }
      ${ new Date(question.date).toLocaleTimeString() }
    </b></div>
    <div>${ question.text } </div>
    <br>
      `
}
