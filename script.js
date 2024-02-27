import downloadJsonConduta from "./downloadJsonConduta.js";

function validateConduta() {
  function validate() {
    if (
      $("#condutaTitulo").val().length > 0 &&
      $("#condutaDescricao").val().length > 0
    ) {
      $("#conteudoConduta .btn-success").removeAttr("disabled");
    } else {
      $("#conteudoConduta .btn-success").attr("disabled", "disabled");
    }
  }
  $("#condutaTitulo").on("change", () => validate());
  $("#condutaDescricao").on("change", () => validate());

  $("#conteudoConduta .btn-success").on("click", () => {
    const titulo = $("#condutaTitulo").val();
    const descricao = $("#condutaDescricao").val();
    let ganhos = [];

    $.each($(".conduta-ganhos"), (index, ganho) => {
      if ($(ganho).val().length > 0) {
        ganhos.push($(ganho).val());
      }
    });

    downloadJsonConduta(titulo, descricao, ganhos);
  });
}

$(document).ready(() => {
  validateConduta();

  $("#selectTipo").on("change", (e) => {
    const gerarConduta = $(e.currentTarget).find("option:selected").val() === "conduta";
    if (gerarConduta) {
      $("#conteudoConduta").removeClass("d-none");
    } else {
      $("main > *:not(header)").addClass("d-none");
    }
  });

  $("#condutaAdicionarGanho").on("click", (e) => {
    $(`
      <div class="d-flex flex-wrap align-items-center">
        <i class="removerGanho bi bi-trash pe-1" style="font-size: 1.5rem; cursor: pointer;"></i>
        <input type="text" class="conduta-ganhos form-control mt-2" style="flex: 1;">
      </div>
    `).insertBefore(e.currentTarget);

    $("#conteudoConduta .removerGanho").on("click", (e) => {
      $(e.currentTarget).off();
      $(e.currentTarget).parent().remove();
    });
  });
});
