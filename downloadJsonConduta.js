import removeDiacritics from "./removeDiacritics.js";

function downloadJsonConduta(tipo, titulo, descricao, ganhos) {
  //Build a JSON array containing Customer records.
  let id = removeDiacritics(titulo).toLowerCase().replaceAll(" ", "-").replaceAll("_", "-");
  let conduta = {
    id: id,
    tipo: removeDiacritics(tipo).toLowerCase(),
    titulo: titulo,
    descricao: descricao.replaceAll("\n", " "),
    ganhos: ganhos
  }

  //Convert JSON Array to string.
  let json = JSON.stringify(conduta);

  //Convert JSON string to BLOB.
  json = [json];
  let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

  //Check the Browser.
  let isIE = false || !!document.documentMode;
  if (isIE) {
    window.navigator.msSaveBlob(blob1, `conduta-${id}`);
  } else {
    let url = window.URL || window.webkitURL;
    let link = url.createObjectURL(blob1);
    let a = $("<a />");
    a.attr("download", `conduta-${id}.json`);
    a.attr("href", link);
    $("body").append(a);
    a[0].click();
    $("body").remove(a);
  }

}

export default downloadJsonConduta;