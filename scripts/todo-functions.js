'use strict'

// Get Saved todos from local storage and parse them
const getSavedTodos = () => {
    // Gets saved local storage in string form
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e){
        return []
    }
}

// Save the todos array to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Renders Todos Function
const renderTodos = (todos, filters) => {
    // Filters out todos that don't match serach text or hidecompleted
    const filteredTodos = todos.filter((todo) => {
        return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !(filters.completed && todo.completed))
    })

    const incompletes = filteredTodos.filter((todo) => !todo.completed)
    
    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompletes))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))
        })
    } else {
        const noTodoMessage = document.createElement('p')
        noTodoMessage.classList.add('empty-message')
        noTodoMessage.textContent = 'No to-dos to show'
        document.querySelector('#todos').appendChild(noTodoMessage)
    }

}

// Creates a new Todo DOM element given a todo object and then appends it to #todos
const generateTodoDOM = (todo) => {
    const newTodoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoCheckbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup the checkbox, checks if todo completed or not
    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.completed
    containerEl.appendChild(todoCheckbox)
    todoCheckbox.addEventListener('change', () => {
        todo.completed = todoCheckbox.checked
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // setup text of the todo
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    newTodoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    newTodoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'Remove Todo'
    removeButton.classList.add('button', 'button--text')
    newTodoEl.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })



    return newTodoEl
}

const removeTodo = (id) => {
    const todosIndex = todos.findIndex((todo) => todo.id === id)

    if (todosIndex > -1) {
        todos.splice(todosIndex, 1)
    } 
}


const generateSummaryDOM = (incompletes) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if (incompletes.length === 1) {
        summary.textContent = `You have ${incompletes.length} todo left.`
    } else {
        summary.textContent = `You have ${incompletes.length} todos left.`
    }
    
    return summary
}

