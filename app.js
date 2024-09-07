// Função para remover acentos de uma string
function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Função para transformar uma palavra do plural para singular e vice-versa
function gerarVariacoesSingularPlural(palavra) {
    const plural = palavra.endsWith('s') ? palavra : palavra + 's'; // Adiciona 's' se não tiver
    const singular = palavra.endsWith('s') ? palavra.slice(0, -1) : palavra; // Remove 's' se tiver
    return [singular, plural];
}

function pesquisar() {
    try {
        // Captura o valor digitado no campo de texto e remove acentos
        const pesquisa = removerAcentos(document.getElementById('pesquisa').value.trim().toLowerCase());

        // Limpar o resultado anterior
        const listaDeOrixas = document.getElementById('lista-de-orixas');
        listaDeOrixas.innerHTML = '';
        const listaDeEntidades = document.getElementById('lista-de-entidades');
        listaDeEntidades.innerHTML = '';
        const resultadosPesquisa = document.getElementById('resultados-pesquisa');
        resultadosPesquisa.innerHTML = '';

        if (pesquisa === '') {
            resultadosPesquisa.innerHTML = '<p>Por favor, insira um nome ou linha para pesquisar.</p>';
            return;
        }

        // Função auxiliar para verificar se a palavra pesquisada está em um atributo
        function buscaEmAtributos(objeto, atributos) {
            return atributos.some(atributo => {
                const valor = objeto[atributo] ? removerAcentos(objeto[atributo].toString().toLowerCase()) : '';
                return valor.includes(pesquisa);
            });
        }

        // Atributos de pesquisa em Orixás e Entidades
        const atributosOrixa = ['nome', 'descricao', 'cores', 'oferendas', 'dominio', 'caracteristicas'];
        const atributosEntidade = ['linha', 'nomePopular', 'caracteristicas', 'cores', 'dominio', 'habilidades', 'oferendas', 'simbolos', 'historia'];

        // Buscar Orixás que atendem ao critério de busca
        const orixasEncontrados = orixas.filter(orixa => buscaEmAtributos(orixa, atributosOrixa));

        // Buscar Entidades que atendem ao critério de busca
        const entidadesEncontradas = entidades.filter(entidade => buscaEmAtributos(entidade, atributosEntidade));

        // Exibir resultados de Orixás
        if (orixasEncontrados.length > 0) {
            orixasEncontrados.forEach(orixaEncontrado => {
                const novoOrixa = document.createElement('div');
                novoOrixa.classList.add('item-resultado');
                novoOrixa.style.backgroundImage = `url(${orixaEncontrado.imagem})`; // Definir a imagem de fundo
                novoOrixa.classList.add('resultado-orixa');
                novoOrixa.innerHTML = `
                    <div class="orixa">
                        <h2><a href="${orixaEncontrado.link}" target="_blank">${orixaEncontrado.nome}</a></h2>
                        <p>Sincretismo: ${orixaEncontrado.sincretismo}</p>
                        <p>Descrição: ${orixaEncontrado.descricao}</p>
                        <p>Cores: ${orixaEncontrado.cores}</p>
                        <p>Elementos: ${orixaEncontrado.elementos}</p>
                        <p>Domínio: ${orixaEncontrado.dominio}</p>
                        <p>Oferendas: ${orixaEncontrado.oferendas}</p>
                        <p>Características: ${orixaEncontrado.caracteristicas}</p>
                        <a href="${orixaEncontrado.link}" target="_blank">Saiba mais!</a>
                    </div>
                `;
                listaDeOrixas.appendChild(novoOrixa);
            });
        }

        // Exibir resultados de Entidades
        if (entidadesEncontradas.length > 0) {
            entidadesEncontradas.forEach(entidadeEncontrada => {
                const novaEntidade = document.createElement('div');
                novaEntidade.classList.add('item-resultado');
                novaEntidade.style.backgroundImage = `url(${entidadeEncontrada.imagem})`; // Definir a imagem de fundo
                novaEntidade.classList.add('resultado-entidade');
                novaEntidade.innerHTML = `
                    <div class="entidade">
                        <h2><a href="${entidadeEncontrada.link}" target="_blank">${entidadeEncontrada.linha}</a></h2>
                        <p> ${entidadeEncontrada.descricao}</p>
                        <p>Nome Popular: ${entidadeEncontrada.nomePopular}</p>
                        <p>Características: ${entidadeEncontrada.caracteristicas}</p>
                        <p>Cores: ${entidadeEncontrada.cores}</p>
                        <p>Domínio: ${entidadeEncontrada.dominio}</p>
                        <p>Habilidades: ${entidadeEncontrada.habilidades}</p>
                        <p>Manias: ${entidadeEncontrada.manias}</p>
                        <p>Oferendas: ${entidadeEncontrada.oferendas}</p>
                        <p>Simbolos: ${entidadeEncontrada.simbolos}</p>
                        <p>História: ${entidadeEncontrada.historia}</p>
                        <a href="${entidadeEncontrada.link}" target="_blank">Saiba Mais!</a>
                    </div>
                `;
                listaDeEntidades.appendChild(novaEntidade);
            });
        }

        // Mensagem caso nenhum resultado seja encontrado
        if (orixasEncontrados.length === 0 && entidadesEncontradas.length === 0) {
            resultadosPesquisa.innerHTML = '<p>Nenhum resultado encontrado. Tente outro nome ou linha.</p>';
        }
    } catch (error) {
        console.error('Erro ao pesquisar:', error);
        resultadosPesquisa.innerHTML = '<p>Ocorreu um erro ao realizar a pesquisa. Tente novamente.</p>';
    }
}
