import { useRef, useState, useCallback } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  label: string
  value: string | null
  onChange: (base64: string | null) => void
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_DIMENSION = 1600

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)

        const base64 = canvas.toDataURL('image/jpeg', 0.8)
        resolve(base64)
      }
      img.onerror = () => reject(new Error('Error al cargar la imagen'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('Error al leer el archivo'))
    reader.readAsDataURL(file)
  })
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)

      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten imágenes (JPG, PNG, WebP)')
        return
      }

      if (file.size > MAX_SIZE) {
        setError('La imagen no debe superar los 5MB')
        return
      }

      try {
        const base64 = await compressImage(file)
        onChange(base64)
      } catch {
        setError('Error al procesar la imagen')
      }
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  if (value) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-emerald-800">
          {label}
        </label>
        <div className="relative overflow-hidden rounded-xl border-2 border-emerald-300 bg-emerald-50">
          <img
            src={value}
            alt="Captura subida"
            className="mx-auto max-h-48 object-contain p-2"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-emerald-800">
        {label}
      </label>
      <div
        onDragOver={e => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-6 transition-colors ${
          dragOver
            ? 'border-emerald-500 bg-emerald-100'
            : 'border-emerald-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'
        }`}
      >
        <div className="rounded-full bg-emerald-100 p-3">
          {dragOver ? (
            <ImageIcon className="h-6 w-6 text-emerald-600" />
          ) : (
            <Upload className="h-6 w-6 text-emerald-600" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-emerald-700">
            Arrastra tu captura aquí
          </p>
          <p className="text-xs text-gray-500">o haz clic para seleccionar</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
