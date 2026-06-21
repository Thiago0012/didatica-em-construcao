# Didática em construção

Site acadêmico interativo desenvolvido para a disciplina de Didática.

O projeto apresenta uma matéria sobre Inteligência Artificial na sala de aula, com imagem interativa, pontos explicativos, podcast do grupo e mural de comentários da turma.

## Comentários

O mural de comentários funciona em modo local quando `comentarios-config.js` está sem endpoint.

Para comentários compartilhados:

1. Crie uma planilha no Google Sheets.
2. Abra Extensões > Apps Script.
3. Cole o conteúdo de `comentarios-apps-script.gs`.
4. Implante como aplicativo da Web, executando como você e permitindo acesso para qualquer pessoa.
5. Copie a URL do aplicativo da Web.
6. Cole essa URL em `comentarios-config.js`.

## Limpar o mural antes da apresentação

Para deixar o mural limpo, mas com um comentário de teste:

1. Abra a planilha usada pelos comentários.
2. Vá em Extensões > Apps Script.
3. Atualize o código com a versão mais recente de `comentarios-apps-script.gs`.
4. No seletor de funções, escolha `limparMuralParaApresentacao`.
5. Clique em Executar.

Para apagar todos os comentários sem deixar comentário de teste, execute a função `limparMuralCompleto`.

Essas funções não ficam expostas no site. Elas só podem ser executadas dentro do Apps Script, evitando que alguém da turma apague o mural sem querer.
