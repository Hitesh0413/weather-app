const weatherForm = document.querySelector('form')
const query = document.querySelector('#location')
const dataPlace = document.querySelector('#data-place')
const dataWeather = document.querySelector('#data-weather')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let search = query.value
    fetch('/weather?search=' + search).then((response) => {

       response.json().then((data) => {
          
        dataPlace.textContent = data.place
        dataWeather.textContent = data.response
       })
    })
})