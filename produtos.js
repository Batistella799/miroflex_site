/**
 * Miroflex - Sistema de Produtos e Categorias
 * Gerencia a renderização de produtos, galeria e categorias
 */

// ==================== DADOS ====================

const produtos = [
  { nome: "MC130", categoria: "Igrejas", semFundo: "MC130-semFundo.png", demo: "MC130-Demo.jpg" },
  { nome: "MG055", categoria: "Igrejas", semFundo: "MG055-semFundo.png", demo: "MG055-Demo.jpg" },
  { nome: "MG079", categoria: "Igrejas", semFundo: "MG079-semFundo.png", demo: "MG079-Demo.jpg" },
  { nome: "MG086", categoria: "Igrejas", semFundo: "MG086-semFundo.png", demo: "MG086-Demo.jpg" },
  { nome: "MG530", categoria: "Igrejas", semFundo: "MG530-semFundo.png", demo: "MG530.jpg" },
  { nome: "MG700", categoria: "Igrejas", semFundo: "MG700-semFundo.png", demo: "MG700-Demo.jpg" },
  { nome: "MG701", categoria: "Igrejas", semFundo: "MG701-semFundo.png", demo: "MG701-Demo.jpg" },
  { nome: "MG800", categoria: "Igrejas", semFundo: "MG800-semFundo.png", demo: "MG800-Demo.jpg" },
  { nome: "MG801", categoria: "Igrejas", semFundo: "MG801-semFundo.png", demo: "MG801-Demo.jpg" },
  { nome: "MG821", categoria: "Igrejas", semFundo: "MG821-semFundo.png", demo: "MG821-Demo.jpg" },
  { nome: "MG950", categoria: "Igrejas", semFundo: "MG950-semFundo.png", demo: "MG950-Demo.jpg" },
  { nome: "MG960", categoria: "Igrejas", semFundo: "MG960-semFundo.png", demo: "MG960.jpg" },
  { nome: "ST083", categoria: "Igrejas", semFundo: "ST083-semFundo.png", demo: "ST083.jpg" },
  { nome: "GB821E", categoria: "Igrejas", semFundo: "GB821E.png", demo: "GB821E-Demo.jpg" }
];

const categoriasFixas = ["Escolares", "Igrejas", "Hotelarias"];

const projetos = [
  { arquivo: "image-principal.jpg", alt: "Projeto principal", principal: true },
  { arquivo: "image_1.jpg", alt: "Projeto 1" },
  { arquivo: "image_2.jpg", alt: "Projeto 2" },
  { arquivo: "image_3.jpg", alt: "Projeto 3" },
  { arquivo: "image_4.jpg", alt: "Projeto 4" },
  { arquivo: "image_5.jpg", alt: "Projeto 5" },
  { arquivo: "image_6.jpg", alt: "Projeto 6" }
];

// ==================== UTILITÁRIOS ====================

/**
 * Retorna produtos filtrados por categoria
 * @param {string} categoria - Nome da categoria
 * @returns {Array} Array de produtos filtrados
 */
function getProdutosPorCategoria(categoria) {
  return produtos.filter(produto => produto.categoria === categoria);
}

/**
 * Cria o HTML de um card de produto
 * @param {Object} produto - Objeto do produto
 * @returns {string} HTML do card
 */
function criarCardProduto(produto) {
  return `
    <div class="par-produto" aria-label="Cadeira ${produto.nome} e sua demonstração">
      <div class="card-simples" aria-label="Cadeira modelo ${produto.nome}">
        <img 
          src="cadeiras_miroflex/${produto.semFundo}" 
          alt="Cadeira modelo ${produto.nome} sem fundo" 
          loading="lazy" 
          decoding="async"
        />
        <h3>Modelo ${produto.nome}</h3>
      </div>
      <div class="seta" aria-hidden="true">➝</div>
      <div class="card-simples" aria-label="Demonstração da cadeira ${produto.nome} em uso">
        <img 
          src="cadeiras_miroflex/${produto.demo}" 
          alt="Cadeira ${produto.nome} em demonstração" 
          loading="lazy" 
          decoding="async"
        />
      </div>
    </div>
  `;
}

/**
 * Cria o HTML de um card de produto para categorias (sem seta)
 * @param {Object} produto - Objeto do produto
 * @returns {string} HTML do card
 */
function criarCardProdutoCategoria(produto) {
  return `
    <div class="par-produto" aria-label="Cadeira ${produto.nome} e sua demonstração">
      <div class="card-simples" aria-label="Cadeira modelo ${produto.nome}">
        <img 
          src="cadeiras_miroflex/${produto.semFundo}" 
          alt="Cadeira modelo ${produto.nome} sem fundo" 
          loading="lazy" 
          decoding="async"
        />
        <h3>Modelo ${produto.nome}</h3>
      </div>
      <div class="card-simples" aria-label="Demonstração da cadeira ${produto.nome} em uso">
        <img 
          src="cadeiras_miroflex/${produto.demo}" 
          alt="Cadeira ${produto.nome} em demonstração" 
          loading="lazy" 
          decoding="async"
        />
      </div>
    </div>
  `;
}

/**
 * Cria o HTML de um item da galeria
 * @param {Object} projeto - Objeto do projeto
 * @returns {string} HTML do item
 */
function criarItemGaleria(projeto) {
  const classe = projeto.principal ? "principal" : "mini";
  return `
    <figure class="item ${classe}">
      <img 
        src="projetos/${projeto.arquivo}" 
        alt="${projeto.alt}" 
        loading="lazy" 
        decoding="async"
      />
    </figure>
  `;
}

// ==================== RENDERIZAÇÃO ====================

/**
 * Renderiza todos os produtos na página principal
 */
function renderProdutos() {
  const container = document.getElementById("lista-produtos");
  if (!container) {
    console.warn("Container de produtos não encontrado");
    return;
  }

  container.innerHTML = produtos.map(criarCardProduto).join("");
}

/**
 * Renderiza a galeria de projetos
 */
function renderGaleriaProjetos() {
  const galeria = document.getElementById("galeria-projetos");
  if (!galeria) {
    console.warn("Galeria de projetos não encontrada");
    return;
  }

  galeria.innerHTML = projetos.map(criarItemGaleria).join("");
}

/**
 * Renderiza produtos de uma categoria específica
 * @param {string} categoria - Nome da categoria
 */
function renderCategoria(categoria) {
  const titulo = document.getElementById("categorias-titulo");
  const lista = document.getElementById("categorias-lista");
  
  if (!titulo || !lista) {
    console.warn("Elementos da categoria não encontrados");
    return;
  }

  titulo.textContent = `Cadeiras ${categoria}`;

  // Categoria Escolares mostra imagem única
  if (categoria === "Escolares") {
    lista.innerHTML = `
      <div class="imagem-categoria-unica">
        <img 
          src="cadeiras_miroflex/cadeiras_escolares.jpg" 
          alt="Catálogo completo de cadeiras escolares Miroflex" 
          loading="lazy" 
          decoding="async"
        />
      </div>
    `;
    return;
  }

  const produtosFiltrados = getProdutosPorCategoria(categoria);

  if (produtosFiltrados.length === 0) {
    if (categoria === "Hotelarias") {
      lista.innerHTML = `
        <div class="mensagem-contato">
          <p class="mensagem-contato__texto">
            Entre em contato conosco para mais informações sobre nossos produtos para hotelaria.
          </p>
          <a 
            href="https://wa.me/5544998462028?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20informa%C3%A7%C3%B5es%20sobre%20produtos%20para%20hotelaria." 
            target="_blank" 
            rel="noopener noreferrer"
            class="mensagem-contato__botao"
          >
            Entrar em Contato via WhatsApp
          </a>
        </div>
      `;
    } else {
      lista.innerHTML = '<p>Nenhum modelo cadastrado nesta categoria.</p>';
    }
    return;
  }

  lista.innerHTML = produtosFiltrados.map(criarCardProdutoCategoria).join("");
}

// ==================== GERENCIAMENTO DE CATEGORIAS ====================

/**
 * Abre o overlay de categorias
 * @param {string} categoriaInicial - Categoria a ser exibida inicialmente
 */
function abrirCategorias(categoriaInicial = "Escolares") {
  const overlay = document.getElementById("categorias-overlay");
  if (!overlay) return;

  overlay.classList.add("aberto");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  ativarBotaoCategoria(categoriaInicial);
  renderCategoria(categoriaInicial);
}

/**
 * Fecha o overlay de categorias
 */
function fecharCategorias() {
  const overlay = document.getElementById("categorias-overlay");
  if (!overlay) return;

  overlay.classList.remove("aberto");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * Ativa o botão da categoria selecionada
 * @param {string} categoria - Nome da categoria
 */
function ativarBotaoCategoria(categoria) {
  document.querySelectorAll(".cat-item").forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.cat === categoria);
  });
}

// ==================== INICIALIZAÇÃO ====================

/**
 * Inicializa todos os eventos e renderizações
 */
function inicializar() {
  // Renderiza conteúdo inicial
  renderGaleriaProjetos();
  renderProdutos();

  // Cache de elementos DOM
  const btnCategorias = document.getElementById("btn-categorias");
  const btnFechar = document.getElementById("btn-fechar-categorias");
  const overlay = document.getElementById("categorias-overlay");
  const botoesCategoria = document.querySelectorAll(".cat-item");

  // Evento: Abrir categorias
  btnCategorias?.addEventListener("click", () => abrirCategorias("Escolares"));

  // Evento: Fechar categorias
  btnFechar?.addEventListener("click", fecharCategorias);

  // Evento: Fechar ao clicar fora
  overlay?.addEventListener("click", (evento) => {
    if (evento.target === overlay) {
      fecharCategorias();
    }
  });

  // Evento: Trocar categoria
  botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.cat;
      
      if (!categoriasFixas.includes(categoria)) {
        console.warn(`Categoria inválida: ${categoria}`);
        return;
      }

      ativarBotaoCategoria(categoria);
      renderCategoria(categoria);
      
      // Scroll suave para o topo
      overlay?.querySelector(".categorias-page")?.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
    });
  });

  // Evento: Fechar com ESC
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && overlay?.classList.contains("aberto")) {
      fecharCategorias();
    }
  });
}

// Aguarda o DOM estar pronto
document.addEventListener("DOMContentLoaded", inicializar);
