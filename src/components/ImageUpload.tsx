'use client'

import React, { useState, useRef } from 'react'

interface ImageUploadProps {
  currentImage?: string
  onImageUpload: (imageUrl: string) => void
  className?: string
}

export default function ImageUpload({ 
  currentImage, 
  onImageUpload, 
  className = '' 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validações no frontend
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Tipo de arquivo não permitido. Use JPEG, PNG ou WebP')
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setUploadError('Arquivo muito grande. Tamanho máximo: 5MB')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro no upload')
      }

      const result = await response.json()
      onImageUpload(result.url)
    } catch (error) {
      console.error('Erro no upload:', error)
      setUploadError(error instanceof Error ? error.message : 'Erro no upload')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Preview da imagem */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
            {currentImage ? (
              <img 
                src={currentImage} 
                alt="Preview da imagem" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Botão de upload sobreposto */}
          <button
            type="button"
            onClick={handleFileSelect}
            disabled={isUploading}
            className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isUploading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Input de arquivo oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Texto de ajuda */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Clique no ícone da câmera para adicionar uma foto de perfil
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Formatos aceitos: JPEG, PNG, WebP • Tamanho máximo: 5MB
          </p>
        </div>

        {/* Erro de upload */}
        {uploadError && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">
            {uploadError}
          </div>
        )}

        {/* Loading state */}
        {isUploading && (
          <div className="text-green-600 text-sm">
            Enviando imagem...
          </div>
        )}
      </div>
    </div>
  )
} 