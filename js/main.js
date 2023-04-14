const addButtons = document.querySelectorAll(".addItem");
const cardItems = document.querySelectorAll(".cardItem");
const cards = document.querySelectorAll(".card");
const titleCard = document.querySelectorAll(".titleCard");
const editOptions = document.querySelectorAll("fa-solid", "fa-pen-to-square");

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
    // editar modal
    const h4Text0 = prompt("Qual o título da tarefa?") || "sem título";
    h4.innerText = h4Text0;
    const pText0 = prompt("Qual a tarefa?") || "sem conteúdo";
    p.innerText = pText0;
  });

  const divTaskContentItem = document.createElement("div");
  divTaskContentItem.classList.add("taskContentItem");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  input.addEventListener("change", () => {
    if (input.checked) {
      p.style.textDecoration = "line-through";
      p.style.fontStyle = "italic";
    } else {
      p.style.textDecoration = "none";
      p.style.fontStyle = "normal";
    }
  });

  const p = document.createElement("p");
  p.setAttribute("id", "p-" + index);
  const pTextInner = prompt("Qual a tarefa?") || "sem conteúdo";
  p.innerText = pTextInner;

  let h1Element = cardItems[index].querySelector("h1");

  if (h1Element) {
    cardItems[index].insertBefore(divTask, h1Element.nextSibling);
  } else {
    cardItems[index].insertBefore(divTask, addButtons[index]);
  }

  divTask.appendChild(h4);
  divTask.appendChild(i);
  divTask.appendChild(divTaskContentItem);
  divTaskContentItem.appendChild(input);
  divTaskContentItem.appendChild(p);

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
