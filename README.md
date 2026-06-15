# Didatica em construcao

Site academico interativo desenvolvido para a disciplina de Didatica.

O projeto apresenta uma materia sobre Inteligencia Artificial na sala de aula, com imagem interativa, pontos explicativos, podcast do grupo e mural de comentarios da turma.

## Comentarios

O mural de comentarios funciona em modo local quando `comentarios-config.js` esta sem endpoint.

Para comentarios compartilhados:

1. Crie uma planilha no Google Sheets.
2. Abra Extensoes > Apps Script.
3. Cole o conteudo de `comentarios-apps-script.gs`.
4. Implante como aplicativo da Web, executando como voce e permitindo acesso para qualquer pessoa.
5. Copie a URL do aplicativo da Web.
6. Cole essa URL em `comentarios-config.js`.

## Limpar o mural antes da apresentacao

Para deixar o mural limpo, mas com um comentario de teste:

1. Abra a planilha usada pelos comentarios.
2. Va em Extensoes > Apps Script.
3. Atualize o codigo com a versao mais recente de `comentarios-apps-script.gs`.
4. No seletor de funcoes, escolha `limparMuralParaApresentacao`.
5. Clique em Executar.

Para apagar todos os comentarios sem deixar comentario de teste, execute a funcao `limparMuralCompleto`.

Essas funcoes nao ficam expostas no site. Elas so podem ser executadas dentro do Apps Script, evitando que alguem da turma apague o mural sem querer.
