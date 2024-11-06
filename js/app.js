const $ = document;
let itemInput = $.querySelector('#itemInput'),
    addButton = $.querySelector('#addButton'),
    clearButton = $.querySelector('#clearButton'),
    completeBtn = $.querySelector('#Complete'),
    deleteBtn = $.querySelector('#Delete'),

    todoListElem = $.getElementById('todoList');

let todoArray = [];

function addNewTodo() {
    let newTodoTitle = itemInput.value;

    let newTodoObj = {
        id: todoArray.length + 1,
        title: newTodoTitle,
        complete: false
    };

    itemInput.value = ''
    todoArray.push(newTodoObj);
    setLocalStorage(todoArray);
    todoGnerate(todoArray);
    itemInput.focus();
};

function setLocalStorage(todoList) {
    localStorage.setItem('todos', JSON.stringify(todoList))
}

function todoGnerate(todoList) {
    let newTodoLiElem, newTodoLableElem, newTodoCompleteBtn, newTodoDeleteBtn;
    todoListElem.innerHTML = ''

    todoList.forEach(function (todo) {
        newTodoLiElem = $.createElement('li');
        newTodoLiElem.className = 'completed well';


        newTodoLableElem = $.createElement('label');
        newTodoLableElem.innerHTML = todo.title;

        newTodoCompleteBtn = $.createElement('button');
        newTodoCompleteBtn.className = 'btn btn-success';
        newTodoCompleteBtn.innerText = 'Complete';
        newTodoCompleteBtn.setAttribute('onclick', 'editTodos(' + todo.id + ')');

        newTodoDeleteBtn = $.createElement('button');
        newTodoDeleteBtn.className = 'btn btn-danger';
        newTodoDeleteBtn.innerText = 'Delete';
        newTodoDeleteBtn.setAttribute('onclick', 'removeTodos(' + todo.id + ')');

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'UnComplete'
        }


        newTodoLiElem.append(newTodoLableElem, newTodoCompleteBtn, newTodoDeleteBtn);

        todoListElem.append(newTodoLiElem);

    })
};

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageTodos) {
        todoArray = localStorageTodos
    } else {
        todoArray = []
    }
    todoGnerate(todoArray)
};

function clearTodos() {
    todoArray = [];
    todoGnerate(todoArray);
    localStorage.removeItem('todos')
};

function removeTodos(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    todoArray = localStorageTodos

    let mainTodoIndex = todoArray.findIndex(function (todo) {
        return todo.id === todoId
    })
    todoArray.splice(mainTodoIndex, 1);
    
    setLocalStorage(todoArray);
    todoGnerate(todoArray);
}

function editTodos(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    todoArray = localStorageTodos

    todoArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todoArray);
    todoGnerate(todoArray);

}
window.addEventListener('load', getLocalStorage);
addButton.addEventListener('click', addNewTodo);
clearButton.addEventListener('click', clearTodos);
itemInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        addNewTodo();
    }
})