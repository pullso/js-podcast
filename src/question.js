export class Question {
  static create (question) {
    return fetch('https://javascript-podcast.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(res => {
      question.id = res.name
      return question
    }).then(addToLocalStorage).then(Question.renderList)
  }
  
  static renderList () {
    const questions = getQuestionsFromLocalStorage()
    
    const html = questions.length
      ? questions.map(questionToCard).reverse().join('')
      : '<div class="mui--text-headline">Вопросов пока нет</div>'
    
    const list = document.querySelector('#list')
    
    list.innerHTML = html
  }
}

function addToLocalStorage (question) {
  const all = getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage () {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function questionToCard (question) {
  return `
        <div class="mui--text-black-54 bold">
           ${new Date(question.date).toLocaleDateString()}
           ${new Date(question.date).toLocaleTimeString()}
         </div>
        <div> ${question.text} </div>
        <br>
  `
}
