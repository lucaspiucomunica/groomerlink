import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateUsername, isValidUsername } from '@/lib/utils'

// GET - Listar cartões (para admin/debug - remover em produção)
export async function GET() {
  try {
    const cartoes = await prisma.cartao.findMany({
      select: {
        id: true,
        username: true,
        nomeGroomer: true,
        nomeEstabelecimento: true,
        criadoEm: true,
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })

    return NextResponse.json(cartoes)
  } catch (error) {
    console.error('Erro ao buscar cartões:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo cartão
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      nomeGroomer,
      nomeEstabelecimento,
      telefone,
      instagram,
      endereco,
      horarios,
      servicos,
      precos,
      emailEdicao,
      foto,
      username: customUsername
    } = body

    // Validações básicas
    if (!nomeGroomer || !telefone || !endereco || !emailEdicao) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome do groomer, telefone, endereço e email' },
        { status: 400 }
      )
    }

    // Gerar ou validar username
    let username = customUsername || generateUsername(nomeGroomer)
    
    if (!isValidUsername(username)) {
      return NextResponse.json(
        { error: 'Username deve conter apenas letras minúsculas, números e hífens' },
        { status: 400 }
      )
    }

    // Verificar se username já existe
    const existingCartao = await prisma.cartao.findUnique({
      where: { username }
    })

    if (existingCartao) {
      // Gerar username alternativo
      let counter = 1
      let newUsername = `${username}-${counter}`
      
      while (await prisma.cartao.findUnique({ where: { username: newUsername } })) {
        counter++
        newUsername = `${username}-${counter}`
      }
      
      username = newUsername
    }

    // Criar cartão
    const cartao = await prisma.cartao.create({
      data: {
        username,
        nomeGroomer,
        nomeEstabelecimento: nomeEstabelecimento || null,
        telefone,
        instagram: instagram || null,
        endereco,
        horarios: horarios || '[]',
        servicos: servicos || '[]',
        precos: precos || null,
        emailEdicao,
        foto: foto || null,
      }
    })

    return NextResponse.json({
      success: true,
      cartao: {
        id: cartao.id,
        username: cartao.username,
        url: `/${cartao.username}`
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar cartão:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}