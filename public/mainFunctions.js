import {handleError} from './helperfunctions.js'

export function deleteTask(){
    const taskID = this.getAttribute('task-id');
    
    fetch(`/delete-task/${taskID}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

export function completeTask(){
    const taskID = this.getAttribute('task-id');

    fetch(`/complete-task/${taskID}`, {
        method: 'PATCH',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    })
}
export function addTask (event) {
    event.preventDefault();  

    const formData = new FormData(event.target);  
    
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    const urlEncodedData = new URLSearchParams();
    formData.forEach((value, key) => {
        urlEncodedData.append(key, value);
    });

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  // Set correct content type
        },
        body: urlEncodedData.toString(),  // Send data as URL-encoded string
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.reload();
            localStorage.setItem("taskAdded", "true");  
        } else {
            handleError(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.getElementById("general-error-message");
        errorMessage.style.display = "block";
        errorMessage.innerText = "An error occurred.";
        
    });
};

export function test (event){
    console.log("test");
}
/*
export function completeTask(){
    const taskID = this.getAttribute('task-id');
    
    fetch(`/complete-task/${taskID}`, {
        method: 'PATCH',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    })
}
*/