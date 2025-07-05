# 📡 APIs do GroomerLink

Este documento descreve todas as APIs disponíveis no GroomerLink.

## 🏗️ Estrutura das APIs

```
/api/
├── cartoes/
│   ├── route.ts                    # GET (listar) | POST (criar)
│   ├── [username]/
│   │   └── route.ts               # GET (buscar por username)
│   └── editar/
│       └── [id]/
│           └── route.ts           # GET (buscar para editar) | PUT (atualizar)
└── upload/
    └── route.ts                   # POST (upload de foto)
```

## 📝 Endpoints Disponíveis

### 1. Criar Cartão
**POST** `/api/cartoes`

Cria um novo cartão digital para um groomer.

**Body (JSON):**
```json
{
  "nomeGroomer": "Maria Silva",
  "nomeEstabelecimento": "Pet Shop da Maria",
  "telefone": "(11) 99999-9999",
  "instagram": "maria.petshop",
  "endereco": "Rua das Flores, 123 - São Paulo, SP",
  "emailEdicao": "maria@email.com",
  "horarios": "[{\"dia\":\"Segunda-feira\",\"abertura\":\"08:00\",\"fechamento\":\"18:00\"}]",
  "servicos": "[{\"nome\":\"Banho e Tosa\",\"preco\":40}]",
  "foto": "/uploads/groomer_123456.jpg"
}
```

**Resposta:**
```json
{
  "success": true,
  "cartao": {
    "id": "cll1234567890",
    "username": "maria-silva",
    "url": "/maria-silva"
  }
}
```

### 2. Buscar Cartão Público
**GET** `/api/cartoes/[username]`

Busca um cartão pelo username para exibição pública.

**Exemplo:** `GET /api/cartoes/maria-silva`

**Resposta:**
```json
{
  "id": "cll1234567890",
  "username": "maria-silva",
  "nomeGroomer": "Maria Silva",
  "nomeEstabelecimento": "Pet Shop da Maria",
  "foto": "/uploads/groomer_123456.jpg",
  "telefone": "(11) 99999-9999",
  "instagram": "maria.petshop",
  "endereco": "Rua das Flores, 123 - São Paulo, SP",
  "horarios": [
    {
      "dia": "Segunda-feira",
      "abertura": "08:00",
      "fechamento": "18:00"
    }
  ],
  "servicos": [
    {
      "nome": "Banho e Tosa",
      "preco": 40
    }
  ]
}
```

### 3. Buscar Cartão para Edição
**GET** `/api/cartoes/editar/[id]?email=[email]`

Busca um cartão para edição por ID (requer email de confirmação).

**Exemplo:** `GET /api/cartoes/editar/cll1234567890?email=maria@email.com`

**GET** `/api/cartoes/editar/username/[username]?email=[email]`

Busca um cartão para edição por username (requer email de confirmação).

**Exemplo:** `GET /api/cartoes/editar/username/maria-silva?email=maria@email.com`

**Resposta:** Mesma estrutura da criação, mas com dados atuais.

### 4. Atualizar Cartão
**PUT** `/api/cartoes/editar/[id]`

Atualiza um cartão existente por ID.

**PUT** `/api/cartoes/editar/username/[username]`

Atualiza um cartão existente por username.

**Body:** Mesmo formato da criação, mas deve incluir o `emailEdicao` para verificação.

### 5. Upload de Foto
**POST** `/api/upload`

Faz upload de uma foto do groomer.

**Body (FormData):**
```
foto: [arquivo de imagem]
```

**Resposta:**
```json
{
  "success": true,
  "url": "/uploads/groomer_123456789.jpg",
  "filename": "groomer_123456789.jpg"
}
```

## 🔒 Validações

### Username
- Apenas letras minúsculas, números e hífens
- Entre 3 e 30 caracteres
- Deve ser único
- Gerado automaticamente se não fornecido

### Telefone
- Apenas números, espaços, parênteses, hífens e +
- Mínimo 10 caracteres

### Email
- Formato válido de email
- Usado para edição posterior

### Foto
- Apenas imagens (image/*)
- Máximo 5MB
- Formatos: JPG, PNG, GIF, WebP

## 🧪 Como Testar

### 1. Usando o arquivo de teste
```bash
# Certifique-se que o servidor está rodando
npm run dev

# Execute o teste
node tests/api-test.js
```

### 2. Usando curl

**Criar cartão:**
```bash
curl -X POST http://localhost:3000/api/cartoes \
  -H "Content-Type: application/json" \
  -d '{
    "nomeGroomer": "Maria Silva",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua das Flores, 123",
    "emailEdicao": "maria@email.com",
    "horarios": "[]",
    "servicos": "[]"
  }'
```

**Buscar cartão:**
```bash
curl http://localhost:3000/api/cartoes/maria-silva
```

### 3. Usando Postman/Insomnia

Importe a collection com os endpoints acima ou crie as requisições manualmente.

## ⚠️ Tratamento de Erros

Todas as APIs retornam erros no formato:

```json
{
  "error": "Descrição do erro"
}
```

**Códigos de status:**
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 📊 Status das APIs

- ✅ **POST /api/cartoes** - Criar cartão
- ✅ **GET /api/cartoes/[username]** - Buscar cartão público
- ✅ **GET /api/cartoes/editar/[id]** - Buscar para edição (por ID)
- ✅ **GET /api/cartoes/editar/username/[username]** - Buscar para edição (por username)
- ✅ **PUT /api/cartoes/editar/[id]** - Atualizar cartão (por ID)
- ✅ **PUT /api/cartoes/editar/username/[username]** - Atualizar cartão (por username)
- ✅ **POST /api/upload** - Upload de foto
- ✅ **GET /api/cartoes** - Listar cartões (debug)

## 🚀 Próximos Passos

Com as APIs funcionando, agora podemos criar:

1. **Formulário de criação** (`/criar`)
2. **Página pública do cartão** (`/[username]`)
3. **Sistema de edição** (`/editar/[id]` e `/editar/[username]`)
4. **Página inicial** com explicação

As APIs estão prontas para receber dados dos formulários e servir as páginas públicas!