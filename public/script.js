/*
 <button id="complete" task-id="<%= task.id %>"> Complete Task </button>
                            <% } else { %>
                                <!--
                                <form method="POST" action="/complete-task/<%= task.id %>" >
                                    <button type="submit" class="undo">Undo Completion</button>
                                </form> 
                                <br> -->
                                <button id="undo" task-id="<%= task.id %>"> Undo Completion </button>
                            <% } %>
                            <!--
                            <form method="POST" action="/delete-task/<%= task.id %>">
                                <button type="submit" class="delete">Delete Task</button>
                            </form>
                            -->
                                <button id="delete" task-id="<%= task.id %>"> Delete Task </button>
*/
const deleteButtons = document.getElementsByClassName('delete');
const completeButtons = document.getElementsByClassName('complete');
const undoButtons = document.getElementsByClassName('undo');

console.log("Loading script...");
function deleteTask(){
    const taskID = this.getAttribute('task-id');
    console.log(taskID);
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

for(let i = 0; i < deleteButtons.length; i++){
    console.log("Handling button", i);
    deleteButtons[i].addEventListener("click", deleteTask);
}