'use client'

import { useState } from 'react'
import Link from 'next/link'
import { APP_CONFIG, MOCK_DATA } from '@/lib/config'

interface FormData {
  nomeGroomer: string
  nomeEstabelecimento: string
  telefone: string
  instagram: string
  endereco: string
  emailEdicao: string
  horarios: Array<{
    dia: string
    abertura: string
    fechamento: string
    fechado?: boolean
  }>
  servicos: Array<{
    nome: string
    preco?: number
  }>
  foto?: string
}

export default function CriarCartao() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nomeGroomer: '',
    nomeEstabelecimento: '',
    telefone: '',
    instagram: '',
    endereco: '',
    emailEdicao: '',
    horarios: MOCK_DATA.horarios,
    servicos: [{ nome: '', preco: 0 }],
  })

  const [createdCard, setCreatedCard] = useState<{
    id: string
    username: string
    url: string
  } | null>(null)

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addServico = () => {
    setFormData(prev => ({
      ...prev,
      servicos: [...prev.servicos, { nome: '', preco: 0 }]
    }))
  }

  const removeServico = (index: number) => {
    setFormData(prev => ({
      ...prev,
      servicos: prev.servicos.filter((_, i) => i !== index)
    }))
  }

  const updateServico = (index: number, field: 'nome' | 'preco', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      servicos: prev.servicos.map((servico, i) => 
        i === index ? { ...servico, [field]: value } : servico
      )
    }))
  }

  const updateHorario = (index: number, field: 'abertura' | 'fechamento' | 'fechado', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      horarios: prev.horarios.map((horario, i) => 
        i === index ? { ...horario, [field]: value } : horario
      )
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/cartoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          horarios: JSON.stringify(formData.horarios),
          servicos: JSON.stringify(formData.servicos.filter(s => s.nome.trim())),
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar cartão')
      }

      const result = await response.json()
      setCreatedCard(result.cartao)
      setCurrentStep(4)
    } catch (error) {
      alert('Erro ao criar cartão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (createdCard) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Cartão criado com sucesso!
          </h1>
          <p className="text-gray-600 mb-6">
            Seu cartão digital está pronto e pode ser acessado através do link abaixo:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Seu link personalizado:</p>
            <p className="font-mono text-green-600 font-medium break-all">
              groomerlink.com{createdCard.url}
            </p>
          </div>
          <div className="space-y-3">
            <Link 
              href={createdCard.url}
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Ver Meu Cartão
            </Link>
            <Link 
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-6">
            💡 Salve este link! Você precisará do email cadastrado para editar depois.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">GroomerLink</span>
            </Link>
            <div className="text-sm text-gray-500">
              Passo {currentStep} de 3
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informações Básicas
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seu nome completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nomeGroomer}
                      onChange={(e) => updateFormData('nomeGroomer', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      placeholder="Ex: Maria Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do estabelecimento
                    </label>
                    <input
                      type="text"
                      value={formData.nomeEstabelecimento}
                      onChange={(e) => updateFormData('nomeEstabelecimento', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      placeholder="Ex: Pet Shop da Maria"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => updateFormData('telefone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        @
                      </span>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => updateFormData('instagram', e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                        placeholder="seu.usuario"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço completo *
                    </label>
                    <textarea
                      value={formData.endereco}
                      onChange={(e) => updateFormData('endereco', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      placeholder="Rua das Flores, 123 - Centro - São Paulo, SP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email para edição *
                    </label>
                    <input
                      type="email"
                      value={formData.emailEdicao}
                      onChange={(e) => updateFormData('emailEdicao', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      placeholder="seu@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Usado para editar seu cartão posteriormente
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.nomeGroomer || !formData.telefone || !formData.endereco || !formData.emailEdicao}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Próximo: Horários
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Horários de Funcionamento
                </h2>
                
                <div className="space-y-4">
                  {formData.horarios.map((horario, index) => (
                    <div key={horario.dia} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-24 text-sm font-medium text-gray-700">
                        {horario.dia.substring(0, 3)}
                      </div>
                      
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={horario.fechado ? '' : horario.abertura}
                          onChange={(e) => updateHorario(index, 'abertura', e.target.value)}
                          disabled={horario.fechado}
                          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-gray-900"
                        />
                        <span className="text-gray-500">às</span>
                        <input
                          type="time"
                          value={horario.fechado ? '' : horario.fechamento}
                          onChange={(e) => updateHorario(index, 'fechamento', e.target.value)}
                          disabled={horario.fechado}
                          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-gray-900"
                        />
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={horario.fechado || false}
                          onChange={(e) => updateHorario(index, 'fechado', e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-600">Fechado</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Próximo: Serviços
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Serviços e Preços
                </h2>
                
                <div className="space-y-4">
                  {formData.servicos.map((servico, index) => (
                    <div key={index} className="flex gap-3 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="text"
                        value={servico.nome}
                        onChange={(e) => updateServico(index, 'nome', e.target.value)}
                        placeholder="Ex: Banho e Tosa"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">R$</span>
                        <input
                          type="number"
                          value={servico.preco || ''}
                          onChange={(e) => updateServico(index, 'preco', Number(e.target.value))}
                          placeholder="40"
                          className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      {formData.servicos.length > 1 && (
                        <button
                          onClick={() => removeServico(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={addServico}
                  className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-colors"
                >
                  + Adicionar Serviço
                </button>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                  >
                    {isLoading ? 'Criando...' : 'Criar Cartão'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preview do Cartão</h3>
              
              <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="text-xl font-bold">
                    {formData.nomeGroomer || 'Seu Nome'}
                  </h4>
                  {formData.nomeEstabelecimento && (
                    <p className="text-green-100">
                      {formData.nomeEstabelecimento}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-white bg-opacity-20 backdrop-blur py-2 rounded-lg font-medium">
                    📱 WhatsApp
                  </button>
                  {formData.instagram && (
                    <button className="w-full bg-white bg-opacity-20 backdrop-blur py-2 rounded-lg font-medium">
                      📷 Instagram
                    </button>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white border-opacity-20 space-y-2 text-sm">
                  {formData.endereco && (
                    <p>📍 {formData.endereco}</p>
                  )}
                  
                  {formData.horarios.some(h => !h.fechado) && (
                    <div>
                      <p className="font-medium">🕒 Horários:</p>
                      {formData.horarios
                        .filter(h => !h.fechado && h.abertura && h.fechamento)
                        .slice(0, 2)
                        .map(h => (
                          <p key={h.dia} className="text-green-100">
                            {h.dia}: {h.abertura} às {h.fechamento}
                          </p>
                        ))}
                    </div>
                  )}

                  {formData.servicos.some(s => s.nome) && (
                    <div>
                      <p className="font-medium">✂️ Serviços:</p>
                      {formData.servicos
                        .filter(s => s.nome)
                        .slice(0, 3)
                        .map((s, i) => (
                          <p key={i} className="text-green-100">
                            {s.nome} {s.preco ? `- R$ ${s.preco}` : ''}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}