//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const body = document.querySelector('body');



//Load all event Listeners
loadEventListeners();

//Load all event Listeners
function loadEventListeners() {
    //DOM lOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //Add Task event
    form.addEventListener('submit', addTask);

    //Remove Task event
    taskList.addEventListener('click', removeTask);

    //clear Task event
    clearBtn.addEventListener('click', clearTasks);

    //filter Task event
    filter.addEventListener('keyup', filterTasks);
};

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks =[];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');

    //Add a class
    li.className = 'collection-item';
    
    //Create Text Node and Append to the Li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');

     //Add a class
     link.className = 'delete-item secondary-content';

    //Add the icon html
    link.innerHTML = '<i class="fa fa-remove" title="delete task"></i>';

    //Append the link to the Li
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);
    });

    //Styling the List
    styleTheLIst()
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
    } else {
        //Create li element
        const li = document.createElement('li');

        //Add a class
        li.className = 'collection-item';

        //Create Text Node and Append to the Li
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link element
        const link = document.createElement('a');

        //Add a class
        link.className = 'delete-item secondary-content';

        //Add the icon html
        link.innerHTML = '<i class="fa fa-remove" title="delete task"></i>';

        //Append the link to the Li
        li.appendChild(link);

        //Append the li to the ul
        taskList.appendChild(li);

        //Store in LS
        storeTaskInLocalStorage(taskInput.value);

        //Clear input;
        taskInput.value = '';

        //Styling the List
        styleTheLIst()

        // console.log(li);

        e.preventDefault();
    }
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks =[];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    //Event Delegation
    if(e.target.parentElement.classList.contains('delete-item')){

        //Confirm remove Task
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }


    // console.log('Clicked');
    //e.preventDefault();
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks =[];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function clearTasks(e) {
    if(confirm('Do you wish to clear all task?')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        //tasklist.innerHTML= "";
       
        //Clear from Local Storage
        clearTasksFromLocalStorage();
    }
};


//Clear Task From Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Task
function filterTasks(e) { 
    const text = e.target.value.toLowerCase();
    
    // document.querySelectorAll('.collection-item').forEach(function(task){
    //     const item = task.firstChild.textContent;

    //     if(item.toLowerCase().indexOf(text) != -1) {
    //         task.style.display = 'block';
    //     } else {
    //         task.style.display = 'none';
    //     }
    // })

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().includes(text)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

//Styling the List
function styleTheLIst() {
    const oddItem = document.querySelectorAll('li:nth-child(odd)');

    //Make styles for background
    oddItem.forEach(function(li){
        li.style.background = '#26a69a';
        li.style.color = '#fff';
    })
}