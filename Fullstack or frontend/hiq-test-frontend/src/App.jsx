import { useState } from 'react'
import FileUploader from './FileUploader'
import { Paragraph } from './components/Typography'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setUploadComplete(false)
    setResult(null)

    try {
      const response = await fetch('http://localhost:5000/api/process', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
      setUploadComplete(true)
    } catch (error) {
      alert('Fel vid uppladdning')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <FileUploader
        onUpload={handleUpload}
        loading={loading}
        uploadComplete={uploadComplete}
      />

      {result && (
        <section className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-gray-800">Vanligaste ordet:</h2>
            <Paragraph className="text-2xl font-mono text-purple-700">foo{result.mostUsed}bar</Paragraph>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 text-center">Bearbetad text:</h3>
            <pre className="whitespace-pre-wrap font-mono bg-gray-100 p-6 rounded-xl text-gray-800 shadow-inner max-h-[60vh] overflow-auto">
              {result.modified}
            </pre>
          </div>
        </section>
      )}
    </main>
  )
}
