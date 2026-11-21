import type { Text } from '../i18n'

type Copy = Record<string, Text>

export const copy = {
  nav: {
    about: { pt: 'Sobre', en: 'About' },
    projects: { pt: 'Projetos', en: 'Projects' },
    experience: { pt: 'Experiências', en: 'Experience' },
    contact: { pt: 'Contato', en: 'Contact' },
    start: { pt: 'Início', en: 'Start' },
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    menu: { pt: 'Abrir menu', en: 'Open menu' },
    close: { pt: 'Fechar menu', en: 'Close menu' },
    lang: { pt: 'Mudar para inglês', en: 'Switch to Portuguese' },
  },
  boot: {
    line: { pt: 'ligando o universo', en: 'powering up the universe' },
    skip: { pt: 'Pular', en: 'Skip' },
  },
  hero: {
    start: { pt: 'Começar a viagem', en: 'Start the journey' },
    talk: { pt: 'Falar comigo', en: 'Get in touch' },
    hint: { pt: 'Role para entrar na galáxia', en: 'Scroll to enter the galaxy' },
    auri: { pt: 'Oi! Eu sou o Auri. Vou te guiar.', en: "Hi! I'm Auri. I'll be your guide." },
  },
  about: {
    title: { pt: 'Sobre mim', en: 'About me' },
    auri: { pt: 'Esse é o planeta de onde ele saiu.', en: 'This is the planet he came from.' },
    stack: { pt: 'Com o que eu trabalho', en: 'What I work with' },
  },
  projects: {
    title: { pt: 'Projetos', en: 'Projects' },
    intro: {
      pt: 'Do mais antigo ao mais novo. Cada planeta é um projeto: role para viajar ou clique num deles.',
      en: 'From the oldest to the newest. Each planet is a project: scroll to travel or click one of them.',
    },
    code: { pt: 'Ver código', en: 'View code' },
    live: { pt: 'Ver no ar', en: 'View live' },
    of: { pt: 'de', en: 'of' },
    timeline: { pt: 'Linha do tempo dos projetos', en: 'Project timeline' },
  },
  experience: {
    title: { pt: 'Experiências', en: 'Experience' },
    intro: {
      pt: 'Cada estrela é uma etapa do caminho. A linha da constelação se desenha conforme você rola.',
      en: 'Each star is a step along the way. The constellation line draws itself as you scroll.',
    },
    visit: { pt: 'Conhecer', en: 'Visit' },
  },
  contact: {
    title: { pt: 'Mande um sinal', en: 'Send a signal' },
    intro: {
      pt: 'Tem um projeto, uma vaga ou só quer trocar uma ideia? Escreve aqui ou me chama onde preferir.',
      en: 'Got a project, a job opening or just want to chat? Write here or reach me wherever you prefer.',
    },
    name: { pt: 'Nome', en: 'Name' },
    email: { pt: 'E-mail', en: 'Email' },
    message: { pt: 'Mensagem', en: 'Message' },
    send: { pt: 'Enviar sinal', en: 'Send signal' },
    sending: { pt: 'Enviando…', en: 'Sending…' },
    sent: { pt: 'Sinal recebido! Eu te respondo em breve.', en: 'Signal received! I’ll get back to you soon.' },
    mailto: {
      pt: 'Abri o seu app de e-mail com a mensagem pronta. É só enviar.',
      en: 'I opened your email app with the message ready. Just hit send.',
    },
    failed: {
      pt: 'Não consegui enviar agora. Tenta de novo ou me chama no WhatsApp.',
      en: 'I couldn’t send it right now. Try again or message me on WhatsApp.',
    },
    another: { pt: 'Mandar outra mensagem', en: 'Send another message' },
    nameRequired: { pt: 'Escreve o seu nome.', en: 'Please enter your name.' },
    nameShort: { pt: 'O nome precisa de pelo menos 2 letras.', en: 'Your name needs at least 2 letters.' },
    emailRequired: { pt: 'Escreve o seu e-mail.', en: 'Please enter your email.' },
    emailInvalid: { pt: 'Esse e-mail não parece certo.', en: 'That email doesn’t look right.' },
    messageRequired: { pt: 'Escreve a sua mensagem.', en: 'Please write your message.' },
    messageShort: { pt: 'Conta um pouco mais, pelo menos 10 caracteres.', en: 'Tell me a bit more, at least 10 characters.' },
    messageLong: { pt: 'A mensagem passou de 2000 caracteres.', en: 'The message is over 2000 characters.' },
    whatsappText: { pt: 'Olá, Guilherme! Vi o seu portfólio.', en: 'Hi Guilherme! I saw your portfolio.' },
  },
  footer: {
    made: {
      pt: 'Feito por Guilherme Valadares com React, Three.js e a identidade visual da Aurea.',
      en: 'Built by Guilherme Valadares with React, Three.js and the Aurea visual identity.',
    },
    top: { pt: 'Voltar ao início', en: 'Back to start' },
  },
} satisfies Record<string, Copy>

export const scaleLines: Text[] = [
  {
    pt: 'O universo observável tem uns 93 bilhões de anos-luz de ponta a ponta.',
    en: 'The observable universe is about 93 billion light-years across.',
  },
  { pt: 'Lá dentro cabem centenas de bilhões de galáxias.', en: 'Hundreds of billions of galaxies fit inside it.' },
  { pt: 'Esta é uma delas.', en: 'This is one of them.' },
]
