const NOME_ABA = "comentarios";

function doGet(e) {
  const params = e.parameter || {};
  const callback = limparCallback(params.callback);
  const action = params.action || "list";

  try {
    const sheet = obterAba();

    if (action === "add") {
      const comentario = salvarComentario(sheet, params);
      return responder(callback, { ok: true, comentario });
    }

    return responder(callback, {
      ok: true,
      comentarios: listarComentarios(sheet, params.aula || "1")
    });
  } catch (erro) {
    return responder(callback, {
      ok: false,
      erro: erro.message || "Erro ao processar comentario."
    });
  }
}

function obterAba() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(NOME_ABA);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(NOME_ABA);
    sheet.appendRow(["data", "aula", "nome", "mensagem"]);
  }

  return sheet;
}

function salvarComentario(sheet, params) {
  const aula = limparTexto(params.aula || "1", 12);
  const nome = limparTexto(params.nome, 40);
  const mensagem = limparTexto(params.mensagem, 420);

  if (!nome || !mensagem) {
    throw new Error("Nome e mensagem sao obrigatorios.");
  }

  const data = new Date();
  sheet.appendRow([data.toISOString(), aula, nome, mensagem]);

  return {
    data: data.toISOString(),
    aula,
    nome,
    mensagem
  };
}

function listarComentarios(sheet, aula) {
  const valores = sheet.getDataRange().getValues().slice(1);
  const aulaAtual = limparTexto(aula || "1", 12);

  return valores
    .filter((linha) => String(linha[1]) === aulaAtual)
    .slice(-40)
    .map((linha) => ({
      data: linha[0],
      aula: linha[1],
      nome: linha[2],
      mensagem: linha[3]
    }));
}

function limparTexto(valor, limite) {
  return String(valor || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limite);
}

function limparCallback(callback) {
  const nome = String(callback || "callback");
  return /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(nome) ? nome : "callback";
}

function responder(callback, dados) {
  return ContentService
    .createTextOutput(`${callback}(${JSON.stringify(dados)})`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
