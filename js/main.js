const MAX_PANELS = 4;
const PANEL_TITLE = "Título";

const btnAdd = document.querySelector(".plusMore");
const panelBg = document.querySelector(".panelBg");

let panelCount = 0;

const createPanel = (title) => {
  const section = document.createElement("section");
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const div = document.createElement("div");

  section.classList.add("panel");
  h1.innerText = title;
  div.classList.add("sectionContent");
  header.appendChild(h1);
  section.appendChild(header);
  section.appendChild(div);

  return section;
};

const addPanel = () => {
  if (panelCount < MAX_PANELS) {
    const panel = createPanel(PANEL_TITLE);
    panelBg.appendChild(panel);
    panelCount++;
  } else {
    alert("Limite de painéis atingido");
  }
};

btnAdd.addEventListener("click", addPanel);
