import type { Text } from '../i18n'

export const profile = {
  name: 'Guilherme Valadares',
  fullName: 'Guilherme Ferreira Valadares',
  role: { pt: 'Desenvolvedor full stack e fundador da Aurea', en: 'Full stack developer and founder of Aurea' } as Text,
  email: 'glhrmvaladares@gmail.com',
  whatsapp: '5533999657071',
  phoneLabel: '(33) 99965-7071',
  linkedin: 'https://www.linkedin.com/in/guilherme-ferreira-valadares-43009640b/',
  instagram: 'https://www.instagram.com/guilherme_valladares/',
  instagramHandle: '@guilherme_valladares',
  github: 'https://github.com/guilhermevaladares7',
  githubHandle: 'guilhermevaladares7',
  aurea: 'https://auereastack.com.br/',
}

export const about = {
  greeting: { pt: 'Oi, eu sou o Guilherme.', en: "Hi, I'm Guilherme." } as Text,
  paragraphs: [
    {
      pt: 'Estudo Engenharia de Software na PUC Minas e trabalho como desenvolvedor full stack: do banco de dados até a tela que o cliente toca.',
      en: 'I study Software Engineering at PUC Minas and work as a full stack developer, from the database all the way to the screen the customer taps.',
    },
    {
      pt: 'Em 17 de novembro de 2026 abri a Aurea, minha empresa de sites, sistemas e automações com IA para pequenos negócios. Lá eu cuido de tudo: a conversa com o cliente, o design, o código e o deploy.',
      en: 'On November 17, 2026 I started Aurea, my company building websites, management systems and AI automations for small businesses. I handle everything there: talking to the client, design, code and deploy.',
    },
    {
      pt: 'Gosto de projeto que sai do papel e entra na rotina de alguém: o site que traz cliente pelo WhatsApp, o sistema que fecha o caixa no fim do mês, a IA que responde enquanto a loja está fechada.',
      en: 'I like projects that leave the drawing board and become part of someone’s routine: the website that brings customers through WhatsApp, the system that closes the books at the end of the month, the AI that answers while the store is closed.',
    },
    {
      pt: 'Meu objetivo é crescer como engenheiro de software construindo produtos de verdade, com código limpo e interfaces que dão vontade de usar.',
      en: 'My goal is to grow as a software engineer by building real products, with clean code and interfaces people actually enjoy using.',
    },
  ] as Text[],
  facts: [
    { label: { pt: 'Formação', en: 'Education' }, value: { pt: 'Engenharia de Software, PUC Minas', en: 'Software Engineering, PUC Minas' } },
    { label: { pt: 'Atuação', en: 'Focus' }, value: { pt: 'Desenvolvimento full stack', en: 'Full stack development' } },
    { label: { pt: 'Empresa', en: 'Company' }, value: { pt: 'Aurea, desde novembro de 2026', en: 'Aurea, since November 2026' } },
    {
      label: { pt: 'Interesses', en: 'Interests' },
      value: { pt: 'IA aplicada, sistemas de gestão e interfaces com movimento', en: 'Applied AI, management systems and motion-driven interfaces' },
    },
  ] as { label: Text; value: Text }[],
  stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Java', 'Spring Boot', 'MySQL', 'Supabase', 'Tailwind CSS', 'Three.js', 'Python', 'Git'],
}
