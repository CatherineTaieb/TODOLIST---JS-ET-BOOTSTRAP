const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const taskArray = []; //Créer un tableau vide qui stockera toutes les tâches que l'utilisateur ont créés

/* 
Créer une fonction pour afficher les tâches

  Réinitialiser la liste des taches affichées
  Parcourir le tableau des tâches
    pour chaque élément : Créer un élement de liste (li)
    Si la tâche est terminée, Rayer la tâche

    Définir le contenu de la tâche contenant la description, et les boutons terminer et supprimer

    Ajouter un écouteur d'evenement sur chaque bouton qui executeront leur fonction associée

    Ajouter l'element de liste à la liste des tâches

*/

function displayTasks() {
  taskList.innerHTML = "";

  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-group-item m-2";
    li.innerHTML = `${task.description} 
        <button class="btn btn-success m-2 done">Terminer</button>
        <button class="btn btn-danger m-2 delete ">Supprimer</button>`;
    taskList.appendChild(li);


    const buttonDone=li.querySelectorAll(".done")
    for (let i=0;i<buttonDone.length;i++){
    const buttonActuel = buttonDone[i];
  
    buttonActuel.addEventListener("click", ()=> {
      li.classList.toggle("text-decoration-line-through");
    })
    }
  });
}

/* Autre manière de faire : 
      for (let task of taskArray) {
        const li = document.createElement("li");
        li.className = "list-group-item m-2"
        li.innerHTML = `${task.description} 
          <button class="btn btn-success m-2 done">Terminer</button>
          <button class="btn btn-danger m-2 delete ">Supprimer</button>`;
        taskList.appendChild(li);
  } */




/* 
  Créer une fonction pour basculer le statut "completed" d'une tâche
    elle prendra en parametre l'id de l'objet tache ciblé
*/






/* 
  Créer une fonction pour supprimer une tache
    elle prendra en parametre l'id de l'objet tache ciblé
*/

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
}

form.addEventListener("submit", addTask);
