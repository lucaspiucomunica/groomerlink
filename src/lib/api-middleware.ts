import { NextRequest, NextResponse } from 'next/server'

// Middleware para configurações gerais das APIs
export function withApiMiddleware(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      // Configurar CORS
      const response = await handler(request, ...args)
      
      if (response instanceof NextResponse) {
        // Adicionar headers CORS
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        
        // Adicionar headers de segurança
        response.headers.set('X-Content-Type-Options', 'nosniff')
        response.headers.set('X-Frame-Options', 'DENY')
        response.headers.set('X-XSS-Protection', '1; mode=block')
      }
      
      return response
    } catch (error) {
      console.error('Erro no middleware da API:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }
  }
}

// Helper para validar dados de entrada
export function validateRequestData(data: any, requiredFields: string[]) {
  const missingFields = requiredFields.filter(field => !data[field])
  
  if (missingFields.length > 0) {
    throw new Error(`Campos obrigatórios: ${missingFields.join(', ')}`)
  }
  
  return true
}

// Helper para sanitizar dados
export function sanitizeData(data: any) {
  const sanitized = { ...data }
  
  // Remover campos vazios
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === '' || sanitized[key] === null || sanitized[key] === undefined) {
      delete sanitized[key]
    }
  })
  
  // Limpar strings
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim()
    }
  })
  
  return sanitized
}

// Helper para lidar com OPTIONS (CORS preflight)
export function handleOptions() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}