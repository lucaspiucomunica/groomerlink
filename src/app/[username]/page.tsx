import { notFound } from 'next/navigation'
import { formatWhatsAppUrl, formatInstagramUrl } from '@/lib/utils'
import type { CartaoPublico } from '@/lib/types'

async function getCartao(username: string): Promise<CartaoPublico | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/cartoes/${username}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error('Erro ao buscar cartão:', error)
    return null
  }
}

export default async function CartaoPublico({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}) {
  const { username } = await params
  const cartao = await getCartao(username)

  if (!cartao) {
    notFound()
  }

  const whatsappMessage = `Olá ${cartao.nomeGroomer}! Vi seu cartão no GroomerLink e gostaria de agendar um serviço.`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header com branding discreto */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-500">
          Cartão digital criado com <span className="text-green-600 font-medium">GroomerLink</span>
        </p>
      </div>

      {/* Card Principal */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header do Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
            <div className="mb-4">
              {cartao.foto ? (
                <img 
                  src={cartao.foto} 
                  alt={cartao.nomeGroomer}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto border-4 border-white flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-1">
              {cartao.nomeGroomer}
            </h1>
            
            {cartao.nomeEstabelecimento && (
              <p className="text-green-100 text-lg">
                {cartao.nomeEstabelecimento}
              </p>
            )}
          </div>

          {/* Botões de Contato */}
          <div className="p-6 space-y-3">
            <a
              href={formatWhatsAppUrl(cartao.telefone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium text-lg transition-colors shadow-md"
            >
              Chamar no WhatsApp
            </a>

            {cartao.instagram && (
              <a
                href={formatInstagramUrl(cartao.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-medium text-lg transition-all shadow-md"
              >
                Seguir no Instagram {cartao.instagram}
              </a>
            )}

            <a
              href={`tel:${cartao.telefone}`}
              className="flex items-center justify-center gap-3 w-full border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 py-4 rounded-xl font-medium text-lg transition-colors"
            >
              {cartao.telefone
                ? cartao.telefone.replace(/^(\+?55)?(\d{2})(\d{5})(\d{4})$/, (m, p1, ddd, parte1, parte2) => {
                    // Se já começa com +55, mantém, senão adiciona
                    const prefixo = p1 ? '+55 ' : '';
                    return `${prefixo}(${ddd}) ${parte1}-${parte2}`;
                  })
                : ''}
            </a>
          </div>

          {/* Informações */}
          <div className="px-6 pb-6 space-y-6">
            {/* Localização */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
                Localização
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {cartao.endereco}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(cartao.endereco)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Ver no Google Maps →
              </a>
            </div>

            {/* Horários */}
            {cartao.horarios && cartao.horarios.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
                  Horários
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {cartao.horarios.map((horario, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {horario.dia}
                      </span>
                      <span className="text-gray-600">
                        {horario.fechado 
                          ? 'Fechado' 
                          : `${horario.abertura} às ${horario.fechamento}`
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Serviços */}
            {cartao.servicos && cartao.servicos.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
                  Serviços
                </h3>
                <div className="space-y-3">
                  {cartao.servicos.map((servico, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {servico.nome}
                      </span>
                      {servico.preco && (
                        <span className="text-green-600 font-bold text-lg">
                          R$ {servico.preco}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA para agendar */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">
                Quer agendar um serviço?
              </h3>
              <p className="text-green-100 mb-4 text-sm">
                Entre em contato pelo WhatsApp e tire todas suas dúvidas!
              </p>
              <a
                href={formatWhatsAppUrl(cartao.telefone, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                Agendar Agora
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-2">
            Gostou deste cartão digital?
          </p>
          <a 
            href="/"
            className="inline-block text-green-600 hover:text-green-700 font-medium text-sm"
          >
            Crie o seu gratuitamente no GroomerLink →
          </a>
        </div>
      </div>
    </div>
  )
}

// Metadata dinâmica para SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}) {
  const { username } = await params
  const cartao = await getCartao(username)

  if (!cartao) {
    return {
      title: 'Cartão não encontrado - GroomerLink',
    }
  }

  const title = cartao.nomeEstabelecimento 
    ? `${cartao.nomeGroomer} - ${cartao.nomeEstabelecimento}`
    : cartao.nomeGroomer

  return {
    title: `${title} | GroomerLink`,
    description: `Cartão digital de ${cartao.nomeGroomer}. Veja serviços, horários e entre em contato pelo WhatsApp.`,
    openGraph: {
      title,
      description: `Pet groomer profissional. Entre em contato: ${cartao.telefone}`,
      type: 'profile',
    },
  }
}