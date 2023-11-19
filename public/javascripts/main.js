const submitButton = document.getElementById("submit-data")
const nameInput = document.getElementById("input-name")
const taskInput = document.getElementById("input-task")
const searchInput = document.getElementById("search-name")
const searchButton = document.getElementById("search")
const searchResult = document.getElementById("search-result")
const postMsg = document.getElementById("post-msg")

submitButton.addEventListener("click", () => {
    fetch("http://localhost:3000/users/todo", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({name: nameInput.value, task: taskInput.value})
    })
    .then(response => response.json())
    .then(data => {
        postMsg.innerText = data.msg
        if (data.first) {
            const deleteButton = document.createElement("button")
            deleteButton.classList.add("delete-user")
            deleteButton.textContent = "Delete"
            deleteButton.addEventListener("click", deleteFunction) 
            document.querySelector("body").appendChild(deleteButton)
        }
    }) 
})

function deleteFunction() {
    fetch(`http://localhost:3000/users/user/${searchInput.value}`, {method: "delete"})
    .then(response => response.json())
    .then(data => {
        console.log(data)
    }) 
}

searchButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/users/user/${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
        if (data.todos && data.name) {
            searchResult.innerText = data.name + " : " + data.todos.join(", ")  }
        else {
            searchResult.innerText = data.msg
        }
    }) 
})