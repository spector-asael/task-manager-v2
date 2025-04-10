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

export function addTask (event) {
    event.preventDefault();  // Prevents form submission

    const formData = new FormData(event.target);  // Make sure we get the correct form
    
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
            const addTask = document.getElementById("add-task").style.display = "flex";
            document.getElementById("error-message").innerText = "Task added successfully!";
            form.reset(); 
        } else {
            document.getElementById("error-message").innerText = "Error: " + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("error-message").innerText = "An error occurred.";
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