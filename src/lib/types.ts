export interface Servico {
    nome: string
    preco?: number
  }
  
  export interface Horario {
    dia: string
    abertura: string
    fechamento: string
    fechado?: boolean
  }
  
  export interface CartaoFormData {
    username: string
    nomeGroomer: string
    nomeEstabelecimento?: string
    telefone: string
    instagram?: string
    endereco: string
    horarios: string // JSON string dos horários
    servicos: string // JSON string dos serviços
    precos?: string // JSON string dos preços
    emailEdicao: string
    foto?: string
  }
  
  export interface CartaoPublico {
    id: string
    username: string
    nomeGroomer: string
    nomeEstabelecimento?: string
    foto?: string
    telefone: string
    instagram?: string
    endereco: string
    horarios: Horario[]
    servicos: Servico[]
    precos?: Servico[]
  }