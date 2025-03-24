const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Definir o diretório onde os arquivos .txt estão armazenados
const directoryPath = path.join(__dirname, 'txt_files'); // Substitua pelo caminho correto

// Cookie de autenticação (exemplo)
const cookie = "abtest-identifier=237063cb5b53d6175c282df626d055dd"; // Substitua pelo cookie correto

// Função para gerar os links de download a partir do arquivo .txt
function gerarLinks(arquivo_txt) {
  const filePath = path.join(directoryPath, arquivo_txt);
  const links = fs.readFileSync(filePath, 'utf-8').split('\n').map(link => link.trim()).filter(Boolean);
  return links;
}

// Função para gerar o comando para download no PS3
function gerarComandoPS3(url) {
  // Gerar o comando do PS3 com base no link do arquivo
  return `http://localhost/popup.ps3/Iniciando%20Download!;/wait.ps3?3;/xmb.ps3/download.ps3?to=/dev_hdd0/PS3ISO&url=${encodeURIComponent(url)}`;
}

// Rota para exibir a seleção de letras
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Selecione a Letra do Arquivo</h1>
        <ul>
          <li><a href="/downloads/A">A</a></li>
          <li><a href="/downloads/B">B</a></li>
          <li><a href="/downloads/C">C</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Rota para exibir os arquivos da letra selecionada
app.get('/downloads/:letra', (req, res) => {
  const letra = req.params.letra.toUpperCase();
  let arquivo_txt;

  // Mapear a letra para o nome do arquivo .txt correspondente
  switch (letra) {
    case 'A':
      arquivo_txt = 'A_PART1_ISO.txt';
      break;
    case 'B':
      arquivo_txt = 'B_PART1_ISO.txt';
      break;
    case 'C':
      arquivo_txt = 'C_PART1_ISO.txt';
      break;
    default:
      return res.send("Letra não encontrada.");
  }

  // Gerar os links a partir do arquivo .txt
  const links_array = gerarLinks(arquivo_txt);

  // Exibir os links para download
  let htmlContent = `<h1>Arquivos Disponíveis - Letra ${letra}</h1><ul>`;
  links_array.forEach(link => {
    const comando_ps3 = gerarComandoPS3(link);
    const nome_arquivo = path.basename(link);  // Pega o nome do arquivo para exibição
    htmlContent += `<li><a href="${comando_ps3}" target="_blank">${nome_arquivo}</a></li>`;
  });
  htmlContent += "</ul>";

  // Enviar o conteúdo para o navegador
  res.send(htmlContent);
});

// Rota para iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
