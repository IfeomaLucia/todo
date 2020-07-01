loadEvents();

function loadEvents(){
  document.querySelector('form').addEventListener('submit', submit);
  document.getElementById('clear-list').addEventListener('click', clearList);
  document.getElementById('save-list').addEventListener('click', saveList);
  document.getElementById('saved-list').addEventListener('click', savedList);
  document.querySelector('ul').addEventListener('click', tickOrDelete);

  //Listeners for the drag-and-drop events
  document.querySelector('li').addEventListener('ondragstart', drag);
  // document.getElementById('list').addEventListener('ondragover', allowDrop);
  // document.getElementById('list').addEventListener('ondrop', drop);
  document.getElementById('list-doing').addEventListener('ondragover', allowDrop);
  document.getElementById('list-doing').addEventListener('ondrop', drop);
}

//Submit function which executes when the add button is clicked
function submit(e){
  e.preventDefault();
  let input = document.querySelector('input');
  let item = input.value.trim();
  if(item != '' || item.length !== 0){
    addTask(item);
  } else {
    alert('Insert a valid item');
  }
  input.value = '';
}

//Add task function which details how any todo item appears on the list 
function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  
  let identfier = new Date().toLocaleTimeString();
    li.id = `${identfier}`;
    li.draggable = "true";
    li.innerHTML = `<input type="checkbox"><label>${task}</label><span class="delete">x</span>`;
    ul.appendChild(li);
    document.querySelector('.itemList').style.display = 'block';
}

//To clear all the items both on the todo list && the local storage
function clearList(e){
  let ul = document.querySelector('ul').innerHTML = '';
  localStorage.removeItem('todoList', ul);
}

//To save the todo list for any future purpose
function saveList(e){
  let ul = document.querySelector('ul');
  localStorage.setItem('todoList', ul.innerHTML)
}

function savedList(){
  if (localStorage.length !== 0){
    //alert(window.localStorage.getItem('todoList'));
    loadTodo();
  } else {
    alert('No saved items');
  }
}


//To load any todo list saved on the local storage
function loadTodo(){
  let ul = document.querySelector('ul');
  if (localStorage.getItem('todoList')){
    ul.innerHTML = localStorage.getItem('todoList');
  }
}

/*
To check if any click event on a task is for the checkbox or deleting of the task

If it's for the checkbox, the todo item is stricked through

If it's for the delete key, the item is removed from the list

*/
function tickOrDelete(e){
  if(e.target.className !== 'delete'){
    const task = e.target.nextSibling;
    if(e.target.checked){
      task.style.textDecoration = "line-through";
      task.style.opacity = "0.5"
    } else {
      task.style.textDecoration = "none";
      task.style.opacity = "1.0";
    }
  } else {

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
}


function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log("drag started");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}