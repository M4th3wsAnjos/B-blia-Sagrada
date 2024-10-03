// Elementos do DOM
const livroSelect = document.getElementById('livroSelect');
const capituloSelect = document.getElementById('capituloSelect');
const textoBiblico = document.getElementById('textoBiblico');
const toggleTema = document.getElementById('toggleTema');
const iconeTema = document.getElementById('iconeTema');
const fonteEstilo = document.getElementById('fonteEstilo');
const tamanhoFonte = document.getElementById('tamanhoFonte'); // Dropdown para o tamanho da fonte
const corMarcacao = document.getElementById('corMarcacao'); // Seletor de cor
const marcarTextoBtn = document.getElementById('marcarTexto'); // Botão para marcar o texto
const setaAnterior = document.getElementById('setaAnterior');
const setaProximo = document.getElementById('setaProximo');

let numeroDeCapitulos = 0;
let capituloAtual = 1;

// Lista completa de livros da Bíblia em português
const livrosBiblia = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
    'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
    '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas',
    'Esdras', 'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios',
    'Eclesiastes', 'Cânticos', 'Isaías', 'Jeremias',
    'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel',
    'Amós', 'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque',
    'Sofonias', 'Ageu', 'Zacarias', 'Malaquias', 'Mateus',
    'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios',
    '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses',
    'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
    '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus',
    'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João',
    'Judas', 'Apocalipse'
];

// Função para marcar o texto selecionado com a cor escolhida, com ajustes para o modo noturno
function marcarTextoSelecionado(cor) {
    const selecao = window.getSelection();
    if (selecao.rangeCount > 0) {
        const range = selecao.getRangeAt(0);
        const span = document.createElement('span');
        
        // Verificar se o modo noturno está ativo
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Ajustar cores de marcação no modo noturno para garantir legibilidade
        if (isDarkMode) {
            if (cor === 'yellow') {
                span.style.backgroundColor = '#ffd700'; // Amarelo mais forte no modo noturno
                span.style.color = '#000'; // Texto preto para contraste
            } else if (cor === 'green') {
                span.style.backgroundColor = '#32cd32'; // Verde claro
                span.style.color = '#000'; // Texto preto para contraste
            } else if (cor === 'blue') {
                span.style.backgroundColor = '#87cefa'; // Azul claro
                span.style.color = '#000'; // Texto preto para contraste
            } else if (cor === 'pink') {
                span.style.backgroundColor = '#ff69b4'; // Rosa claro
                span.style.color = '#000'; // Texto preto para contraste
            } else if (cor === 'orange') {
                span.style.backgroundColor = '#ff8c00'; // Laranja claro
                span.style.color = '#000'; // Texto preto para contraste
            }
        } else {
            // Cores padrão no modo claro
            span.style.backgroundColor = cor;
            span.style.color = ''; // Sem alteração na cor do texto
        }
        
        range.surroundContents(span);
        selecao.removeAllRanges(); // Desmarcar após marcar
    }
}

// Evento para o botão de marcar texto
marcarTextoBtn.addEventListener('click', () => {
    const corSelecionada = corMarcacao.value;
    marcarTextoSelecionado(corSelecionada);
});

// Carregar livros no select
function carregarLivros() {
    livrosBiblia.forEach(livro => {
        let option = document.createElement('option');
        option.value = livro;
        option.textContent = livro;
        livroSelect.appendChild(option);
    });
}

// Função para carregar capítulos com base no livro selecionado
livroSelect.addEventListener('change', () => {
    const livroSelecionado = livroSelect.value;
    if (livroSelecionado) {
        carregarCapitulos(livroSelecionado);
    }
});

// Função para carregar versículos quando o capítulo é selecionado
capituloSelect.addEventListener('change', () => {
    const livroSelecionado = livroSelect.value;
    const capituloSelecionado = parseInt(capituloSelect.value);

    if (livroSelecionado && capituloSelecionado) {
        capituloAtual = capituloSelecionado;
        carregarVersiculos(livroSelecionado, capituloAtual);
    }
    atualizarSetas();
});

// Carregar capítulos para o livro selecionado
function carregarCapitulos(livro) {
    capituloSelect.innerHTML = '<option value="">Escolha um Capítulo</option>';

    numeroDeCapitulos = obterNumeroDeCapitulos(livro);

    if (numeroDeCapitulos === 0) {
        capituloSelect.disabled = true;
        textoBiblico.innerHTML = '<p>Não há capítulos disponíveis para o livro selecionado.</p>';
        return;
    }

    capituloSelect.disabled = false;

    for (let i = 1; i <= numeroDeCapitulos; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = `Capítulo ${i}`;
        capituloSelect.appendChild(option);
    }
}

// Função para atualizar a visibilidade e a posição das setas de navegação
function atualizarSetas() {
    const totalCapitulos = numeroDeCapitulos;

    if (capituloAtual === 1) {
        // No primeiro capítulo, mostrar apenas a seta para o próximo capítulo à direita
        setaAnterior.style.display = 'none'; // Esconder seta anterior
        setaProximo.style.display = 'block'; // Mostrar seta próximo
        setaProximo.style.right = '10px'; // Colocar a seta próximo no lado direito
        setaProximo.style.left = ''; // Remover qualquer ajuste à esquerda
    } else if (capituloAtual === totalCapitulos) {
        // No último capítulo, mostrar apenas a seta para o capítulo anterior à esquerda
        setaProximo.style.display = 'none'; // Esconder seta próximo
        setaAnterior.style.display = 'block'; // Mostrar seta anterior
        setaAnterior.style.left = '10px'; // Colocar a seta anterior no lado esquerdo
        setaAnterior.style.right = ''; // Remover qualquer ajuste à direita
    } else {
        // Nos capítulos intermediários, mostrar ambas as setas
        setaAnterior.style.display = 'block'; // Mostrar seta anterior
        setaAnterior.style.left = '10px'; // Colocar a seta anterior no lado esquerdo
        setaProximo.style.display = 'block'; // Mostrar seta próximo
        setaProximo.style.right = '10px'; // Colocar a seta próximo no lado direito
    }
}

// Função para carregar versículos da API
function carregarVersiculos(livro, capitulo) {
    const apiUrl = `https://bible-api.com/${livro}+${capitulo}?translation=almeida`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            textoBiblico.innerHTML = '';
            const versiculos = data.verses;

            versiculos.forEach(versiculo => {
                let p = document.createElement('p');
                p.classList.add('versiculo');
                p.textContent = `${versiculo.verse}. ${versiculo.text}`;

                // Aplicar o estilo de fonte e tamanho atual ao carregar os versículos
                aplicarEstiloFonte(p);

                if (document.body.classList.contains('dark-mode')) {
                    p.classList.add('dark-mode');
                }

                textoBiblico.appendChild(p);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar versículos:', error);
            textoBiblico.innerHTML = 'Erro ao carregar os versículos. Tente novamente mais tarde.';
        });
}

// Função para aplicar o estilo de fonte e tamanho atual
function aplicarEstiloFonte(elemento) {
    const fonteSelecionada = fonteEstilo.value;
    const tamanhoSelecionado = tamanhoFonte.value;
    elemento.style.fontFamily = fonteSelecionada;
    elemento.style.fontSize = `${tamanhoSelecionado}px`;
}

// Alterar fonte e tamanho nos versículos já carregados
fonteEstilo.addEventListener('change', () => {
    const versiculos = document.querySelectorAll('.versiculo');
    versiculos.forEach(aplicarEstiloFonte); // Aplica o estilo para todos os versículos exibidos
});

tamanhoFonte.addEventListener('change', () => {
    const versiculos = document.querySelectorAll('.versiculo');
    versiculos.forEach(aplicarEstiloFonte); // Aplica o tamanho para todos os versículos exibidos
});

// Alternar entre modo claro e modo escuro e mudar o ícone
toggleTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('select, .versiculo, #conteudo, label, #toggleTema').forEach(element => {
        element.classList.toggle('dark-mode');
    });

    if (document.body.classList.contains('dark-mode')) {
        iconeTema.classList.replace('fa-moon', 'fa-sun');
    } else {
        iconeTema.classList.replace('fa-sun', 'fa-moon');
    }

    // Atualizar todas as cores dos versículos imediatamente ao alternar o tema
    const versiculos = document.querySelectorAll('.versiculo');
    versiculos.forEach(versiculo => {
        if (document.body.classList.contains('dark-mode')) {
            versiculo.classList.add('dark-mode');
        } else {
            versiculo.classList.remove('dark-mode');
        }
    });
});

// Navegar para o próximo capítulo
setaProximo.addEventListener('click', () => {
    if (capituloAtual < numeroDeCapitulos) {
        capituloAtual++;
        capituloSelect.value = capituloAtual;
        carregarVersiculos(livroSelect.value, capituloAtual);
        atualizarSetas();
    }
});

// Navegar para o capítulo anterior
setaAnterior.addEventListener('click', () => {
    if (capituloAtual > 1) {
        capituloAtual--;
        capituloSelect.value = capituloAtual;
        carregarVersiculos(livroSelect.value, capituloAtual);
        atualizarSetas();
    }
});

// Retornar o número de capítulos com base no livro selecionado
function obterNumeroDeCapitulos(livro) {
    const capitulosPorLivro = {
        Gênesis: 50,
        Êxodo: 40,
        Levítico: 27,
        Números: 36,
        Deuteronômio: 34,
        Josué: 24,
        Juízes: 21,
        Rute: 4,
        '1 Samuel': 31,
        '2 Samuel': 24,
        '1 Reis': 22,
        '2 Reis': 25,
        '1 Crônicas': 29,
        '2 Crônicas': 36,
        Esdras: 10,
        Neemias: 13,
        Ester: 10,
        Jó: 42,
        Salmos: 150,
        Provérbios: 31,
        Eclesiastes: 12,
        Cânticos: 8,
        Isaías: 66,
        Jeremias: 52,
        Lamentações: 5,
        Ezequiel: 48,
        Daniel: 12,
        Oséias: 14,
        Joel: 3,
        Amós: 9,
        Obadias: 1,
        Jonas: 4,
        Miquéias: 7,
        Naum: 3,
        Habacuque: 3,
        Sofonias: 3,
        Ageu: 2,
        Zacarias: 14,
        Malaquias: 4,
        Mateus: 28,
        Marcos: 16,
        Lucas: 24,
        João: 21,
        Atos: 28,
        Romanos: 16,
        '1 Coríntios': 16,
        '2 Coríntios': 13,
        Gálatas: 6,
        Efésios: 6,
        Filipenses: 4,
        Colossenses: 4,
        '1 Tessalonicenses': 5,
        '2 Tessalonicenses': 3,
        '1 Timóteo': 6,
        '2 Timóteo': 4,
        Tito: 3,
        Filemom: 1,
        Hebreus: 13,
        Tiago: 5,
        '1 Pedro': 5,
        '2 Pedro': 3,
        '1 João': 5,
        '2 João': 1,
        '3 João': 1,
        Judas: 1,
        Apocalipse: 22
    };

    return capitulosPorLivro[livro] || 0;
}

// Carregar os livros ao carregar a página
carregarLivros();
