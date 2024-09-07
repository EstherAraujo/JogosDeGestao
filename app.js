function obterTemasFormatados(jogo) {
    // Verifica se o jogo possui o atributo "temas" e se é um array
    if (jogo.temas && Array.isArray(jogo.temas)) {
      // Junta os elementos do array "temas" em uma única string, separando por vírgula e espaço
      return jogo.temas.join(', ');
    } else {
      return 'Sem temas informados'; // Retorna uma mensagem padrão caso não haja temas
    }
  };

function obterAvaliacaoMetacritic(jogo) {
    // Verifica se o jogo possui a propriedade "avaliacoes" e se ela possui a propriedade "metacritic"
    if (jogo && jogo.avaliacoes && jogo.avaliacoes.metacritic !== undefined) {
      return jogo.avaliacoes.metacritic;
    } else {
      return 'Avaliação Metacritic não encontrada';
    }
};

function obterAvaliacaoJogadores(jogo) {
    // Verifica se o jogo possui a propriedade "avaliacoes" e se ela possui a propriedade "jogadores"
    if (jogo && jogo.avaliacoes && jogo.avaliacoes.jogadores !== undefined) {
      return jogo.avaliacoes.jogadores;
    } else {
      return 'Avaliação dos Jogadores não encontrada';
    }
};



function pesquisar() {
    // Seleciona a seção onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Obtem o termo pesquisado e o deixa com letras minúsculas
    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    campoPesquisa = campoPesquisa.toLowerCase(); 

    // Observa se o campo pesquisa estiver vazio
    if(!campoPesquisa){
        section.innerHTML = `<p>Busca vazia.</p>`
        return; 
    };   

    // Inicializa uma string vazia para armazenar os resultados, titulo e descricao
    let resultados = '';
    let tit = "";
    let desc = "";
    let tag = "";

    
    // Itera sobre cada dado na lista de dados caso não seja uma string vazia
    for (let dado of dados) {
        // Transforma os títulos e suas descições em strings com letras minúsculas
        tit = dado.titulo.toLowerCase();
        desc = dado.descricao.toLowerCase();
        tag = dado.tags.toLocaleLowerCase();
        // Teste se o termo buscado se encontra dentre os títulos do banco de dados
        if (tit.includes(campoPesquisa) || desc.includes(campoPesquisa) || tag.includes(campoPesquisa)) {
            console.log("busca encontrada!")
            // Cria um um novo elemento no html com os resultados
            resultados += `
            <div class="item-resultado">
                <h2>${dado.titulo}</h2>
                <img src = ${dado.poster} alt="Poster do ${dado.titulo} style="width:200px;height:300px;">
                <p class="descricao-meta">${dado.descricao}</p>
                <p class="descricao-meta"><b>Temas:</b> ${obterTemasFormatados(dado)}</p>
                <p class="descricao-meta"><b>Avaliação no MetaCritic:</b> ${obterAvaliacaoMetacritic(dado)}/100</p>
                <p class="descricao-meta"><b>Avaliação dos Jogadores:</b> ${obterAvaliacaoJogadores(dado)}/10</p>
                <p class="descricao-meta"><b>Desenvolvedor:</b> ${dado.desenvolvedora}</p>
                <p class="descricao-meta"><b>Ano de Lançamento:</b> ${dado.anoLancamento}</p>
                <p class="descricao-meta"><b>Preço Médio:</b> R$ ${dado.precoMedio} - os preços podem variar com o tempo.</p>
                <p class="descricao-meta"><b>Onde Comprar:</b> ${dado.ondeComprar}</p>
                <a href=${dado.linkCompra} target="_blank">Mais informações</a>
            </div>
          `;            
        };      
    };

    if (!resultados) {
        resultados = `
        <p class="descricao-meta">Nenhum jogo foi encontrado.</p>
        `
    }
  
    // Atribui os resultados gerados ao HTML da seção
    section.innerHTML = resultados;
};




