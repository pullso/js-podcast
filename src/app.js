import { createModal, isValid } from './utils'
import './static/style.css'
import { Question } from './question'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const modalBtn = document.getElementById('modal-btn')
const submitBtn = form.querySelector('#submit')

window.addEventListener('DOMContentLoaded', Question.renderList)
modalBtn.addEventListener('click', openModal);
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler (event) {
  event.preventDefault()
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }
    // async request to server to save question
    Question.create(question).then(() => {
      submitBtn.disabled = true
      console.log(question, ':question')
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
  }
}

function openModal (e) {
  e.preventDefault()
  createModal('Авторизация', '<h1>Test</h1>')
}
