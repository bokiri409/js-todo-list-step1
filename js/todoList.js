// List.js
const taskInput = document.querySelector('.new-todo'); //input tag
const todoList = document.querySelector('ul.todo-list');
const todoCount = document.querySelector('.item-count'); //total item count tag(strong tag)


showTask(); 

//if user entered
function get_list() { //input event
    if (window.event.keyCode == 13) { //enter
        if (taskInput.value.length < 1) { //nothing in input box
            // if(taskInput.classList)
            taskInput.classList += '-input-null'; // ▶계속 리스트 추가되는 문제 해결하기
            console.log("빈 내용");
            taskInput.focus();
        } else { 
            var newTask = document.getElementById("new-todo-title").value; //getting user entered value
            var getLocalStorage_newTask = localStorage.getItem("New Task"); //getting localstorage
            var getLocalStorage_completedTask = localStorage.getItem("Completed Task"); //getting localstorage
            if (getLocalStorage_newTask == null) {
                listArr = []; //creating blank array
                doneArr = []; //creating done list array
            } else {
                listArr = JSON.parse(getLocalStorage_newTask); //transforming json string into a js object
                doneArr = JSON.parse(getLocalStorage_completedTask); //transforming json string into a js object
            }
    
            listArr.push(newTask); //adding user task
            localStorage.setItem("New Task", JSON.stringify(listArr)); //transforming js object into a json string
            localStorage.setItem("Completed Task", JSON.stringify(doneArr)); //transforming js object into a json string
            showTask(); 
        }

        // reset input blank
        taskInput.value = '';
    }
}

//show new tasks
function showTask() { 
    var getLocalStorage_newTask = localStorage.getItem("New Task"); //getting localstorage
    var getLocalStorage_completedTask = localStorage.getItem("Completed Task"); //getting localstorage
    if (getLocalStorage_newTask == null || getLocalStorage_completedTask == null) {
        listArr = []; //creating todo list array
        doneArr = []; //creating done list array
    } else {
        listArr = JSON.parse(getLocalStorage_newTask); //transforming json string into a js object
        doneArr = JSON.parse(getLocalStorage_completedTask); //transforming json string into a js object
    }

    var newliTag = '';
    listArr.forEach((element, index) => {
        newliTag += `<li>
        <div class="view-new">
          <input class="toggle" type="checkbox" onclick="completeTask()"/>
          <label class="label" dblclick="editTask()"> ${ element } </label>
          <button class="destroy" onclick="deleteNewTask(${ index })"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`;
    });
    // doneArr.forEach((element, index) => {
    //     newliTag += `<li class="completed" id="completed">
    //     <div class="view-done">
    //       <input class="toggle" type="checkbox" checked onclick="completeTask()"/>
    //       <label class="label">${ element }</label>
    //       <button class="destroy" onclick="deleteDoneTask(${ index })"></button>
    //     </div>
    //     <input class="edit" value="완료된 타이틀" />
    //   </li>`;
    // });
    todoList.innerHTML = newliTag; //adding new li tag inside ul tag

    // show total todolist count
    todoCount.innerHTML = listArr.length;

}

var chk = false;
//completed task function
function completeTask() {
    let getLocalStorage_newTask = localStorage.getItem("New Task"); 
    let getLocalStorage_completedTask = localStorage.getItem("Completed Task"); //getting local storage which completed tasks
    listArr = JSON.parse(getLocalStorage_newTask);
    doneArr = JSON.parse(getLocalStorage_completedTask);

    const checkboxNew = document.querySelectorAll('div.view-new .toggle'); // input checkboxNew
    const checkboxDone = document.querySelectorAll('div.view-done .toggle'); // input checkboxDone
    
    //task done
    for (var i = 0; i < checkboxNew.length; i++) {
        if (checkboxNew[i].checked) { //if task is done
            //move completed task from New task storage to Completed Task storage
            console.log("안녕");
            var completeTask = listArr[i];
            listArr.splice(i, 1); //delete or remove the particular indexed li

            doneArr.push(completeTask); //adding completed task
            //after remove the li again update the local storage
            localStorage.setItem("New Task", JSON.stringify(listArr));
            localStorage.setItem("Completed Task", JSON.stringify(doneArr));
        }
    }

    //task not done
    for (var j = 0; j < checkboxDone.length; j++){
        if (!checkboxDone[j].checked) { //if task is not done
            //move not completed task from completed task stroage to new task storage
            console.log(checkboxDone[j].value);
            var doingTask = doneArr[j];
            doneArr.splice(j, 1);

            listArr.push(doingTask);
            localStorage.setItem("New Task", JSON.stringify(listArr));
            localStorage.setItem("Completed Task", JSON.stringify(doneArr));
        }
    }
    location.reload();
}

//delete task function
function deleteNewTask(index) {
    let getLocalStorage_newTask = localStorage.getItem("New Task"); 
    listArr = JSON.parse(getLocalStorage_newTask);
    listArr.splice(index, 1); //delete or remove the particular indexed li

    //after remove the li again update the local storage
    localStorage.setItem("New Task", JSON.stringify(listArr));
    showTask();
}

// edit task function //change input mode when you double click input tag
function editTask() {
    
}

// show only todo list
function onlyTodo() {
    
}