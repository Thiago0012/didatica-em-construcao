const dadosAulas = {};
let aulaSelecionada = null;
let hideTooltipTimer = null;

const telas = {
    inicial: document.getElementById("tela-inicial"),
    aulas: document.getElementById("tela-aulas"),
    reflexao: document.getElementById("tela-reflexao"),
    conteudo: document.getElementById("tela-conteudo"),
    dossie: document.getElementById("tela-dossie")
};

const refs = {
    textoReflexao: document.getElementById("texto-reflexao"),
    containerBotao: document.getElementById("container-btn-prosseguir"),
    containerDinamico: document.getElementById("container-dinamico"),
    listaPontosMobile: document.getElementById("lista-pontos-mobile"),
    imagemAula: document.getElementById("img-aula"),
    tagAulaAtual: document.getElementById("tag-aula-atual"),
    tituloAula: document.getElementById("titulo-aula"),
    resumoAula: document.getElementById("resumo-aula"),
    tituloPainel: document.getElementById("titulo-painel"),
    descricaoPainel: document.getElementById("descricao-painel"),
    botaoVideosAula: document.getElementById("btn-videos-aula"),
    textoAjudaInteracao: document.getElementById("texto-ajuda-interacao"),
    tooltipCard: document.getElementById("tooltip-card"),
    tooltipTag: document.getElementById("tooltip-tag"),
    tooltipTitulo: document.getElementById("tooltip-titulo"),
    tooltipTexto: document.getElementById("tooltip-texto"),
    tooltipBotao: document.getElementById("tooltip-botao"),
    mobileSheetOverlay: document.getElementById("mobile-sheet-overlay"),
    mobilePointSheet: document.getElementById("mobile-point-sheet"),
    mobileSheetFechar: document.getElementById("mobile-sheet-fechar"),
    mobileSheetTag: document.getElementById("mobile-sheet-tag"),
    mobileSheetTitulo: document.getElementById("mobile-sheet-titulo"),
    mobileSheetTexto: document.getElementById("mobile-sheet-texto"),
    mobileSheetBotao: document.getElementById("mobile-sheet-botao"),
    dossieKicker: document.getElementById("dossie-kicker"),
    dossieTag: document.getElementById("dossie-tag"),
    dossieTitulo: document.getElementById("dossie-titulo"),
    dossieResumo: document.getElementById("dossie-resumo"),
    dossieMeta: document.getElementById("dossie-meta"),
    dossieCapa: document.getElementById("dossie-capa"),
    dossieDestaque: document.getElementById("dossie-destaque"),
    dossieContexto: document.getElementById("dossie-contexto"),
    dossieArtigo: document.getElementById("dossie-artigo"),
    dossieTopicos: document.getElementById("dossie-topicos")
};

let digitacaoTimeout = null;
let digitacaoExecucaoId = 0;
let destaqueDossieTimeout = null;
const CHAVE_TOTAL_AULAS_RASCUNHO = "didatica-total-aulas-podcast-ia";
const TEXTO_MATERIA_AULA_1 = Array.isArray(window.CONTEUDO_AULA_1)
    ? window.CONTEUDO_AULA_1
    : [];

inicializarModoPodcastRascunho();

function usaInterfaceToque() {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function inicializarModoPodcastRascunho() {
    const totalSalvo = Number(window.localStorage.getItem(CHAVE_TOTAL_AULAS_RASCUNHO));
    const totalAulas = Number.isFinite(totalSalvo) && totalSalvo > 0 ? totalSalvo : 1;

    Object.keys(dadosAulas).forEach((numero) => {
        delete dadosAulas[numero];
    });

    dadosAulas[1] = criarAulaPrincipal();

    for (let numero = 2; numero <= totalAulas; numero += 1) {
        dadosAulas[numero] = criarAulaRascunho(numero);
    }

    renderizarListaAulasRascunho();
}

function textoAula1(indice, fallback = "") {
    return TEXTO_MATERIA_AULA_1[indice] || fallback;
}

function criarAulaPrincipal() {
    const perguntaGuia =
        "A Inteligência Artificial é uma aliada, uma ameaça ou apenas um espelho da educação que escolhemos construir?";

    return {
        titulo: "Aula 01",
        subtitulo: "Inteligência Artificial na Sala de Aula",
        statusCard: "matéria pronta",
        pergunta: perguntaGuia,
        imagem: "aula1-didatica-ia.png",
        resumo: textoAula1(
            1,
            "Um material de apoio ao podcast sobre Inteligência Artificial, Didática e prática docente."
        ),
        descricaoPainel:
            "A imagem apresenta sete pontos para explorar como a Inteligência Artificial atravessa planejamento, mediação, avaliação, acesso e humanização do ensino.",
        pontos: [
            {
                id: "planejamento-docente",
                numero: "1",
                titulo: "Planejamento Docente com Apoio da IA",
                info:
                    "A IA pode acelerar o planejamento, mas as decisões pedagógicas continuam sendo responsabilidade do professor.",
                detalhe:
                    "A IA pode acelerar o planejamento, mas as decisões pedagógicas continuam sendo responsabilidade do professor.",
                top: "16%",
                left: "17%"
            },
            {
                id: "saber-experiencia",
                numero: "2",
                titulo: "O Saber da Experiência e a Humanização do Ensino",
                info:
                    "Nenhum algoritmo percebe emoções, inseguranças e necessidades dos estudantes como um professor atento.",
                detalhe:
                    "Nenhum algoritmo percebe emoções, inseguranças e necessidades dos estudantes como um professor atento.",
                top: "15%",
                left: "78%"
            },
            {
                id: "ia-mediacao-conhecimento",
                numero: "3",
                titulo: "IA como Ferramenta de Mediação do Conhecimento",
                info:
                    "A tecnologia ganha sentido pedagógico quando está a serviço da aprendizagem e da mediação humana.",
                detalhe:
                    "A tecnologia ganha sentido pedagógico quando está a serviço da aprendizagem e da mediação humana.",
                top: "44%",
                left: "51%"
            },
            {
                id: "aprendizagem-colaboracao",
                numero: "4",
                titulo: "Aprendizagem Ativa e Colaboração",
                info:
                    "Aprender não é apenas receber informações, mas construir conhecimento por meio da ação e da colaboração.",
                detalhe:
                    "Aprender não é apenas receber informações, mas construir conhecimento por meio da ação e da colaboração.",
                top: "48%",
                left: "18%"
            },
            {
                id: "avaliacao-formativa",
                numero: "5",
                titulo: "Avaliação Formativa na Era da IA",
                info:
                    "Dados ajudam, mas a avaliação precisa considerar trajetórias, contextos e desenvolvimento humano.",
                detalhe:
                    "Dados ajudam, mas a avaliação precisa considerar trajetórias, contextos e desenvolvimento humano.",
                top: "48%",
                left: "80%"
            },
            {
                id: "desigualdade-digital",
                numero: "6",
                titulo: "Desigualdade Digital e Acesso à Tecnologia",
                info:
                    "Nem todos os estudantes têm as mesmas condições de acesso às tecnologias educacionais.",
                detalhe:
                    "Nem todos os estudantes têm as mesmas condições de acesso às tecnologias educacionais.",
                top: "78%",
                left: "19%"
            },
            {
                id: "educacao-humanizada",
                numero: "7",
                titulo: "Educação Humanizada e Construção Coletiva do Conhecimento",
                info:
                    "A transformação da educação nasce do diálogo, da escuta e da participação dos sujeitos no processo de aprendizagem.",
                detalhe:
                    "A transformação da educação nasce do diálogo, da escuta e da participação dos sujeitos no processo de aprendizagem.",
                top: "78%",
                left: "72%"
            }
        ],
        dossie: {
            kicker: "Matéria especial",
            tituloCompleto: textoAula1(0, "Inteligência Artificial na Sala de Aula"),
            introducaoTitulo: "Abertura da matéria",
            meta: [
                "PEC2000 — Didática | Portfólio em grupo | UFRN, 2026",
                "Imagem interativa",
                "Podcast do grupo"
            ],
            destaque: perguntaGuia,
            contexto: textoAula1(
                1,
                "Um material de apoio ao podcast sobre Inteligência Artificial, Didática e prática docente."
            ),
            podcast: {
                titulo: "Podcast da aula",
                subtitulo: "Espaço reservado para o áudio do grupo",
                descricao:
                    "Quando o episódio estiver pronto, ele será inserido aqui como uma escuta complementar à matéria.",
                capitulos: [
                    "Abertura do tema",
                    "Debate entre pontos de vista",
                    "Relação com a Didática",
                    "Fechamento reflexivo"
                ]
            },
            introducao: TEXTO_MATERIA_AULA_1.slice(3, 6),
            secoes: [
                {
                    id: "ia-fenomeno-social",
                    titulo: textoAula1(6),
                    paragrafos: [
                        textoAula1(7),
                        textoAula1(8),
                        { id: "desigualdade-digital", texto: textoAula1(9) },
                        textoAula1(10)
                    ]
                },
                {
                    id: "bastidores-podcast",
                    titulo: textoAula1(11),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(12, 16)
                },
                {
                    id: "planejamento-docente",
                    titulo: textoAula1(16),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(17, 21)
                },
                {
                    id: "saber-experiencia",
                    titulo: textoAula1(21),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(22, 26)
                },
                {
                    id: "tecnologia-tendencias",
                    titulo: textoAula1(26),
                    paragrafos: [
                        textoAula1(27),
                        textoAula1(28),
                        { id: "aprendizagem-colaboracao", texto: textoAula1(29) },
                        { id: "ia-mediacao-conhecimento", texto: textoAula1(30) },
                        textoAula1(31)
                    ]
                },
                {
                    id: "avaliacao-formativa",
                    titulo: textoAula1(32),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(33, 37)
                },
                {
                    id: "educacao-humanizada",
                    titulo: textoAula1(37),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(38, 42)
                },
                {
                    id: "fechamento",
                    titulo: textoAula1(42),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(43, 47),
                    classeExtra: "materia-reflexao"
                }
            ],
            extras: [
                {
                    id: "referencias",
                    titulo: textoAula1(47),
                    paragrafos: TEXTO_MATERIA_AULA_1.slice(48),
                    classeExtra: "materia-referencias"
                }
            ]
        }
    };
}

function criarAulaRascunho(numero) {
    const numeroFormatado = String(numero).padStart(2, "0");
    const titulo = `Aula ${numeroFormatado}`;

    return {
        titulo,
        subtitulo: "Rascunho vazio",
        pergunta: `O que vamos construir na ${titulo}?`,
        imagem: "aula-placeholder.svg",
        resumo:
            "Este espaço está em branco para receber o texto, a imagem e as ideias centrais que você trouxer depois.",
        descricaoPainel:
            "Quando o conteúdo estiver pronto, a gente organiza esta aula com imagem interativa, pontos de explicação e leitura em formato de matéria.",
        pontos: [],
        dossie: {
            kicker: "Espaço de escrita",
            tituloCompleto: `${titulo} — conteúdo a definir`,
            introducaoTitulo: "Rascunho da aula",
            meta: ["Texto pendente", "Imagem pendente", "Podcast opcional"],
            destaque:
                "Este é só o lugar reservado para a aula. O conteúdo definitivo será colocado quando você enviar o material.",
            contexto:
                "A estrutura fica pronta, mas sem os textos antigos das aulas 1, 2 e 3.",
            introducao: [
                "Aqui ficará a abertura da aula, no estilo de matéria explicativa. Quando você trouxer o texto, eu substituo este rascunho pelo conteúdo real."
            ],
            secoes: [],
            extras: []
        }
    };
}

function adicionarAulaRascunho() {
    const proximoNumero = Object.keys(dadosAulas).length + 1;
    dadosAulas[proximoNumero] = criarAulaRascunho(proximoNumero);
    window.localStorage.setItem(CHAVE_TOTAL_AULAS_RASCUNHO, String(proximoNumero));
    renderizarListaAulasRascunho();
}

function removerAulaRascunho(numero, event) {
    event.stopPropagation();

    if (numero === 1 || dadosAulas[numero]?.statusCard) {
        return;
    }

    const totalAtual = Object.keys(dadosAulas).length;

    for (let atual = numero; atual < totalAtual; atual += 1) {
        dadosAulas[atual] = criarAulaRascunho(atual);
    }

    delete dadosAulas[totalAtual];

    const novoTotal = Math.max(1, totalAtual - 1);
    window.localStorage.setItem(CHAVE_TOTAL_AULAS_RASCUNHO, String(novoTotal));
    renderizarListaAulasRascunho();
}

function renderizarListaAulasRascunho() {
    const lista = document.getElementById("lista-aulas");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    Object.keys(dadosAulas)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((numero) => {
            const aula = dadosAulas[numero];
            const card = document.createElement("div");
            card.className = `aula-card-frame ${aula.statusCard ? "is-pronta" : "is-vazia"}`;

            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "btn-aula btn-aula-rascunho";
            botao.setAttribute("aria-label", `Abrir ${aula.titulo}`);
            botao.innerHTML = `
                <span class="aula-card-label">${aula.titulo}</span>
            `;
            botao.addEventListener("click", () => abrirAula(numero));
            card.appendChild(botao);

            if (numero !== 1 && !aula.statusCard) {
                const remover = document.createElement("button");
                remover.type = "button";
                remover.className = "btn-remover-aula";
                remover.setAttribute("aria-label", `Apagar ${aula.titulo} vazia`);
                remover.textContent = "×";
                remover.addEventListener("click", (event) => removerAulaRascunho(numero, event));
                card.appendChild(remover);
            }

            lista.appendChild(card);
        });
}

function mostrarTela(nomeTela) {
    Object.values(telas).forEach((tela) => {
        tela.hidden = true;
        tela.classList.remove("tela-ativa");
    });

    const telaAtual = telas[nomeTela];
    telaAtual.hidden = false;
    void telaAtual.offsetWidth;
    telaAtual.classList.add("tela-ativa");
    window.scrollTo(0, 0);
}

function irParaAulas() {
    mostrarTela("aulas");
}

function mostrarGuiaInicial() {
    const guia = document.getElementById("guia-inicial");
    const botao = document.getElementById("btn-entender-projeto");

    if (guia) {
        guia.hidden = false;
        botao?.setAttribute("aria-expanded", "true");

        window.requestAnimationFrame(() => {
            const topoAlvo = guia.getBoundingClientRect().top + window.scrollY - 16;
            window.scrollTo({
                top: Math.max(topoAlvo, 0),
                behavior: "smooth",
            });
        });
    }
}

function interromperDigitacao() {
    digitacaoExecucaoId += 1;

    if (digitacaoTimeout) {
        window.clearTimeout(digitacaoTimeout);
        digitacaoTimeout = null;
    }
}

function limparDestaqueDossie() {
    if (destaqueDossieTimeout) {
        window.clearTimeout(destaqueDossieTimeout);
        destaqueDossieTimeout = null;
    }

    document
        .querySelectorAll(".materia-bloco.is-highlighted, .materia-bloco p.is-highlighted")
        .forEach((bloco) => bloco.classList.remove("is-highlighted"));
}

function voltarInicio() {
    interromperDigitacao();
    mostrarTela("inicial");
}

function voltarParaMenu() {
    interromperDigitacao();
    esconderTooltip();
    fecharResumoMobile();
    limparDestaqueDossie();
    mostrarTela("aulas");
}

function abrirAula(numero) {
    interromperDigitacao();
    aulaSelecionada = numero;
    esconderTooltip();
    limparDestaqueDossie();
    mostrarTela("reflexao");

    const textoCompleto = dadosAulas[numero].pergunta;
    refs.textoReflexao.innerHTML = "";
    refs.containerBotao.style.opacity = "0";

    let indice = 0;
    const execucaoAtual = digitacaoExecucaoId;

    function digitar() {
        if (execucaoAtual !== digitacaoExecucaoId) {
            return;
        }

        if (indice < textoCompleto.length) {
            refs.textoReflexao.innerHTML =
                textoCompleto.substring(0, indice + 1) + '<span class="cursor"></span>';
            indice += 1;
            digitacaoTimeout = window.setTimeout(digitar, 38);
        } else {
            digitacaoTimeout = null;
            refs.textoReflexao.textContent = textoCompleto;
            refs.containerBotao.style.opacity = "1";
        }
    }

    digitar();
}

function mostrarConteudoAula() {
    interromperDigitacao();
    const aula = dadosAulas[aulaSelecionada];
    const videosAula = aula.dossie.videos || [];

    refs.tagAulaAtual.textContent = aula.subtitulo;
    refs.tituloAula.textContent = aula.titulo;
    refs.resumoAula.textContent = aula.resumo;
    refs.tituloPainel.textContent = `${aula.titulo} em destaque`;
    refs.descricaoPainel.textContent = aula.descricaoPainel;
    refs.imagemAula.src = aula.imagem;
    refs.imagemAula.alt = `Resumo visual da ${aula.titulo}`;
    refs.botaoVideosAula.hidden = videosAula.length === 0;
    refs.textoAjudaInteracao.innerHTML = usaInterfaceToque()
        ? 'Toque nos símbolos de <strong>+</strong> ou use a lista "Pontos da imagem" para abrir um resumo. Depois toque em "Saber mais" para ir direto ao trecho da matéria.'
        : 'Passe o mouse sobre os símbolos de <strong>+</strong> para ver um resumo rápido. Clique em qualquer ponto interativo ou no botão "Saber mais" para abrir a leitura completa da aula.';

    if (videosAula.length > 0) {
        refs.botaoVideosAula.textContent = `Ver vídeos da ${aula.titulo}`;
    }

    refs.containerDinamico
        .querySelectorAll(".ponto-interativo")
        .forEach((ponto) => ponto.remove());

    renderizarListaPontosMobile(aula);

    aula.pontos.forEach((ponto) => {
        const botaoPonto = document.createElement("button");
        botaoPonto.type = "button";
        botaoPonto.className = "ponto-interativo";
        botaoPonto.style.top = ponto.top;
        botaoPonto.style.left = ponto.left;
        botaoPonto.setAttribute(
            "aria-label",
            `Ponto ${ponto.numero || ""} ${ponto.titulo}. Abrir detalhe.`
                .replace(/\s+/g, " ")
                .trim()
        );
        botaoPonto.innerHTML = '<span>+</span><span class="label-hover">Saber mais</span>';

        botaoPonto.addEventListener("mouseenter", () => {
            if (!usaInterfaceToque()) {
                mostrarTooltip(ponto, botaoPonto);
            }
        });
        botaoPonto.addEventListener("focus", () => {
            if (!usaInterfaceToque()) {
                mostrarTooltip(ponto, botaoPonto);
            }
        });
        botaoPonto.addEventListener("mouseleave", agendarEsconderTooltip);
        botaoPonto.addEventListener("blur", agendarEsconderTooltip);
        botaoPonto.addEventListener("click", (event) => {
            if (usaInterfaceToque()) {
                event.preventDefault();
                abrirResumoMobile(ponto);
                return;
            }

            abrirDetalhePonto(ponto.id);
        });

        refs.containerDinamico.appendChild(botaoPonto);
    });

    mostrarTela("conteudo");
}

function renderizarListaPontosMobile(aula) {
    if (!refs.listaPontosMobile) {
        return;
    }

    refs.listaPontosMobile.innerHTML = "";

    if (!aula.pontos || aula.pontos.length === 0) {
        refs.listaPontosMobile.hidden = true;
        return;
    }

    refs.listaPontosMobile.hidden = false;

    const cabecalho = document.createElement("div");
    cabecalho.className = "lista-pontos-mobile-cabecalho";

    const titulo = document.createElement("h3");
    titulo.textContent = "Pontos da imagem";
    cabecalho.appendChild(titulo);

    const ajuda = document.createElement("p");
    ajuda.textContent =
        "No celular, toque em um ponto abaixo ou no símbolo + da imagem para abrir o resumo.";
    cabecalho.appendChild(ajuda);

    const grid = document.createElement("div");
    grid.className = "lista-pontos-mobile-grid";

    aula.pontos.forEach((ponto) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "mobile-ponto-card";
        botao.innerHTML = `
            <span>${ponto.numero}</span>
            <strong>${ponto.titulo}</strong>
        `;
        botao.addEventListener("click", () => abrirResumoMobile(ponto));
        grid.appendChild(botao);
    });

    refs.listaPontosMobile.appendChild(cabecalho);
    refs.listaPontosMobile.appendChild(grid);
}

function abrirVideosAula() {
    const aula = dadosAulas[aulaSelecionada];

    if (!aula || !aula.dossie.videos || aula.dossie.videos.length === 0) {
        return;
    }

    abrirDossieCompleto("videos-complementares");
}

function mostrarTooltip(ponto, elemento) {
    window.clearTimeout(hideTooltipTimer);

    refs.tooltipTag.textContent = ponto.numero
        ? `${dadosAulas[aulaSelecionada].titulo} - Ponto ${ponto.numero}`
        : dadosAulas[aulaSelecionada].titulo;
    refs.tooltipTitulo.textContent = ponto.titulo;
    refs.tooltipTexto.textContent = ponto.info;
    refs.tooltipBotao.onclick = () => abrirDetalhePonto(ponto.id);
    refs.tooltipCard.hidden = false;

    posicionarTooltip(elemento);
}

function posicionarTooltip(elemento) {
    const rect = elemento.getBoundingClientRect();
    const card = refs.tooltipCard;
    const larguraJanela = window.innerWidth;
    const margem = 18;
    let left = rect.left + rect.width / 2;
    let top = rect.top - 18;

    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
    card.style.transform = "translate(-50%, -100%)";

    const cardRect = card.getBoundingClientRect();

    if (cardRect.left < margem) {
        left = margem + cardRect.width / 2;
    }

    if (cardRect.right > larguraJanela - margem) {
        left = larguraJanela - margem - cardRect.width / 2;
    }

    if (cardRect.top < margem) {
        top = rect.bottom + 18;
        card.style.transform = "translate(-50%, 0)";
    } else {
        card.style.transform = "translate(-50%, -100%)";
    }

    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
}

function agendarEsconderTooltip() {
    hideTooltipTimer = window.setTimeout(() => {
        if (!refs.tooltipCard.matches(":hover")) {
            esconderTooltip();
        }
    }, 140);
}

function esconderTooltip() {
    window.clearTimeout(hideTooltipTimer);
    refs.tooltipCard.hidden = true;
}

function abrirResumoMobile(ponto) {
    if (!refs.mobilePointSheet) {
        abrirDetalhePonto(ponto.id);
        return;
    }

    esconderTooltip();
    refs.mobileSheetTag.textContent = ponto.numero
        ? `${dadosAulas[aulaSelecionada].titulo} - Ponto ${ponto.numero}`
        : dadosAulas[aulaSelecionada].titulo;
    refs.mobileSheetTitulo.textContent = ponto.titulo;
    refs.mobileSheetTexto.textContent = ponto.info;
    refs.mobileSheetBotao.onclick = () => {
        fecharResumoMobile();
        abrirDetalhePonto(ponto.id);
    };

    refs.mobileSheetOverlay.hidden = false;
    refs.mobilePointSheet.hidden = false;
    document.body.classList.add("mobile-sheet-aberto");
}

function fecharResumoMobile() {
    if (!refs.mobilePointSheet) {
        return;
    }

    refs.mobileSheetOverlay.hidden = true;
    refs.mobilePointSheet.hidden = true;
    document.body.classList.remove("mobile-sheet-aberto");
}

function abrirDetalhePonto(idSecao) {
    abrirDossieCompleto(idSecao);
}

function abrirDossieCompleto(secaoInicialId = null) {
    const aula = dadosAulas[aulaSelecionada];

    if (!aula) {
        return;
    }

    refs.dossieTag.textContent = aula.titulo;
    refs.dossieKicker.textContent = aula.dossie.kicker || "Leitura em formato de matéria";
    refs.dossieTitulo.textContent =
        aula.dossie.tituloCompleto || `${aula.titulo}: ${aula.subtitulo}`;
    refs.dossieResumo.textContent = aula.resumo;
    refs.dossieCapa.src = aula.imagem;
    refs.dossieCapa.alt = `Imagem principal da ${aula.titulo}`;
    refs.dossieDestaque.textContent = aula.dossie.destaque || aula.pergunta;
    refs.dossieContexto.textContent = aula.dossie.contexto || aula.descricaoPainel;

    refs.dossieMeta.innerHTML = "";
    (aula.dossie.meta || [
        "Leitura interpretativa",
        "Imagem interativa",
        `${aula.dossie.secoes.length} seções principais`
    ]).forEach((item) => {
        const chip = document.createElement("span");
        chip.textContent = item;
        refs.dossieMeta.appendChild(chip);
    });

    refs.dossieArtigo.innerHTML = "";
    refs.dossieTopicos.innerHTML = "";
    fecharResumoMobile();

    const tituloPanorama = aula.dossie.introducaoTitulo || "Panorama da aula";

    refs.dossieArtigo.appendChild(
        criarBlocoMateria({
            id: "panorama",
            titulo: tituloPanorama,
            paragrafos: aula.dossie.introducao,
            abertura: true
        })
    );

    refs.dossieTopicos.appendChild(criarTopicoDossie(tituloPanorama, "materia-panorama"));

    aula.dossie.secoes.forEach((secao) => {
        const pontoRelacionado = aula.pontos.find((ponto) => ponto.id === secao.id);
        refs.dossieArtigo.appendChild(
            criarBlocoMateria({
                id: secao.id,
                titulo: secao.titulo,
                paragrafos: secao.paragrafos,
                subsecoes: secao.subsecoes || [],
                resumoRapido: pontoRelacionado ? pontoRelacionado.detalhe : "",
                numero: pontoRelacionado ? pontoRelacionado.numero : "",
                classeExtra: secao.classeExtra || ""
            })
        );

        refs.dossieTopicos.appendChild(
            criarTopicoDossie(secao.titulo, `materia-${secao.id}`)
        );
    });

    if (aula.dossie.videos && aula.dossie.videos.length > 0) {
        refs.dossieArtigo.appendChild(
            criarBlocoVideos({
                id: "videos-complementares",
                titulo: "Vídeos para aprofundar a aula",
                descricao: `Se você quiser ampliar a compreensão da ${aula.titulo}, estes vídeos funcionam como apoio visual e teórico. Você pode assistir aqui mesmo no site ou abrir diretamente no YouTube.`,
                videos: aula.dossie.videos
            })
        );

        refs.dossieTopicos.appendChild(
            criarTopicoDossie("Vídeos complementares", "materia-videos-complementares")
        );
    }

    if (aula.dossie.podcast) {
        refs.dossieArtigo.appendChild(criarBlocoPodcast(aula.dossie.podcast));
        refs.dossieTopicos.appendChild(
            criarTopicoDossie(aula.dossie.podcast.titulo, "materia-podcast-aula")
        );
    }

    (aula.dossie.extras || []).forEach((blocoExtra) => {
        refs.dossieArtigo.appendChild(
            criarBlocoMateria({
                id: blocoExtra.id,
                titulo: blocoExtra.titulo,
                paragrafos: blocoExtra.paragrafos,
                classeExtra: blocoExtra.classeExtra || ""
            })
        );

        refs.dossieTopicos.appendChild(
            criarTopicoDossie(blocoExtra.titulo, `materia-${blocoExtra.id}`)
        );
    });

    esconderTooltip();
    limparDestaqueDossie();
    mostrarTela("dossie");

    if (secaoInicialId) {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                rolarParaSecaoDossie(`materia-${secaoInicialId}`);
            });
        });
    }
}

function criarBlocoMateria({
    id,
    titulo,
    paragrafos,
    subsecoes = [],
    resumoRapido = "",
    abertura = false,
    numero = "",
    classeExtra = ""
}) {
    const bloco = document.createElement("section");
    bloco.className = abertura ? "materia-bloco materia-abertura" : "materia-bloco";
    bloco.id = `materia-${id}`;

    if (classeExtra) {
        bloco.classList.add(classeExtra);
    }

    if (numero) {
        const selo = document.createElement("span");
        selo.className = "materia-indice";
        selo.textContent = `Ponto ${numero}`;
        bloco.appendChild(selo);
    }

    const tituloEl = document.createElement(abertura ? "h2" : "h3");
    tituloEl.textContent = titulo;
    bloco.appendChild(tituloEl);

    if (resumoRapido) {
        const resumo = document.createElement("div");
        resumo.className = "materia-resumo-rapido";

        const resumoTitulo = document.createElement("h4");
        resumoTitulo.textContent = "Resumo rápido";
        resumo.appendChild(resumoTitulo);

        const resumoTexto = document.createElement("p");
        resumoTexto.textContent = resumoRapido;
        resumo.appendChild(resumoTexto);

        bloco.appendChild(resumo);
    }

    paragrafos.forEach((item) => {
        const texto = typeof item === "string" ? item : item.texto;
        const paragrafo = document.createElement("p");
        if (typeof item === "object" && item.id) {
            paragrafo.id = `materia-${item.id}`;
        }
        paragrafo.textContent = texto;
        bloco.appendChild(paragrafo);
    });

    subsecoes.forEach((subsecao) => {
        const subsecaoEl = document.createElement("div");
        subsecaoEl.className = "materia-subsecao";

        const subtitulo = document.createElement("h4");
        subtitulo.textContent = subsecao.titulo;
        subsecaoEl.appendChild(subtitulo);

        subsecao.paragrafos.forEach((item) => {
            const texto = typeof item === "string" ? item : item.texto;
            const paragrafo = document.createElement("p");
            if (typeof item === "object" && item.id) {
                paragrafo.id = `materia-${item.id}`;
            }
            paragrafo.textContent = texto;
            subsecaoEl.appendChild(paragrafo);
        });

        bloco.appendChild(subsecaoEl);
    });

    return bloco;
}

function criarBlocoPodcast(podcast) {
    const bloco = document.createElement("section");
    bloco.className = "materia-bloco materia-podcast";
    bloco.id = "materia-podcast-aula";

    const selo = document.createElement("span");
    selo.className = "materia-indice";
    selo.textContent = "Podcast";
    bloco.appendChild(selo);

    const titulo = document.createElement("h3");
    titulo.textContent = podcast.titulo;
    bloco.appendChild(titulo);

    const descricao = document.createElement("p");
    descricao.textContent = podcast.descricao;
    bloco.appendChild(descricao);

    const player = document.createElement("div");
    player.className = "podcast-player-card podcast-player-materia";

    const play = document.createElement("button");
    play.type = "button";
    play.className = "podcast-play";
    play.disabled = true;
    play.setAttribute("aria-label", "Áudio ainda em preparação");
    play.textContent = "▶";
    player.appendChild(play);

    const copy = document.createElement("div");
    copy.className = "podcast-player-copy";

    const subtitulo = document.createElement("strong");
    subtitulo.textContent = podcast.subtitulo;
    copy.appendChild(subtitulo);

    const status = document.createElement("span");
    status.textContent = "O arquivo de áudio poderá ser conectado aqui depois da gravação.";
    copy.appendChild(status);
    player.appendChild(copy);

    const onda = document.createElement("div");
    onda.className = "podcast-wave";
    onda.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 8; i += 1) {
        onda.appendChild(document.createElement("span"));
    }

    player.appendChild(onda);
    bloco.appendChild(player);

    if (podcast.capitulos && podcast.capitulos.length > 0) {
        const capitulos = document.createElement("div");
        capitulos.className = "podcast-capitulos podcast-capitulos-materia";

        podcast.capitulos.forEach((capitulo) => {
            const item = document.createElement("span");
            item.textContent = capitulo;
            capitulos.appendChild(item);
        });

        bloco.appendChild(capitulos);
    }

    return bloco;
}

function criarBlocoVideos({ id, titulo, descricao, videos }) {
    const bloco = document.createElement("section");
    bloco.className = "materia-bloco materia-videos";
    bloco.id = `materia-${id}`;

    const tituloEl = document.createElement("h3");
    tituloEl.textContent = titulo;
    bloco.appendChild(tituloEl);

    const descricaoEl = document.createElement("p");
    descricaoEl.textContent = descricao;
    bloco.appendChild(descricaoEl);

    const grid = document.createElement("div");
    grid.className = "video-grid";

    videos.forEach((video) => {
        const card = document.createElement("article");
        card.className = "video-card";

        const frame = document.createElement("div");
        frame.className = "video-embed";

        const placeholder = criarPlaceholderVideo(video, frame);
        frame.appendChild(placeholder);

        const copy = document.createElement("div");
        copy.className = "video-copy";

        const fonte = document.createElement("span");
        fonte.className = "video-fonte";
        fonte.textContent = video.fonte;
        copy.appendChild(fonte);

        const cardTitulo = document.createElement("h4");
        cardTitulo.textContent = video.titulo;
        copy.appendChild(cardTitulo);

        const cardDescricao = document.createElement("p");
        cardDescricao.textContent = video.descricao;
        copy.appendChild(cardDescricao);

        if (video.topicos && video.topicos.length > 0) {
            const topicos = document.createElement("div");
            topicos.className = "video-topicos";

            video.topicos.forEach((topico) => {
                const tag = document.createElement("span");
                tag.className = "video-topico-tag";
                tag.textContent = topico;
                topicos.appendChild(tag);
            });

            copy.appendChild(topicos);
        }

        const acoes = document.createElement("div");
        acoes.className = "video-acoes";

        const link = document.createElement("a");
        link.className = "btn-link-video";
        link.href = video.youtubeUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Abrir no YouTube";
        acoes.appendChild(link);

        copy.appendChild(acoes);
        card.appendChild(frame);
        card.appendChild(copy);
        grid.appendChild(card);
    });

    bloco.appendChild(grid);
    return bloco;
}

function criarPlaceholderVideo(video, frame) {
    const placeholder = document.createElement("button");
    placeholder.type = "button";
    placeholder.className = "video-placeholder";
    placeholder.setAttribute("aria-label", `Assistir ${video.titulo} aqui no site`);

    const thumbnailUrl = obterThumbnailVideo(video);
    placeholder.style.backgroundImage = `linear-gradient(135deg, rgba(7, 15, 27, 0.2), rgba(7, 15, 27, 0.76)), url("${thumbnailUrl}")`;

    const conteudo = document.createElement("span");
    conteudo.className = "video-placeholder-copy";

    const play = document.createElement("span");
    play.className = "video-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    conteudo.appendChild(play);

    const chamada = document.createElement("span");
    chamada.className = "video-placeholder-titulo";
    chamada.textContent = "Assistir aqui no site";
    conteudo.appendChild(chamada);

    const dica = document.createElement("span");
    dica.className = "video-placeholder-dica";
    dica.textContent = "O player carrega só quando você clicar";
    conteudo.appendChild(dica);

    placeholder.appendChild(conteudo);
    placeholder.addEventListener("click", () => carregarPlayerVideo(frame, video));

    return placeholder;
}

function carregarPlayerVideo(frame, video) {
    if (window.location.protocol === "file:") {
        frame.replaceChildren(criarAvisoVideoLocal(video));
        frame.classList.add("video-embed--aviso");
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = montarUrlPlayer(video);
    iframe.title = video.titulo;
    iframe.loading = "eager";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    frame.classList.add("is-playing");
    frame.replaceChildren(iframe);
}

function criarAvisoVideoLocal(video) {
    const aviso = document.createElement("div");
    aviso.className = "video-aviso-local";

    const titulo = document.createElement("strong");
    titulo.textContent = "O YouTube bloqueou o player nesta abertura local";
    aviso.appendChild(titulo);

    const texto = document.createElement("span");
    texto.textContent =
        "Para assistir incorporado, abra o projeto por um servidor local ou pela hospedagem do site. O link abaixo continua funcionando normalmente.";
    aviso.appendChild(texto);

    const link = document.createElement("a");
    link.href = video.youtubeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Abrir no YouTube";
    aviso.appendChild(link);

    return aviso;
}

function montarUrlPlayer(video) {
    const url = new URL(video.embedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");

    if (window.location.origin && window.location.origin !== "null") {
        url.searchParams.set("origin", window.location.origin);
    }

    return url.toString();
}

function obterThumbnailVideo(video) {
    if (video.thumbnailUrl) {
        return video.thumbnailUrl;
    }

    return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
}

function criarTopicoDossie(titulo, destinoId) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "dossie-topico-btn";
    botao.textContent = titulo;
    botao.addEventListener("click", () => rolarParaSecaoDossie(destinoId));
    return botao;
}

function rolarParaSecaoDossie(destinoId) {
    const alvo = document.getElementById(destinoId);

    if (!alvo) {
        return;
    }

    limparDestaqueDossie();
    alvo.classList.add("is-highlighted");
    const topoAlvo = alvo.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({
        top: Math.max(topoAlvo, 0),
        behavior: "smooth",
    });

    destaqueDossieTimeout = window.setTimeout(() => {
        alvo.classList.remove("is-highlighted");
        destaqueDossieTimeout = null;
    }, 1800);
}

function voltarDoDossie() {
    limparDestaqueDossie();
    mostrarTela("conteudo");
}

refs.tooltipCard.addEventListener("mouseenter", () => {
    window.clearTimeout(hideTooltipTimer);
});

refs.tooltipCard.addEventListener("mouseleave", agendarEsconderTooltip);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        esconderTooltip();
        fecharResumoMobile();

        if (!telas.dossie.hidden) {
            voltarDoDossie();
        }
    }
});

window.addEventListener("resize", esconderTooltip);
refs.mobileSheetOverlay?.addEventListener("click", fecharResumoMobile);
refs.mobileSheetFechar?.addEventListener("click", fecharResumoMobile);

window.addEventListener(
    "scroll",
    () => {
        esconderTooltip();
    },
    { passive: true }
);

refs.imagemAula.addEventListener("click", function capturarCoordenadas(event) {
    if (telas.conteudo.hidden) {
        return;
    }

    const rect = this.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    console.log(`Coordenada capturada -> Top: ${y.toFixed(2)}%, Left: ${x.toFixed(2)}%`);
});

