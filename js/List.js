// List.js
const taskInput = document.querySelector('.new-todo'); //input tag
const todoList = document.querySelector('ul.todo-list');
const todoCount = document.querySelector('.item-count'); //total item count tag(strong tag)


showTask(); 

//if user entered
function get_list() { //input event
    if (window.event.keyCode == 13) { //enter
        if (taskInput.value.length < 1) { //nothing in input box
            taskInput.classList += '-input-null'; // ▶계속 리스트 추가되는 문제 해결하기
            console.log("빈 내용");
            taskInput.focus();
        } else { 
            var newTask = document.getElementById("new-todo-title").value; //getting user entered value
            var getLocalStorage = localStorage.getItem("New Task"); //getting localstorage
            if (getLocalStorage == null) {
                listArr = []; //creating blank array
            } else {
                listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
            }
    
            listArr.push(newTask); //adding user task
            localStorage.setItem("New Task", JSON.stringify(listArr)); //transforming js object into a json string
            showTask(); 
        }
        taskInput.value = '';

    }
}

//show new tasks
function showTask() { 
    var getLocalStorage = localStorage.getItem("New Task"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }

    var newliTag = '';
    listArr.forEach((element, index) => {
        newliTag += `<li>
        <div class="view">
          <input class="toggle" type="checkbox" onclick="completeTask()"/>
          <label class="label" dblclick="editTask()"> ${ element } </label>
          <button class="destroy" onclick="deleteTask(${ index })"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`;
    });
    todoList.innerHTML = newliTag; //adding new li tag inside ul tag

    // show total todolist count
    todoCount.innerHTML = listArr.length;

}

var chk = false;
//completed task function
function completeTask(index) {
    // 체크하면 completeArr 배열로 옮기게 하자
    // var getLocalStorage = localStorage.getItem("New Task");
    // completeArr = JSON.parse(getLocalStorage);
    // completeArr.

    let getLocalStorage = localStorage.getItem("New Task"); 
    listArr = JSON.parse(getLocalStorage);
    const checkbox = document.querySelectorAll('div.view .toggle'); // input checkbox
    
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) { //if task is done
            checkbox[i].closest("li").classList.add("completed");
            /**
             * move completed task from New task storage to Completed Task
             */
            // console.log(checkbox[i].nextElementSibling.innerText);
            // console.log(i);
            // let getLocalStorage = localStorage.getItem("Completed Task"); //getting local storage which completed tasks
            // listArr.splice(i, 1); //delete or remove the particular indexed li
            // localStorage.setItem("Completed Task", JSON.stringify(checkbox[i].nextElementSibling.innerText));
        }
        else { //if task is not done
            checkbox[i].closest("li").classList.remove("completed");
        }
    }
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Task"); 
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li

    //after remove the li again update the local storage
    localStorage.setItem("New Task", JSON.stringify(listArr));
    showTask();
}

// edit task function //change input mode when you double click input tag
function editTask() {
    
}