'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MOCK_DATA } from '@/lib/config'

interface FormData {
  nomeGroomer: string
  nomeEstabelecimento: string
  telefone: string
  instagram: string
  endereco: string
  username: string
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

export default function EditarCartao() {
  const params = useParams()
  const id = params?.id as string

  const [step, setStep] = useState<'verify' | 'edit' | 'success'>('verify')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    nomeGroomer: '',
    nomeEstabelecimento: '',
    telefone: '',
    instagram: '',
    endereco: '',
    username: '',
    horarios: MOCK_DATA.horarios,
    servicos: [{ nome: '', preco: 0 }],
  })

  const [updatedCard, setUpdatedCard] = useState<{
    id: string
    username: string
    url: string
  } | null>(null)

  const verifyEmail = async () => {
    if (!email) {
      setError('Digite seu email')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/cartoes/editar/${id}?email=${encodeURIComponent(email)}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Cartão não encontrado ou email incorreto')
        } else {
          setError('Erro ao verificar email')
        }
        return
      }

      const cartao = await response.json()
      
      // Carregar dados do cartão
      setFormData({
        nomeGroomer: cartao.nomeGroomer,
        nomeEstabelecimento: cartao.nomeEstabelecimento || '',
        telefone: cartao.telefone,
        instagram: cartao.instagram || '',
        endereco: cartao.endereco,
        username: cartao.username,
        horarios: JSON.parse(cartao.horarios || '[]'),
        servicos: JSON.parse(cartao.servicos || '[{"nome":"","preco":0}]'),
        foto: cartao.foto || '',
      })

      setStep('edit')
    } catch (error) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

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
    setError('')
    
    try {
      const response = await fetch(`/api/cartoes/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          emailEdicao: email,
          horarios: JSON.stringify(formData.horarios),
          servicos: JSON.stringify(formData.servicos.filter(s => s.nome.trim())),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao atualizar cartão')
        return
      }

      const result = await response.json()
      setUpdatedCard(result.cartao)
      setStep('success')
    } catch (error) {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Tela de verificação de email
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">📧</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verificar Email
            </h1>
            <p className="text-gray-600">
              Digite o email que você usou ao criar o cartão
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de verificação
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && verifyEmail()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="seu@email.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={verifyEmail}
              disabled={isLoading || !email}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Verificando...' : 'Verificar Email'}
            </button>

            <Link 
              href="/"
              className="block text-center text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Tela de sucesso
  if (step === 'success' && updatedCard) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Cartão atualizado!
          </h1>
          <p className="text-gray-600 mb-6">
            Suas alterações foram salvas com sucesso.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Seu cartão:</p>
            <p className="font-mono text-green-600 font-medium break-all">
              groomerlink.com{updatedCard.url}
            </p>
          </div>
          <div className="space-y-3">
            <Link 
              href={updatedCard.url}
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Ver Cartão Atualizado
            </Link>
            <Link 
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Tela de edição
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
              Editando cartão
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Editar Cartão
            </h2>

            <div className="space-y-6">
              {/* Informações Básicas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informações Básicas
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seu nome completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nomeGroomer}
                      onChange={(e) => updateFormData('nomeGroomer', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                        className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL personalizada
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        groomerlink.com/
                      </span>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => updateFormData('username', e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="seu-nome"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Apenas letras minúsculas, números e hífens
                    </p>
                  </div>
                </div>
              </div>

              {/* Horários */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Horários de Funcionamento
                </h3>
                <div className="space-y-3">
                  {formData.horarios.map((horario, index) => (
                    <div key={horario.dia} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-20 text-sm font-medium text-gray-700">
                        {horario.dia.substring(0, 3)}
                      </div>
                      
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={horario.fechado ? '' : horario.abertura}
                          onChange={(e) => updateHorario(index, 'abertura', e.target.value)}
                          disabled={horario.fechado}
                          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                        />
                        <span className="text-gray-500 text-sm">às</span>
                        <input
                          type="time"
                          value={horario.fechado ? '' : horario.fechamento}
                          onChange={(e) => updateHorario(index, 'fechamento', e.target.value)}
                          disabled={horario.fechado}
                          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
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
              </div>

              {/* Serviços */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Serviços e Preços
                </h3>
                <div className="space-y-3">
                  {formData.servicos.map((servico, index) => (
                    <div key={index} className="flex gap-3 p-3 border border-gray-200 rounded-lg">
                      <input
                        type="text"
                        value={servico.nome}
                        onChange={(e) => updateServico(index, 'nome', e.target.value)}
                        placeholder="Ex: Banho e Tosa"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">R$</span>
                        <input
                          type="number"
                          value={servico.preco || ''}
                          onChange={(e) => updateServico(index, 'preco', Number(e.target.value))}
                          placeholder="40"
                          className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full mt-3 border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-green-500 hover:text-green-600 transition-colors"
                >
                  + Adicionar Serviço
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.nomeGroomer || !formData.telefone || !formData.endereco}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preview Atualizado</h3>
              
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
                  
                  {formData.username && (
                    <p className="text-green-100">
                      🔗 groomerlink.com/{formData.username}
                    </p>
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