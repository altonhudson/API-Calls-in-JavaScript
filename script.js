
document.getElementById('fetch-data').addEventListener('click', function () {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) {
                handleError('server', `Status: ${response.status}`)              
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
            handleError('Network', '')

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
                handleError('server', `Status: 404 not found`)              
                console.error('Error fetching data:', xhr.statusText);

            }
        }
    };
 
    xhr.onerror = function ()  {
        handleError('network', '')
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
                handleError('server', `Status: ${response.status}`)
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
            handleError('Network', '')
        })

});


function displayPutData(title, body, id) {
    displayDataDiv.classList.toggle('show')
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
            let del = document.createElement('button')
            del.setAttribute('id','del-btn');
            del.innerText = "Delete Post"
            displayDataDiv.appendChild(del)
        } else {
            errorMessage("Error updating post, please try again!");
            handleError('server', `Status ${xhr.status}`); 
        };
    }

    xhr.onerror = function ()  {
        handleError('network', '')
    };

    const data = JSON.stringify({
        title: putTitle.value,
        body: putBody.value
    });

    xhr.send(data);
});

let h4 = document.createElement('h4')

function handleError(type, errDetail) {
    displayDataDiv.appendChild(h4)
    switch (type) {
        case 'network':  h4.innerText = "Network Error: Please check your internet connection"
        break;
        case "input" : h4.innerText = "Invalid Input: " + errDetail;
        break
        case "server": h4.innerText = "Service Error: " + errDetail;
        break
        default:
            h4.innerText = "An unkown error occured! Please try again."
    }
}

function deletePost(id){
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        
    })
    .then(response => {
        if(response.ok) {
            console.log('Post deleted succesfully');
        } else {
            console.error('Failed to delete post:', response.status);
            handleError('server', `Status: ${response.status}`)


        }
    })
    .catch(error => {
        console.error('Network error: ', error)
        handleError('network', `Status: ${error}`)
        
    })
}

displayDataDiv.addEventListener('click', function(e) {
 let id = document.querySelector('.put-id').value;

  if (e.target.id === 'del-btn') {
    deletePost(id);
    displayDataDiv.classList.toggle('show')
    displayDataDiv.classList.toggle('hidden')

  }
});