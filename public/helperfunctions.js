export function handleError(error){
    if(error.field == "task_name"){

        const errorMessage = document.getElementById("error-message-task-name");
        const taskNamefield = document.getElementById("task_name");

        errorMessage.style.display = "block";
        errorMessage.innerText = error.message;
        taskNamefield.classList.add("input-error");

    } else if (error.field == "task_description"){

        const errorMessage = document.getElementById("error-message-task-description");
        const taskDescriptionField = document.getElementById("task_description");

        errorMessage.style.display = "block";
        errorMessage.innerText = error.message;
        taskDescriptionField.classList.add("input-error");

    } else if (error.field == "task_priority"){

        const errorMessage = document.getElementById("error-message-task-priority");
        errorMessage.style.display = "block";
        errorMessage.innerText = error.message;
    } else {
        const errorMessage = document.getElementById("error-message-task-name");
        errorMessage.style.display = "block";
        errorMessage.innerText = error.message;
    }
}