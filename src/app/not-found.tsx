import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🐕</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ops! Cartão não encontrado
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            O cartão que você está procurando não existe ou foi removido.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/criar"
            className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Criar Meu Cartão
          </Link>
          
          <Link 
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">Precisa de ajuda?</p>
          <p>
            Verifique se o link está correto ou entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  )
}