$(document).ready(function () {
  const $btnAddTask = $(".btn-addTask");
  const $backlog = $(".backlog");

  // Carrega a lista salva no localStorage na inicialização da página
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    $backlog.html(savedTasks);
  }

  $btnAddTask.click(function () {
    const $inputAdd = $("#input-add");
    const $newTask = $("<p>");
    const $taskText = $("<span>").text($inputAdd.val());
    const $btnEdit = $("<button>").text("Editar");
    const $btnDelete = $("<button>").text("Excluir");
    const $btnMove = $("<button>").text("Mover");
    // Função do botão "Editar"
    $btnEdit.click(function () {
      const $newInput = $("<input>").attr("type", "text").val($taskText.text());
      $taskText.replaceWith($newInput);
      $newInput.focus();

      $newInput.blur(function () {
        const $newText = $newInput.val();
        $newInput.replaceWith($taskText.text($newText));
        // Salva a lista atualizada no localStorage
        localStorage.setItem("tasks", $backlog.html());
      });
    });

    // Função do botão "Excluir"
    $btnDelete.click(function () {
      $newTask.remove();
      // Salva a lista atualizada no localStorage
      localStorage.setItem("tasks", $backlog.html());
    });

    // Função do botão "Mover"
    $btnMove.click(function () {
      const $inProgress = $(".in-progress");
      const $done = $(".done");

      if ($newTask.parent().is($backlog)) {
        $inProgress.append($newTask);
      } else if ($newTask.parent().is($inProgress)) {
        $done.append($newTask);
      } else if ($newTask.parent().is($done)) {
        $backlog.append($newTask);
      }
      // Salva a lista atualizada no localStorage
      localStorage.setItem("tasks", $backlog.html());
    });

    $newTask.append($taskText, $btnEdit, $btnDelete, $btnMove);
    $backlog.append($newTask);

    $inputAdd.val("");
    // Salva a lista atualizada no localStorage
    localStorage.setItem("tasks", $backlog.html());
  });
});
