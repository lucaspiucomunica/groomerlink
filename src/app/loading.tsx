export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            {/* Logo animado */}
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            
            {/* Círculo de loading */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Carregando...
          </h2>
          <p className="text-sm text-gray-500">
            Buscando as informações do cartão
          </p>
        </div>
      </div>
    )
  }