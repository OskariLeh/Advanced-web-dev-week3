const submitButton = document.getElementById("submit-data")
const nameInput = document.getElementById("input-name")
const taskInput = document.getElementById("input-task")
const searchInput = document.getElementById("search-name")
const searchButton = document.getElementById("search")
const searchResult = document.getElementById("search-result")
const postMsg = document.getElementById("post-msg")

submitButton.addEventListener("click", () => {
    fetch("http://localhost:3000/todo", {
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
            deleteButton.id = "delete-user"
            deleteButton.textContent = "Delete"
            deleteButton.addEventListener("click", deleteUser) 
            document.querySelector("body").appendChild(deleteButton)
        }
    }) 
})

function deleteUser() {
    fetch(`http://localhost:3000/user/${searchInput.value}`, {method: "delete"})
    .then(response => response.json())
    .then(data => {
        searchResult.innerText = data.msg
        if (data.lastUser){
            const deleteButton = document.getElementById("delete-user")
            deleteButton.remove()
        } 
    }) 
}

searchButton.addEventListener("click", () => {
    if (document.querySelector("ul")){
        document.querySelector("ul").remove()
    }
    fetch(`http://localhost:3000/user/${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
        if (data.todos && data.name) {
            searchResult.innerText = data.name
            const list = document.createElement("ul")
            data.todos.forEach(todo => {
                const listItem = document.createElement("li")
                listItem.classList.add("delete-task")
                listItem.innerText = todo
                listItem.addEventListener("click", () => {
                    fetch(`http://localhost:3000/user`, {
                        method: "put",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({name: data.name ,todo: listItem.innerText})
                    })
                    .then(response => response.json())
                    .then(data => {
                        searchResult.innerText = data.msg
                        listItem.remove()
                    })
                })
                list.appendChild(listItem) 
            })
            document.querySelector("body").appendChild(list)
        } else {
            searchResult.innerText = data.msg
        }
    }) 
})

function deleteTask() {
    
}