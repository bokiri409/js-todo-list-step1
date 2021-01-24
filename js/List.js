// List.js
const taskInput = document.querySelector('.new-todo'); //input tag
const todoList = document.querySelector('ul.todo-list');

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

function showTask() { //show new tasks
    var getLocalStorage = localStorage.getItem("New Task"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }

    var newliTag = '';
    listArr.forEach(element => {
        newliTag += `<li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label"> ${ element } </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
      </li>`;
    });
    todoList.innerHTML = newliTag; //adding new li tag inside ul tag

}