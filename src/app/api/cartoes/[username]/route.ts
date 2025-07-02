import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseHorarios, parseServicos } from '@/lib/utils'
import type { CartaoPublico } from '@/lib/types'

// GET - Buscar cartão por username (para página pública)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params

    if (!username) {
      return NextResponse.json(
        { error: 'Username é obrigatório' },
        { status: 400 }
      )
    }

    const cartao = await prisma.cartao.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        nomeGroomer: true,
        nomeEstabelecimento: true,
        foto: true,
        telefone: true,
        instagram: true,
        endereco: true,
        horarios: true,
        servicos: true,
        precos: true,
        atualizadoEm: true,
      }
    })

    if (!cartao) {
      return NextResponse.json(
        { error: 'Cartão não encontrado' },
        { status: 404 }
      )
    }

    // Converter strings JSON para objetos
    const cartaoPublico: CartaoPublico = {
      id: cartao.id,
      username: cartao.username,
      nomeGroomer: cartao.nomeGroomer,
      nomeEstabelecimento: cartao.nomeEstabelecimento,
      foto: cartao.foto,
      telefone: cartao.telefone,
      instagram: cartao.instagram,
      endereco: cartao.endereco,
      horarios: parseHorarios(cartao.horarios),
      servicos: parseServicos(cartao.servicos),
      precos: cartao.precos ? parseServicos(cartao.precos) : undefined,
    }

    return NextResponse.json(cartaoPublico)

  } catch (error) {
    console.error('Erro ao buscar cartão:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}