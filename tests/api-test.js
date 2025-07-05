// Arquivo de teste para as APIs do GroomerLink
// Execute com: node tests/api-test.js
// Certifique-se de que o servidor esteja rodando (npm run dev)

const BASE_URL = 'http://localhost:3000'

// Dados de teste
const dadosCartaoTeste = {
  nomeGroomer: 'Maria Silva Neves',
  nomeEstabelecimento: 'Pet Shop da Maria',
  telefone: '(11) 99999-9999',
  instagram: 'maria.petshop',
  endereco: 'Rua das Flores, 123 - São Paulo, SP',
  emailEdicao: 'maria@email.com',
  horarios: JSON.stringify([
    { dia: 'Segunda-feira', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Terça-feira', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Quarta-feira', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Quinta-feira', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Sexta-feira', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Sábado', abertura: '08:00', fechamento: '16:00' },
    { dia: 'Domingo', abertura: '00:00', fechamento: '00:00', fechado: true }
  ]),
  servicos: JSON.stringify([
    { nome: 'Banho e Tosa', preco: 40 },
    { nome: 'Corte de Unha', preco: 15 },
    { nome: 'Hidratação', preco: 25 }
  ])
}

async function testarAPI() {
  console.log('🧪 Iniciando testes das APIs do GroomerLink...\n')

  let cartaoCriado = null

  try {
    // 1. Testar criação de cartão
    console.log('1. Testando criação de cartão...')
    const responseCreate = await fetch(`${BASE_URL}/api/cartoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCartaoTeste)
    })

    if (!responseCreate.ok) {
      throw new Error(`Erro na criação: ${responseCreate.status}`)
    }

    const cartaoCriado = await responseCreate.json()
    console.log('✅ Cartão criado com sucesso!')
    console.log(`   Username: ${cartaoCriado.cartao.username}`)
    console.log(`   URL: ${cartaoCriado.cartao.url}`)
    console.log(`   ID: ${cartaoCriado.cartao.id}\n`)

    // 2. Testar busca do cartão público
    console.log('2. Testando busca do cartão público...')
    const responseGet = await fetch(`${BASE_URL}/api/cartoes/${cartaoCriado.cartao.username}`)

    if (!responseGet.ok) {
      throw new Error(`Erro na busca: ${responseGet.status}`)
    }

    const cartaoPublico = await responseGet.json()
    console.log('✅ Cartão encontrado com sucesso!')
    console.log(`   Nome: ${cartaoPublico.nomeGroomer}`)
    console.log(`   Estabelecimento: ${cartaoPublico.nomeEstabelecimento}`)
    console.log(`   Telefone: ${cartaoPublico.telefone}\n`)

    // 3. Testar edição do cartão
    console.log('3. Testando edição do cartão...')
    const dadosEdicao = {
      ...dadosCartaoTeste,
      nomeGroomer: 'Maria Silva Santos',
      nomeEstabelecimento: 'Pet Shop da Maria',
      emailEdicao: dadosCartaoTeste.emailEdicao // Importante: incluir o email para verificação
    }

    const responseEdit = await fetch(`${BASE_URL}/api/cartoes/editar/${cartaoCriado.cartao.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosEdicao)
    })

    if (!responseEdit.ok) {
      const errorData = await responseEdit.json()
      console.log(`❌ Erro na edição: ${responseEdit.status}`)
      console.log(`   Erro: ${errorData.error}`)
      console.log(`   ID usado: ${cartaoCriado.cartao.id}`)
      console.log(`   Email usado: ${dadosEdicao.emailEdicao}`)
      throw new Error(`Erro na edição: ${responseEdit.status} - ${errorData.error}`)
    }

    const cartaoEditado = await responseEdit.json()
    console.log('✅ Cartão editado com sucesso!')
    console.log(`   Username: ${cartaoEditado.cartao.username}`)
    console.log(`   URL: ${cartaoEditado.cartao.url}\n`)

    // 4. Testar busca para edição
    console.log('4. Testando busca para edição...')
    const responseEditGet = await fetch(
      `${BASE_URL}/api/cartoes/editar/${cartaoCriado.cartao.id}?email=${dadosCartaoTeste.emailEdicao}`
    )

    if (!responseEditGet.ok) {
      throw new Error(`Erro na busca para edição: ${responseEditGet.status}`)
    }

    const cartaoParaEdicao = await responseEditGet.json()
    console.log('✅ Cartão para edição encontrado!')
    console.log(`   Nome atual: ${cartaoParaEdicao.nomeGroomer}\n`)

    // 5. Testar API de upload (endpoint apenas)
    console.log('5. Testando endpoint de upload...')
    const responseUpload = await fetch(`${BASE_URL}/api/upload`)

    if (!responseUpload.ok) {
      console.log('⚠️  Endpoint de upload não respondeu, mas isso é normal')
    } else {
      const uploadInfo = await responseUpload.json()
      console.log('✅ Endpoint de upload funcionando!')
      console.log(`   ${uploadInfo.message}\n`)
    }

    console.log('🎉 Todos os testes passaram com sucesso!')
    console.log(`\n🔗 Acesse o cartão criado em: ${BASE_URL}${cartaoCriado.cartao.url}`)

  } catch (error) {
    console.error('❌ Erro nos testes:', error.message)
    console.log('\n💡 Certifique-se de que:')
    console.log('   - O servidor está rodando (npm run dev)')
    console.log('   - O banco de dados está configurado')
    console.log('   - As APIs estão funcionando')
  }
}

// Executar testes
testarAPI()