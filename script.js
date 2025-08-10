
document.getElementById('fetch-data').addEventListener('click', function(){
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        displayData(data.title, data.body)
    })
    .catch(error => {
        console.error('Fetch error:', error);
        errorMessage(error)
    })
})

let displayDataDiv = document.querySelector(".display-data")
function displayData(title, body){
    let h1 = document.createElement('h1')
    h1.innerText = title
    let dataBody = document.createElement('p')
    dataBody.innerText = body
    displayDataDiv.appendChild(h1)
    displayDataDiv.appendChild(dataBody)
}

function errorMessage(msg){
    let h1 = document.createElement('h1')
    hi.innerText = msg
    displayDataDiv.appendChild(h1)
}