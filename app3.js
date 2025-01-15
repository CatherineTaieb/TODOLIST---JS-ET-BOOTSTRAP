const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let taskArray = [];


function saveTasks () {
localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasks () {
  const storedTasks = localStorage.getItem("tasks")
  if (storedTasks) {
  taskArray = JSON.parse(storedTasks);
  displayTasks();
  }
}



function displayTasks() {
  taskList.innerHTML = "";

  for (const myTask of taskArray) {
    const li = document.createElement("li");
    li.className =
      "list-group-item m-2 d-flex align-items-center justify-content-between";
    li.innerHTML = `
        <div class = "divDescription">
        <span>${myTask.description}</span>
        </div> 
          <div>
          <button class="btn btn-success m-2 done">Terminer</button>
          <button class="btn btn-danger m-2 delete ">Supprimer</button>
          </div>
          </span>`;
    taskList.appendChild(li);

    const buttonDone = li.querySelector(".done");
    const divDescription = li.querySelector(".divDescription");

    if (myTask.completed) {
      divDescription.classList.add("text-decoration-line-through");
    }


    buttonDone.addEventListener("click", () => {
      divDescription.classList.toggle("text-decoration-line-through");
      myTask.completed = !myTask.completed;
      saveTasks();
    });

    const buttonDelete = li.querySelector(".delete");
    buttonDelete.addEventListener("click", () => {
      
      // const newTaskArray = [];

      // for (const task of taskArray) {
      //   if (task.id !== myTask.id) {
      //     newTaskArray.push(task);
      //   }
      // }

      // for (let i=0; i<taskArray.length; i++){
      //   if (taskArray[i].id !== myTask.id){
      //     newTaskArray.push(taskArray[i]);
      //   }
      // }
 
      // taskArray = newTaskArray;

      taskArray=taskArray.filter((task)=>task.id !== myTask.id);

      displayTasks();
      saveTasks();
    });
    

  }

}


function addTask(event) {
  event.preventDefault();

  const inputValue = input.value.trim();

  if (inputValue === "") {
    input.classList.add("is-invalid");
    return;
  } else {
    input.classList.remove("is-invalid");
  }

  const myTask = {
    id: Date.now(), // Date.now() => nb de milisec depuis 01/01/1970
    description: inputValue,
    completed: false,
  };

  taskArray.push(myTask); // On push la variable dans le tableau

  displayTasks();

  form.reset();

  saveTasks();

}

form.addEventListener("submit", addTask);


loadTasks();