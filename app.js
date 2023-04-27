
console.log(`насколько могу судить все пункы выполнены.
Во всех фаилах : 
  -откоректированы отступы.
  -применена БЭМ мотация.
  -удалены коментарии показавшиеся лишними.
  -все имена и классы в нижнем регистре.

В фаиле HTML :
  -добавлен DOCTYPE.
  -применены синтаксические теги.
  -добавлены alt для img ,
 
В фаиле css :
  -селекторы по тегу применены только для сброса ,
  -пробел между именем своиста добавлен ,

В фаиле js :
  -переход с var на let ,
  -сделал addTask чистой ,
 `)



let taskInput = document.querySelector(".newTaskBlock__taskRow__area");
let addButton = document.querySelector(".newTaskBlock__taskRow__button");
let incompleteTasks = document.querySelector(".tasksBlock__list");
let completedTasks = document.getElementById("completed-tasks");

//New task list item
let createNewTaskElement = function( taskString ) {

  let listItem = document.createElement("li");  
  listItem.className = "tasksBlock__list__item" ;
 
  let checkBox=document.createElement("input");
  checkBox.className = "tasksBlock__list__item__checkbox" ;
  checkBox.type = "checkbox";
  
  let label=document.createElement("label");
  label.className = "tasksBlock__list__item__desc" ;
  label.innerText = taskString;
  
  let editInput = document.createElement("input");
  editInput.className = "tasksBlock__list__item__area" ;
  editInput.type = "text";
  
  let editButton = document.createElement("button");
  editButton.className = "tasksBlock__list__item__editBtn";
  editButton.innerText = "Edit"; 
  editButton.className = "tasksBlock__list__item__editBtn";


  let deleteButton=document.createElement("button");
  deleteButton.className = "tasksBlock__list__item__delBtn" ;

  let deleteButtonImg=document.createElement("img");
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.className='delBtn__img';
  
  deleteButton.append( deleteButtonImg );  

  listItem.append( checkBox , label , editInput , editButton , deleteButton );
  
  return listItem;
}

let bindTaskEvents = function( taskListItem , checkBoxEventHandler ) {

  let checkBox = taskListItem.querySelector(".tasksBlock__list__item__checkbox");
  let editButton = taskListItem.querySelector(".tasksBlock__list__item__editBtn");
  let deleteButton = taskListItem.querySelector(".tasksBlock__list__item__delBtn");  
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}
  

let addTask = function( taskInput ) {

  if ( !taskInput.value ) return;

  let listItem = createNewTaskElement( taskInput.value );
  incompleteTasks.append( listItem );
  bindTaskEvents( listItem, taskCompleted );
  taskInput.value = "";
}

//Edit an existing task.

let editTask = function() {

  let listItem = this.parentNode;
  
  let editInput = listItem.querySelector('.tasksBlock__list__item__area');
  let label = listItem.querySelector(".tasksBlock__list__item__desc");
  let editBtn = listItem.querySelector(".tasksBlock__list__item__editBtn");
  let containsClass = listItem.classList.contains("editMode");  
  
  if( containsClass ) {  
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }  

  listItem.classList.toggle("editMode");
};

//Delete task.
let deleteTask = function() {
  
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild( listItem );

}

//Mark task completed
let taskCompleted = function() {
  let listItem = this.parentNode;
  completedTasks.append( listItem );
  bindTaskEvents( listItem, taskIncomplete );
}
  
let taskIncomplete = function() {
  let listItem = this.parentNode;
  incompleteTasks.appendChild( listItem );
  bindTaskEvents( listItem, taskCompleted );
}

let incTask = incompleteTasks.children ;

for (let i = 0; i < incTask.length ; i++){
  bindTaskEvents( incTask[i] , taskCompleted );
}

let compTask = completedTasks.children ; 

for ( let i = 0; i < compTask.length; i++ ){
  bindTaskEvents( compTask[i] , taskIncomplete );
}

  //Set the click handler to the addTask function.
addButton.addEventListener("click",() => addTask( taskInput ));