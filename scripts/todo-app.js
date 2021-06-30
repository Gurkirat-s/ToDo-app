'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

// Renders Todos on page load one time
renderTodos(todos, filters)

//Filter todos
document.querySelector('#search-text').addEventListener('input', (event) => {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

//Add a Todo
document.querySelector('#add-todo-form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (event.target.elements.todoAdded.value.trim() !== '') {
        const newTodo = {
            id: uuidv4(),
            text: event.target.elements.todoAdded.value.trim(),
            completed: false
        }
        todos.push(newTodo)
        saveTodos(todos)
        renderTodos(todos, filters)
        event.target.elements.todoAdded.value = ''
    }


})

//Hide Completed Checkbox
document.querySelector('#hide-completed-checkbox').addEventListener('change', (event) => {
    filters.completed = event.target.checked
    renderTodos(todos, filters)
})
