
const body = document.querySelector('body')
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const loader = document.querySelector('#loader')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
   const location = searchElement.value

messageOne.textContent = ''
messageTwo.textContent = ''
loader.style.display = 'block'


fetch(`/weather?address=${location}`)

.then((response) => {
    response.json()
    .then((data) => {
        if (data.error) {
            loader.style.display = 'none'
            messageOne.textContent = data.error
        }
        else{
            loader.style.display = 'none'
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast
        }
    })
})

})

