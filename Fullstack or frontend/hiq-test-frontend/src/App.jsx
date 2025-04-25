import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Layout from './Layout'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setError('')
    setResult(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Vänligen välj en fil först.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://localhost:5000/api/process', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Något gick fel vid uppladdningen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-800">📁 Text File Processor</h1>

          {/* File Upload Card */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Ladda upp en .txt-fil</label>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-600"
                />
                {file && <p className="text-sm text-gray-500 mt-1">📄 Vald fil: {file.name}</p>}
              </div>

              <button
                type="submit"
                className="bg-[#9933FF] hover:bg-[#812be0] text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin h-5 w-5" />}
                {loading ? 'Bearbetar...' : 'Ladda upp & Bearbeta'}
              </button>
            </form>
            {error && (
              <div className="text-red-600 bg-red-100 p-3 rounded-xl">{error}</div>
            )}
          </div>

          {/* Result Card */}
          {result && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Word Card */}
              <div className="bg-white rounded-2xl shadow p-6 border border-[#9933FF]/20">
                <h2 className="text-lg font-semibold text-[#9933FF] mb-2">Vanligaste ordet</h2>
                <div className="text-2xl font-mono text-gray-800 bg-gray-100 p-3 rounded-xl inline-block">
                  {result.mostUsed}
                </div>
              </div>

              {/* Text Card */}
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Bearbetad text</h2>
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 bg-gray-50 p-4 rounded-xl">
                  {result.modified}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>

  )
}

export default App
