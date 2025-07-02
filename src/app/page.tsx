import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">GroomerLink</h1>
            </div>
            <Link 
              href="/criar"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Criar Meu Cartão
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Seu cartão digital 
              <span className="text-green-600"> profissional</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Crie um cartão digital elegante com todas suas informações profissionais. 
              Perfeito para colocar na bio do Instagram, WhatsApp Status e redes sociais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/criar"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors text-center"
              >
                Criar Cartão Grátis
              </Link>
              <Link 
                href="#exemplo"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-medium text-lg transition-colors text-center"
              >
                Ver Exemplo
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sem instalação</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Mobile-first</span>
              </div>
            </div>
          </div>

          <div className="lg:text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🐕</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Maria Silva</h3>
                <p className="text-gray-600">Pet Shop da Maria</p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  📱 WhatsApp
                </button>
                <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  📷 Instagram
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-600">📍 Rua das Flores, 123 - SP</p>
                <p className="text-gray-600">🕒 Seg-Sex: 8h às 18h</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">groomerlink.com/maria-silva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que usar o GroomerLink?
            </h2>
            <p className="text-xl text-gray-600">
              Simplifique a forma como seus clientes te encontram e entram em contato
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Um só link</h3>
              <p className="text-gray-600">
                Todas suas informações em uma única URL personalizada para compartilhar
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile-first</h3>
              <p className="text-gray-600">
                Otimizado para celular, onde seus clientes mais acessam
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fácil de usar</h3>
              <p className="text-gray-600">
                Crie em minutos, sem precisar de conhecimento técnico
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Aumente seus agendamentos
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contato direto pelo WhatsApp</h3>
                    <p className="text-gray-600">Clientes podem te chamar com um clique</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mostre seus serviços e preços</h3>
                    <p className="text-gray-600">Transparência que gera confiança</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horários sempre atualizados</h3>
                    <p className="text-gray-600">Evite ligações fora do horário</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Localização clara</h3>
                    <p className="text-gray-600">Facilite para o cliente te encontrar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-center mb-6">Exemplo de uso:</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      💬 "Coloque groomerlink.com/seunome na bio do Instagram"
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      📧 "Envie por email para clientes"
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      📱 "Compartilhe no WhatsApp Status"
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      🏪 "Cole na vitrine do seu petshop"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para criar seu cartão digital?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Leva menos de 5 minutos e é completamente gratuito
          </p>
          <Link 
            href="/criar"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
          >
            Criar Meu Cartão Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="ml-2 text-white font-semibold">GroomerLink</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 GroomerLink. Cartão digital para pet groomers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}