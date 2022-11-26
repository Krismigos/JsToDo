
const btnAdd = document.querySelector('.buttton-add');
const inputTask = document.querySelector('.input-task');
const form = document.querySelector('.search');
const ren = document.querySelector('.your-task');

form.addEventListener('submit', commitNew);
let toDo = [];
if (localStorage.getItem('todo')) {
    toDo = JSON.parse(localStorage.getItem('todo'));
    render();
}


function commitNew(event) {
    event.preventDefault();
    const newTask = event.currentTarget.elements.toDo.value;
    if (!newTask) {
        return alert('Пуста форма, запишить текст!');
    }
    toDo.push({
        name: newTask,
        checked: false,
    });
    render()
    event.currentTarget.reset();
}

function render() {
    const newToDo = toDo.map((to, index) => {
        return `<div class ='todo-item'><span class='${to.checked && 'todoDone'}'>${to.name}</span><div class='but'>
        <input type='checkbox' data-id=${index} class='checkbox' ${to.checked && 'checked'} name='checkbox'>
        <button class='delete' data-id=${index} type='button'>delete</button>
        </div></div> `
    });
    ren.innerHTML = newToDo.join('');
    const delet = document.querySelectorAll('.delete');
    delet.forEach(button => { button.addEventListener('click', deleteBtn) });
    const checked = document.querySelectorAll('.checkbox');
    checked.forEach(check => { check.addEventListener('input', chekBtn) });
    saveTodo();
}

function deleteBtn(e) {
    const index = e.currentTarget.dataset.id;
    toDo.splice(index, 1);
    render();
}

function chekBtn(e) {
    const id = e.currentTarget.dataset.id;
    toDo[id].checked = !toDo[id].checked;
    render();
}

function saveTodo() {
    localStorage.setItem('todo', JSON.stringify(toDo));
}