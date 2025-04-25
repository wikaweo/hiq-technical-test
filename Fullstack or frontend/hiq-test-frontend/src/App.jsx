import { useState } from 'react'

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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Text File Processor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="block"
        />

        {file && <p className="text-sm text-gray-500">Vald fil: {file.name}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Bearbetar...' : 'Ladda upp & Bearbeta'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Vanligaste ordet:</h2>
            <p className="text-blue-700 font-mono">{result.mostUsed}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Bearbetad text:</h2>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
              {result.modified}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
