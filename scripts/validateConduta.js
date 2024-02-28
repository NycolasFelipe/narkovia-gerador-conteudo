import downloadJsonConduta from "../downloadJsonConduta.js";

function validate() {
  if (
    $("#condutaTipo").val().length > 0 &&
    $("#condutaTitulo").val().length > 0 &&
    $("#condutaDescricao").val().length > 0
  ) {
    $("#conteudoConduta .btn-success").removeAttr("disabled");
  } else {
    $("#conteudoConduta .btn-success").attr("disabled", "disabled");
  }
}

function downloadContent() {
  const tipo = $("#condutaTipo").val();
  const titulo = $("#condutaTitulo").val();
  const descricao = $("#condutaDescricao").val();
  let ganhos = [];
  $.each($(".conduta-ganhos"), (index, ganho) => {
    if ($(ganho).val().length > 0) {
      ganhos.push($(ganho).val());
    }
  });
  downloadJsonConduta(tipo, titulo, descricao, ganhos);
}

function addGanho(e) {
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
}

function validadeConduta() {
  $.each(["#condutaTipo", "#condutaTitulo", "#condutaDescricao"], (i, e) => {
    $(e).on("change", () => validate());
  });
  $("#conteudoConduta .btn-success").on("click", () => downloadContent());
  $("#condutaAdicionarGanho").on("click", (e) => addGanho(e));
}

export default validadeConduta;