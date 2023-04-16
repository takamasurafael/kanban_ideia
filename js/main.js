const addButtons = document.querySelectorAll(".addItem");
const cardItems = document.querySelectorAll(".cardItem");
const cards = document.querySelectorAll(".card");
const titleCard = document.querySelectorAll(".titleCard");
const editOptions = document.querySelectorAll("fa-solid", "fa-pen-to-square");
const addTaskItem = document.querySelectorAll(".addTaskItem");

let tasks = [];

/* cria uma nova tarefa */
const addTask = (index) => {
  const divTask = document.createElement("div");
  divTask.classList.add("task");
  divTask.setAttribute("draggable", true); //atributo para arrastar
  divTask.setAttribute("id", "task-" + index); // identificador para arrastar e soltar

  const h4 = document.createElement("h4");
  h4.setAttribute("id", "h4-" + index);
  const h4Text = prompt("Digite o título da tarefa:") || "Tarefa sem título";
  h4.innerText = h4Text;

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-pen-to-square");
  i.addEventListener("click", () => {
    const h4Text0 = prompt("Qual o título da tarefa?") || "sem título";
    h4.innerText = h4Text0;
  });

  const divTaskContentItem = document.createElement("div");
  divTaskContentItem.classList.add("taskContentItem");

  const span = document.createElement("span");
  span.classList.add("addTaskItem");

  const iPlusAddTaskItem = document.createElement("i");
  iPlusAddTaskItem.classList.add("fa-solid", "fa-plus");

  iPlusAddTaskItem.addEventListener("click", () => {
    const divBoxTask = document.createElement("div");
    divBoxTask.classList.add("divBoxTask");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("id", "input-" + index);

    const p = document.createElement("p");
    p.setAttribute("id", "p-" + index);
    const pText0 = p ? prompt("Qual a tarefa?") : "sem texto";
    p.innerText = pText0;

    divTask.appendChild(divTaskContentItem);
    divTaskContentItem.appendChild(divBoxTask);
    divBoxTask.appendChild(input);
    divBoxTask.appendChild(p);

    input.addEventListener("change", () => {
      if (input.checked) {
        p.style.textDecoration = "line-through";
        p.style.fontStyle = "italic";
      } else {
        p.style.textDecoration = "none";
        p.style.fontStyle = "normal";
      }
    });
  });

  let h1Element = cardItems[index].querySelector("h1");

  if (h1Element) {
    cardItems[index].insertBefore(divTask, h1Element.nextSibling);
  } else {
    cardItems[index].insertBefore(divTask, addButtons[index]);
  }

  divTask.appendChild(h4);
  divTask.appendChild(i);
  divTask.appendChild(divTaskContentItem);
  divTask.appendChild(span);
  span.appendChild(iPlusAddTaskItem);

  divTask.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
};

/* adiciona a nova tarefa dentro do quadro escolhido */
addButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    addTask(index);
  });
});

cards.forEach((card) => {
  card.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  card.addEventListener("drop", (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);
    const cardContent = event.target.closest(".card");
    const cardItem = cardContent.querySelector(".cardItem");

    cardItem.insertBefore(task, cardItem.querySelector(".addItem"));
  });
});
