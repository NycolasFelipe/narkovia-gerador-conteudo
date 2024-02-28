import validateConduta from "./scripts/validateConduta.js";

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
});
