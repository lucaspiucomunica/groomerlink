// Configurações gerais da aplicação

export const APP_CONFIG = {
    // Informações básicas
    name: 'GroomerLink',
    description: 'Cartão digital profissional para pet groomers',
    domain: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    
    // Limites
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxUsernameLength: 30,
    minUsernameLength: 3,
    
    // URLs
    urls: {
      home: '/',
      criar: '/criar',
      editar: (param: string) => `/editar/${param}`, // Funciona tanto com ID quanto username
      cartao: (username: string) => `/${username}`,
    },
    
    // APIs
    api: {
      cartoes: '/api/cartoes',
      upload: '/api/upload',
      cartaoPorUsername: (username: string) => `/api/cartoes/${username}`,
      editarCartao: (id: string) => `/api/cartoes/editar/${id}`,
      editarCartaoUsername: (username: string) => `/api/cartoes/editar/username/${username}`,
    },
    
    // Mensagens padrão
    messages: {
      whatsapp: {
        default: 'Olá! Vi seu cartão no GroomerLink e gostaria de agendar um serviço.',
      },
      success: {
        cartaoCriado: 'Cartão criado com sucesso!',
        cartaoAtualizado: 'Cartão atualizado com sucesso!',
      },
      errors: {
        generic: 'Ops! Algo deu errado. Tente novamente.',
        notFound: 'Cartão não encontrado.',
        invalidData: 'Dados inválidos. Verifique as informações.',
        usernameExists: 'Este nome de usuário já está em uso.',
      }
    },
    
    // Cores do tema (seguindo o PDF)
    theme: {
      primary: '#059669', // Verde pet-friendly
      secondary: '#F3F4F6', // Cinza claro
      accent: '#F59E0B', // Laranja para botões
    }
  }
  
  // Validações
  export const VALIDATION = {
    username: {
      pattern: /^[a-z0-9-]+$/,
      minLength: APP_CONFIG.minUsernameLength,
      maxLength: APP_CONFIG.maxUsernameLength,
    },
    
    telefone: {
      pattern: /^[\d\s\(\)\-\+]+$/,
      minLength: 10,
    },
    
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    
    instagram: {
      pattern: /^[a-zA-Z0-9._]+$/,
    }
  }
  
  // Dados de exemplo para desenvolvimento
  export const MOCK_DATA = {
    horarios: [
      { dia: 'Segunda-feira', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Terça-feira', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Quarta-feira', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Quinta-feira', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Sexta-feira', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Sábado', abertura: '08:00', fechamento: '16:00' },
      { dia: 'Domingo', abertura: '00:00', fechamento: '00:00', fechado: true },
    ],
    
    servicos: [
      { nome: 'Banho e Tosa', preco: 40 },
      { nome: 'Corte de Unha', preco: 15 },
      { nome: 'Hidratação', preco: 25 },
      { nome: 'Limpeza de Ouvido', preco: 10 },
      { nome: 'Escovação', preco: 20 },
    ]
  }