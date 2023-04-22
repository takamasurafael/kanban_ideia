const card0 = document.querySelector(".card-0");
const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");

function saveTasks() {
  localStorage.setItem("card0", JSON.stringify(card0.innerHTML));
  localStorage.setItem("card1", JSON.stringify(card1.innerHTML));
  localStorage.setItem("card2", JSON.stringify(card2.innerHTML));
}

function loadTasks() {
  if (localStorage.getItem("card0")) {
    card0.innerHTML = JSON.parse(localStorage.getItem("card0"));
  }
  if (localStorage.getItem("card1")) {
    card1.innerHTML = JSON.parse(localStorage.getItem("card1"));
  }
  if (localStorage.getItem("card2")) {
    card2.innerHTML = JSON.parse(localStorage.getItem("card2"));
  }

  const createDiv = {
    index: 0,
    div() {
      const div = document.createElement("div");
      div.setAttribute("id", `div-${++this.index}`);
      div.classList.add("task");
      return div;
    },
  };

  const createP = {
    index: 0,

    p() {
      const p = document.createElement("p");
      p.setAttribute("id", `p-${++this.index}`);

      const input = document.createElement("input");
      input.type = "text";
      input.name = `input-${this.index}`;
      input.placeholder = "Digite a tarefa aqui";

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          p.innerText = event.target.value;
          saveTasks();
        }
      });

      input.addEventListener("blur", (event) => {
        p.innerText = event.target.value;
        saveTasks();
      });

      p.appendChild(input);

      return p;
    },
  };

  const createI = {
    index: 0,

    i() {
      const i = document.createElement("i");
      i.setAttribute("id", `i-${++this.index}`);
      return i;
    },
  };

  const createInput = {
    index: 0,

    input() {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("id", `input-${++this.index}`);
      return input;
    },
  };

  const addTask = document.querySelectorAll(".addItem");

  addTask.forEach((addTask) => {
    addTask.addEventListener("click", () => {
      const cardSection = addTask.parentElement;

      const newDiv = createDiv.div();
      const newP = createP.p();

      // task Options
      const taskOptions = createDiv.div();
      taskOptions.classList.add("taskOptions");
      taskOptions.classList.remove("task");

      // edit the content
      const taskOptionEdit = createI.i();
      taskOptionEdit.classList.add("fa-solid", "fa-pen");

      // move the task
      const taskOptionMove = createI.i();
      taskOptionMove.classList.add("fa-solid", "fa-up-down-left-right");

      taskOptionMove.addEventListener("click", () => {
        const cardOptions = document.createElement("div");
        cardOptions.classList.add("card-options");
        cardOptions.innerHTML = `
          <p class="card-option" data-card="0">Para fazer</p>
          <p class="card-option" data-card="1">Em andamento</p>
          <p class="card-option" data-card="2">Finalizado</p>
        `;
        const task = taskOptionMove.parentElement.parentElement;
        task.appendChild(cardOptions);
        const cardOptionElements = cardOptions.querySelectorAll(".card-option");
        cardOptionElements.forEach((cardOption) => {
          cardOption.addEventListener("click", () => {
            const cardNumber = cardOption.dataset.card;
            const card = document.querySelector(`.card-${cardNumber}`);
            const taskContent = task.querySelector("p").innerHTML;
            const newTask = createDiv.div();
            const newP = createP.p();

            // task Options
            newP.innerHTML = taskContent;

            newTask.appendChild(newP);
            newP.appendChild(taskOptions);
            taskOptions.appendChild(taskOptionEdit);
            taskOptions.appendChild(taskOptionMove);
            taskOptions.appendChild(taskOptionDelete);

            card.insertBefore(newTask, card.lastElementChild);
            task.remove();
            cardOptions.remove();
            saveTasks();
          });
          saveTasks();
        });
        saveTasks();
      });
      saveTasks();

      // delete the task
      const taskOptionDelete = createI.i();
      taskOptionDelete.classList.add("fa-solid", "fa-delete-left");
      taskOptionDelete.addEventListener("click", removeTask);

      function removeTask() {
        const task = this.parentElement.parentElement;
        task.remove();
        saveTasks();
      }

      cardSection.insertBefore(newDiv, addTask);
      newDiv.appendChild(newP);
      newDiv.appendChild(taskOptions);
      taskOptions.appendChild(taskOptionEdit);
      taskOptions.appendChild(taskOptionMove);
      taskOptions.appendChild(taskOptionDelete);

      const input = newP.querySelector("input");
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          newP.innerText = event.target.value;
          saveTasks();
        }
      });

      input.addEventListener("blur", (event) => {
        newP.innerText = event.target.value;
        saveTasks();
      });
    });
  });
}

loadTasks();
