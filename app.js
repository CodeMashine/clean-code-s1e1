//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

//var taskInput=document.getElementById("new-task");//Add a new task.
var taskInput=document.querySelector(".newTaskBlock__taskRow__area");//Add a new task.
//var addButton=document.getElementsByTagName("button")[0];//first button
var addButton=document.querySelector(".newTaskBlock__taskRow__button");//first button
//var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var incompleteTaskHolder = document.querySelector(".tasksBlock__list");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

console.log(incompleteTaskHolder) ;



//New task list item
var createNewTaskElement=function(taskString){

    // console.log("add") ;


    var listItem=document.createElement("li");

    listItem.className = "tasksBlock__list__item" ;
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    label.className = "tasksBlock__list__item__desc" ;
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.className = "tasksBlock__list__item__area" ;
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.className = "tasksBlock__list__item__editBtn"
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className = "tasksBlock__list__item__delBtn" ;
    var deleteButtonImg=document.createElement("img");//delete button image
    // deleteButtonImg = "delBtn__img" ;

    label.innerText=taskString;
    // label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    // editInput.className="task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="tasksBlock__list__item__editBtn";
    // editButton.classListAdd("editBtn");

    // deleteButton.className="delete";
    // deleteButton.className="TasksBlock__list__item__delBtn delBtn";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='delBtn__img';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    console.log(taskInput.value);
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    // var listItem=createNewTaskElement(taskInput.value);
    let listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    
    
    var listItem=this.parentNode;
    
    console.log(listItem);


    var editInput=listItem.querySelector('.tasksBlock__list__item__area');
    var label=listItem.querySelector(".tasksBlock__list__item__desc");
    var editBtn=listItem.querySelector(".tasksBlock__list__item__editBtn");
    var containsClass=listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    // var editButton=taskListItem.querySelector("button.edit");
    var editButton=taskListItem.querySelector(".tasksBlock__list__item__editBtn");
    // var deleteButton=taskListItem.querySelector("button.delete");
    var deleteButton=taskListItem.querySelector(".tasksBlock__list__item__delBtn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.