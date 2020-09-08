let todoListItem = document.getElementById('todo-list');
let todoListInput = document.getElementById('todo-input');


document.getElementById("submit-btn").addEventListener("click", addTodo);

function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}

function addTodo() {

    let item = document.getElementById('todo-input').value;
    if (item) {

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(item));
        todoListItem.appendChild(li);

        todoListInput.value = " ";
    }
}