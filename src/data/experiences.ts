import type { Text } from '../i18n'

export type Experience = {
  org: string
  role: Text
  period: Text
  kind: Text
  description: Text
  link?: string
  color: string
}

export const experiences: Experience[] = [
  {
    org: 'PUC Minas',
    role: { pt: 'Estudante de Engenharia de Software', en: 'Software Engineering student' },
    period: { pt: 'Em andamento', en: 'In progress' },
    kind: { pt: 'Formação', en: 'Education' },
    description: {
      pt: 'Trabalhos em equipe com Java, Spring Boot, APIs REST, React e bancos relacionais, sempre com entrega no GitHub e documentação.',
      en: 'Team projects with Java, Spring Boot, REST APIs, React and relational databases, always delivered on GitHub with documentation.',
    },
    color: '#ffc94d',
  },
  {
    org: 'Biofarma, TechSur e Áurea Outdoor',
    role: { pt: 'Desenvolvedor freelancer', en: 'Freelance developer' },
    period: { pt: 'out 2026 – nov 2026', en: 'Oct 2026 – Nov 2026' },
    kind: { pt: 'Freelas', en: 'Freelance' },
    description: {
      pt: 'Sites para três empresas de Caratinga e região: da conversa sobre o negócio até o domínio configurado e o site no ar.',
      en: 'Websites for three businesses in the Caratinga region, from the first conversation about the business to the domain set up and the site live.',
    },
    color: '#3ddc84',
  },
  {
    org: 'Calenda Móveis',
    role: { pt: 'Desenvolvedor do sistema de gestão', en: 'Management system developer' },
    period: { pt: 'nov 2026', en: 'Nov 2026' },
    kind: { pt: 'Freela', en: 'Freelance' },
    description: {
      pt: 'Levantei as regras de venda da loja e transformei em um sistema usado no dia a dia, com calculadora, entregas, assistência e fechamento de caixa.',
      en: 'Mapped the store sales rules and turned them into a system used every day, with a sales calculator, deliveries, after-sales support and cash closing.',
    },
    color: '#ff6a1a',
  },
  {
    org: 'Aurea',
    role: { pt: 'Fundador e desenvolvedor full stack', en: 'Founder and full stack developer' },
    period: { pt: 'nov 2026 – atual', en: 'Nov 2026 – present' },
    kind: { pt: 'Empresa', en: 'Company' },
    description: {
      pt: 'Sites, sistemas e automações com IA para pequenas empresas. Atendo o cliente, desenho a solução, programo, publico e acompanho depois da entrega.',
      en: 'Websites, systems and AI automations for small businesses. I talk to clients, design the solution, write the code, ship it and support it after launch.',
    },
    link: 'https://auereastack.com.br/',
    color: '#36e2b4',
  },
  {
    org: 'AFIO conect',
    role: { pt: 'Parceria e integração', en: 'Partnership and integration' },
    period: { pt: 'nov 2026 – atual', en: 'Nov 2026 – present' },
    kind: { pt: 'Parceria', en: 'Partnership' },
    description: {
      pt: 'Parceria da Aurea com a AFIO conect. Criei uma API de métricas no Supabase, protegida por token, que leva as visitas e os cliques do site para o painel deles.',
      en: 'Aurea’s partnership with AFIO conect. I built a token-protected metrics API on Supabase that sends the site visits and clicks to their dashboard.',
    },
    color: '#8fd0ff',
  },
]
