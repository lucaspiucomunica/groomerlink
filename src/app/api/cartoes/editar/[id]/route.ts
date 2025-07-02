import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isValidUsername } from '@/lib/utils'

// GET - Buscar cartão para edição (com verificação de email)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório para editar' },
        { status: 400 }
      )
    }

    const cartao = await prisma.cartao.findFirst({
      where: {
        id,
        emailEdicao: email
      }
    })

    if (!cartao) {
      return NextResponse.json(
        { error: 'Cartão não encontrado ou email incorreto' },
        { status: 404 }
      )
    }

    // Não retornar o email na resposta por segurança
    const { emailEdicao, ...cartaoSemEmail } = cartao

    return NextResponse.json(cartaoSemEmail)

  } catch (error) {
    console.error('Erro ao buscar cartão para edição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar cartão existente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      username
    } = body

    // Verificar se o cartão existe e se o email confere
    const cartaoExistente = await prisma.cartao.findFirst({
      where: {
        id,
        emailEdicao
      }
    })

    if (!cartaoExistente) {
      return NextResponse.json(
        { error: 'Cartão não encontrado ou email incorreto' },
        { status: 404 }
      )
    }

    // Validações básicas
    if (!nomeGroomer || !telefone || !endereco) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome do groomer, telefone e endereço' },
        { status: 400 }
      )
    }

    // Validar username se foi alterado
    if (username && username !== cartaoExistente.username) {
      if (!isValidUsername(username)) {
        return NextResponse.json(
          { error: 'Username deve conter apenas letras minúsculas, números e hífens' },
          { status: 400 }
        )
      }

      // Verificar se o novo username já existe
      const usernameExiste = await prisma.cartao.findUnique({
        where: { username }
      })

      if (usernameExiste && usernameExiste.id !== id) {
        return NextResponse.json(
          { error: 'Este username já está em uso' },
          { status: 400 }
        )
      }
    }

    // Atualizar cartão
    const cartaoAtualizado = await prisma.cartao.update({
      where: { id },
      data: {
        username: username || cartaoExistente.username,
        nomeGroomer,
        nomeEstabelecimento: nomeEstabelecimento || null,
        telefone,
        instagram: instagram || null,
        endereco,
        horarios: horarios || '[]',
        servicos: servicos || '[]',
        precos: precos || null,
        foto: foto || null,
      }
    })

    return NextResponse.json({
      success: true,
      cartao: {
        id: cartaoAtualizado.id,
        username: cartaoAtualizado.username,
        url: `/${cartaoAtualizado.username}`
      }
    })

  } catch (error) {
    console.error('Erro ao atualizar cartão:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}