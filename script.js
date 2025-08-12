
document.getElementById('fetch-data').addEventListener('click', function () {
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
            errorMessage("Error fetching data, please try again")
        })
})

let displayDataDiv = document.querySelector(".display-data")
function displayData(title, body) {

    let h1 = document.createElement('h1')
    h1.innerText = title
    let dataBody = document.createElement('p')
    dataBody.innerText = body
    displayDataDiv.appendChild(h1)
    displayDataDiv.appendChild(dataBody)
}

function errorMessage(msg) {
    let h1 = document.createElement('h1')
    h1.innerText = msg
    displayDataDiv.appendChild(h1)
}

document.getElementById('XHR-data').addEventListener('click', function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayData(data.title, data.body);
            } else {
                console.error('Error fetching data:', xhr.statusText);
                errorMessage("Error fetching data, please try again!")
            }
        }
    };

    xhr.send();
});

function successMessage(msg) {
    let h1 = document.createElement('h1')
    h1.innerText = msg
    displayDataDiv.appendChild(h1)
}

let addTitle = document.querySelector('.add-title')
let addBody = document.querySelector('.add-body')

document.getElementById('btn-post').addEventListener('click', function (e) {
    e.preventDefault()
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: addTitle.value,
            body: addBody.value
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            successMessage('Post created Successfully!')
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage('Error: Message was not posted, please try again.')
        })

});


function displayPutData(title, body, id) {

    let h1 = document.createElement('h1')
    h1.innerText = title
    let dataBody = document.createElement('p')
    dataBody.innerText = body
    let h3 = document.createElement('h3')
    h3.innerText = id
    displayDataDiv.appendChild(h3)
    displayDataDiv.appendChild(h1)
    displayDataDiv.appendChild(dataBody)
}

let putTitle = document.querySelector('.put-title');
let putBody = document.querySelector('.put-body');
document.getElementById('btn-put').addEventListener('click', function (e) {
    e.preventDefault();

    let id = document.querySelector('.put-id').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const updatePost = JSON.parse(xhr.responseText);
            console.log('Success:', updatePost);
            displayPutData(updatePost.title, updatePost.body, id)
        } else {
            errorMessage("Error updating post, please try again!");
        }
    };

    const data = JSON.stringify({
        title: putTitle.value,
        body: putBody.value
    });

    xhr.send(data);
});