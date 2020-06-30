console.log('Client side js')

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#p1')  //.classname if class name
const messageSecond = document.querySelector('#p2') 


 weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = input.value
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageSecond.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
            }
            
        })
     })
 })