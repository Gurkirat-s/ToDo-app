const todos = [{
    text: 'Complete readings',
    completed: false
}, {
    text: 'Clean my bedroom',
    completed: true
}, {
    text: 'Walk the dog',
    completed: true
}, {
    text: 'Workout',
    completed: false
}, {
    text: 'Cut the grass',
    completed: false
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

// Renders Todos Function
const renderTodos = function (todos, filters) {

    document.querySelector('#todos').innerHTML = ''

    // Filters out todos that don't match serach text or hidecompleted
    const filteredTodos = todos.filter(function(todo) {
        return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !(filters.completed && todo.completed))
    })

    const incompletes = filteredTodos.filter(function(todo){
        return !todo.completed
    })
    
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompletes.length} todos left.`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const newTodoEl = document.createElement('p')
        newTodoEl.textContent = todo.text
        document.querySelector('#todos').appendChild(newTodoEl)
    })
}

// Renders Todos on page load one time
renderTodos(todos, filters)

//Filter todos
document.querySelector('#search-text').addEventListener('input', function (event) {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

//Add a Todo
document.querySelector('#add-todo-form').addEventListener('submit', function (event) {
    event.preventDefault()
    console.log(event.target.elements.todoAdded.value)

    const newTodo = {
        text: event.target.elements.todoAdded.value,
        completed: false
    }

    todos.push(newTodo)
    renderTodos(todos, filters)

    event.target.elements.todoAdded.value = ''
})

//Hide Completed Checkbox
document.querySelector('#hide-completed-checkbox').addEventListener('change', function (event) {

    filters.completed = event.target.checked
    renderTodos(todos, filters)

})