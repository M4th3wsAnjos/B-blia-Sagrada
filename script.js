// Elementos do DOM
const livroSelect = document.getElementById('livroSelect');
const capituloSelect = document.getElementById('capituloSelect');
const textoBiblico = document.getElementById('textoBiblico');
const toggleTema = document.getElementById('toggleTema'); // Botão de alternância

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
    const capituloSelecionado = capituloSelect.value;

    if (livroSelecionado && capituloSelecionado) {
        carregarVersiculos(livroSelecionado, capituloSelecionado);
    }
});

// Carregar capítulos para o livro selecionado
function carregarCapitulos(livro) {
    capituloSelect.innerHTML = '<option value="">Escolha um Capítulo</option>'; // Resetar capítulos

    const numeroDeCapitulos = obterNumeroDeCapitulos(livro);

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

// Carregar versículos da API
function carregarVersiculos(livro, capitulo) {
    const apiUrl = `https://bible-api.com/${livro}+${capitulo}?translation=almeida`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            textoBiblico.innerHTML = ''; // Limpar o conteúdo anterior
            const versiculos = data.verses;

            versiculos.forEach(versiculo => {
                let p = document.createElement('p');
                p.classList.add('versiculo');
                p.textContent = `${versiculo.verse}. ${versiculo.text}`;
                
                // Verificar se o modo escuro está ativado e aplicar a classe 'dark-mode'
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

// Alternar entre modo claro e modo escuro
toggleTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('select, .versiculo, #conteudo, label, #toggleTema').forEach(element => {
        element.classList.toggle('dark-mode');
    });
});

// Carregar os livros ao carregar a página
carregarLivros();
