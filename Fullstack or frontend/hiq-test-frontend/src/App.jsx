import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:5000/api/process', {
        method: 'POST',
        body: formData,
      })

      const data = await response.text()
      setResult(data)
    } catch (error) {
      console.error('Upload failed:', error)
      setResult(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Text File Processor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} accept=".txt" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Bearbetar...' : 'Ladda upp & Bearbeta'}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Bearbetad text:</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}

export default App
