document.addEventListener("DOMContentLoaded", function(){

 let form = document.getElementById("jobSearch")

 form.addEventListener('submit', function(e){
    e.preventDefault()

    let search = document.getElementById("search").value

    fetch(`https://findwork.dev/api/jobs/?search=${search}`, {
        mode: "no-cors",
        
        headers: {
            "Authorization": "Token b41a2503911de9f433317e7d6b97a14de8c16f07"

        }  
    })
    .then((res) => res.json())
    .then(data =>{

        document.getElementById("results").innerHTML =
                 `<div>` +
                 `<h2>${data.role}</h2>`+
                 `</div>` +
                 `<div>` +
                  `<p>${data.text} </p>`+
                  `</div>`


    })


 })






})