import type { Text } from '../i18n'

export type Project = {
  id: string
  name: string
  date: string
  when: Text
  summary: Text
  tech: string[]
  repo?: string
  live?: string
  media: string
  mediaAlt: Text
  note?: Text
  color: string
  ring?: boolean
}

const gh = (repo: string) => `https://github.com/guilhermevaladares7/${repo}`

export const projects: Project[] = [
  {
    id: 'filmes',
    name: 'Site de filmes',
    date: '2026-05',
    when: { pt: 'mai 2026', en: 'May 2026' },
    summary: {
      pt: 'Catálogo de filmes de ação com uma página de detalhes para cada título. Foi o meu primeiro site com várias páginas e JavaScript cuidando do conteúdo.',
      en: 'An action movie catalog with a details page for each title. My first multi-page website with JavaScript driving the content.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: gh('trabalho-site-de-filmes'),
    media: 'projetos/filmes.gif',
    mediaAlt: { pt: 'Página inicial do site de filmes rolando', en: 'Movie website home page scrolling' },
    color: '#ffc94d',
  },
  {
    id: 'api-produto',
    name: 'API de Produtos',
    date: '2026-08',
    when: { pt: 'ago 2026', en: 'Aug 2026' },
    summary: {
      pt: 'API REST com as cinco operações de um produto: listar, buscar, criar, alterar e excluir. Tem validação, códigos de status certos e uma coleção do Postman para testar.',
      en: 'A REST API with the five product operations: list, fetch, create, update and delete. It has validation, proper status codes and a Postman collection for testing.',
    },
    tech: ['Node.js', 'Express', 'REST', 'Postman'],
    repo: gh('api-produto'),
    media: 'projetos/api-produto.gif',
    mediaAlt: { pt: 'Respostas da API de produtos no navegador', en: 'Product API responses in the browser' },
    color: '#8fd0ff',
  },
  {
    id: 'hospitalar',
    name: 'Sistema de Informação Hospitalar',
    date: '2026-10',
    when: { pt: 'out 2026', en: 'Oct 2026' },
    summary: {
      pt: 'Trabalho de Programação Modular, em dupla. Gerencia pacientes, profissionais, consultas, emergências, cirurgias, internações, quartos e o histórico médico de um hospital.',
      en: 'A Modular Programming course project, built in a pair. It manages patients, staff, appointments, emergencies, surgeries, admissions, rooms and medical history for a hospital.',
    },
    tech: ['Java 21', 'Spring Boot', 'MySQL', 'H2', 'JUnit 5'],
    repo: gh('sistema-hospitalar'),
    media: 'projetos/hospitalar.gif',
    mediaAlt: { pt: 'Endpoints do sistema hospitalar respondendo', en: 'Hospital system endpoints responding' },
    color: '#ff8a8a',
    ring: true,
  },
  {
    id: 'biofarma',
    name: 'Biofarma',
    date: '2026-10',
    when: { pt: 'out 2026', en: 'Oct 2026' },
    summary: {
      pt: 'Site de uma farmácia de manipulação em Caratinga, com produtos, endereço, horário e atendimento direto pelo WhatsApp. Também fiz uma API em Spring Boot para os dados da loja.',
      en: 'Website for a compounding pharmacy in Caratinga with products, address, opening hours and direct WhatsApp contact. I also built a Spring Boot API for the store data.',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'Spring Boot'],
    repo: gh('biofarma-site'),
    live: 'https://biofarmacaratinga.com.br/',
    media: 'projetos/biofarma.gif',
    mediaAlt: { pt: 'Site da Biofarma rolando', en: 'Biofarma website scrolling' },
    color: '#3ddc84',
  },
  {
    id: 'techsur',
    name: 'TechSur Soluções em TI',
    date: '2026-10',
    when: { pt: 'out 2026', en: 'Oct 2026' },
    summary: {
      pt: 'Site de uma consultoria de TI com os serviços, a nuvem privada e uma calculadora que mostra quanto custa cada hora de sistema parado.',
      en: 'Website for an IT consultancy with its services, private cloud offering and a calculator that shows how much each hour of downtime costs.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: gh('site-techsur-mg'),
    live: 'https://guilhermevaladares7.github.io/site-techsur-mg/',
    media: 'projetos/techsur.gif',
    mediaAlt: { pt: 'Site da TechSur rolando', en: 'TechSur website scrolling' },
    color: '#5b8cff',
    ring: true,
  },
  {
    id: 'hnsa',
    name: 'Hospital Nossa Senhora Auxiliadora',
    date: '2026-10',
    when: { pt: 'out 2026', en: 'Oct 2026' },
    summary: {
      pt: 'Proposta de site novo para o hospital, com 16 páginas e o telefone do pronto-socorro sempre à vista. As páginas saem de um gerador em Python que guarda menu e rodapé num lugar só.',
      en: 'A new website proposal for the hospital, with 16 pages and the emergency phone always in sight. Pages are built by a Python generator that keeps menu and footer in one place.',
    },
    tech: ['Python', 'HTML', 'CSS'],
    repo: gh('hospital-nossa-senhora-auxiliadora'),
    media: 'projetos/hnsa.gif',
    mediaAlt: { pt: 'Proposta do site do hospital rolando', en: 'Hospital website proposal scrolling' },
    color: '#de2d25',
  },
  {
    id: 'aureaoutdoor',
    name: 'Áurea Outdoor',
    date: '2026-11',
    when: { pt: 'nov 2026', en: 'Nov 2026' },
    summary: {
      pt: 'Catálogo de móveis para áreas externas, com escolha da cor da estrutura e da trama e pedido de orçamento pelo WhatsApp.',
      en: 'An outdoor furniture catalog where customers pick frame and weave colors and request a quote through WhatsApp.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: gh('aureaoutdoor'),
    live: 'https://guilhermevaladares7.github.io/aureaoutdoor/',
    media: 'projetos/aureaoutdoor.gif',
    mediaAlt: { pt: 'Catálogo da Áurea Outdoor rolando', en: 'Áurea Outdoor catalog scrolling' },
    color: '#c9a36a',
  },
  {
    id: 'catalogo',
    name: 'Catálogo de Produtos',
    date: '2026-11',
    when: { pt: 'nov 2026', en: 'Nov 2026' },
    summary: {
      pt: 'SPA em React que consome uma API REST: lista os produtos, pesquisa por nome e abre os detalhes sem recarregar a página. Vem com uma API falsa para rodar em casa.',
      en: 'A React SPA consuming a REST API: it lists products, searches by name and opens details without reloading the page. It ships with a fake API for local testing.',
    },
    tech: ['React', 'Vite', 'JavaScript', 'REST'],
    repo: gh('catalogo-produto'),
    media: 'projetos/catalogo.gif',
    mediaAlt: { pt: 'Pesquisa e detalhes no catálogo de produtos', en: 'Search and details in the product catalog' },
    color: '#36e2b4',
  },
  {
    id: 'calenda',
    name: 'Calenda',
    date: '2026-11',
    when: { pt: 'nov 2026', en: 'Nov 2026' },
    summary: {
      pt: 'Sistema de gestão da Calenda Móveis: calculadora de venda com as regras da loja, orçamentos, clientes, agenda de entregas, assistência e fechamento de caixa exportado para o Excel.',
      en: 'Management system for Calenda Móveis: a sales calculator that follows the store rules, quotes, customers, delivery schedule, after-sales support and month-end reports exported to Excel.',
    },
    tech: ['Sistema web', 'Login', 'Exportação para Excel'],
    media: 'projetos/calenda.gif',
    mediaAlt: { pt: 'Telas do sistema Calenda', en: 'Calenda system screens' },
    note: { pt: 'Código privado: o sistema usa dados reais da loja.', en: 'Private code: the system runs on real store data.' },
    color: '#ff6a1a',
    ring: true,
  },
  {
    id: 'aurea',
    name: 'Site da Aurea',
    date: '2026-11',
    when: { pt: 'nov 2026', en: 'Nov 2026' },
    summary: {
      pt: 'O site da minha empresa, com o mascote Auri em pixel art, demonstrações animadas de cada serviço e uma API de métricas no Supabase que alimenta o painel de um parceiro.',
      en: 'My company website, featuring the pixel art mascot Auri, animated demos for each service and a Supabase metrics API that feeds a partner dashboard.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    repo: gh('aurea-site'),
    live: 'https://auereastack.com.br/',
    media: 'projetos/aurea.gif',
    mediaAlt: { pt: 'Site da Aurea rolando', en: 'Aurea website scrolling' },
    color: '#ff3d7f',
  },
]
