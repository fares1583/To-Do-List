let input = document.querySelector("input");
let add = document.querySelector("button");
let taskList = document.querySelector("#task-list");
let deleteAll = document.querySelector(".deleteAll");
let arr = [];
if (window.localStorage.getItem("task")) {
  arr = JSON.parse(localStorage.getItem("task"));
}

getDataFromLocalStor();

add.onclick = function () {
  if (input.value != "") {
    addTaskToArr(input.value);
    input.value = "";
  }
};

function addTaskToArr(task) {
  let date = new Date();
  let formattedDate =
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getFullYear();

  let taskObj = {
    id: formattedDate,
    title: task,
    completed: false,
  };

  arr.push(taskObj);

  //   add ele to page
  addEleToPage(arr);

  //Add task to local storage
  addTaskToLocalStor(arr);
}

deleteAll.onclick = function () {
  taskList.innerHTML = "";
  arr=[];
  window.localStorage.clear();
};
function addEleToPage(arr) {
  taskList.innerHTML = "";
  arr.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task.title));
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.className = "done";
    }

    if (arr.length > 1) {
      deleteAll.style.display = "inline";
    }

    let date = document.createElement("span");
    date.appendChild(document.createTextNode(task.id));
    date.style.fontSize = "12px";
    let span = document.createElement("span");
    span.className = "delete-button";
    span.innerHTML = "Delete";

    li.appendChild(date);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function addTaskToLocalStor() {
  window.localStorage.setItem("task", JSON.stringify(arr));
}

function getDataFromLocalStor() {
  let dataFromLocalStor = window.localStorage.getItem("task");
  if (dataFromLocalStor) {
    let task = JSON.parse(dataFromLocalStor);
    // console.log(task);
    addEleToPage(task);
  }
}

// remove task from page
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    // console.log(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    // remove task from localStor

    removeTaskLocalStor(e.target.parentElement.getAttribute("data-id"));
  }
});

function removeTaskLocalStor(taskId) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].id);
  }
  arr = arr.filter((e) => e.id != taskId);
  addTaskToLocalStor(arr);
}

