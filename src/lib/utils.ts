import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Servico, Horario } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para converter string JSON em array de serviços
export function parseServicos(servicosString: string): Servico[] {
  try {
    return JSON.parse(servicosString) || []
  } catch {
    return []
  }
}

// Função para converter array de serviços em string JSON
export function stringifyServicos(servicos: Servico[]): string {
  return JSON.stringify(servicos)
}

// Função para converter string JSON em array de horários
export function parseHorarios(horariosString: string): Horario[] {
  try {
    return JSON.parse(horariosString) || []
  } catch {
    return []
  }
}

// Função para converter array de horários em string JSON
export function stringifyHorarios(horarios: Horario[]): string {
  return JSON.stringify(horarios)
}

// Função para gerar username único a partir do nome
export function generateUsername(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]/g, '-') // Substitui caracteres especiais por hífen
    .replace(/-+/g, '-') // Remove hífens duplos
    .replace(/^-|-$/g, '') // Remove hífens do início e fim
}

// Função para formatar telefone para WhatsApp
export function formatWhatsAppUrl(telefone: string, message: string = ''): string {
  const cleanPhone = telefone.replace(/\D/g, '')
  const whatsappNumber = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${whatsappNumber}${message ? `?text=${encodedMessage}` : ''}`
}

// Função para formatar URL do Instagram
export function formatInstagramUrl(instagram: string): string {
  const cleanInstagram = instagram.replace('@', '').replace('instagram.com/', '')
  return `https://instagram.com/${cleanInstagram}`
}

// Função para validar username
export function isValidUsername(username: string): boolean {
  const regex = /^[a-z0-9-]+$/
  return regex.test(username) && username.length >= 3 && username.length <= 30
}