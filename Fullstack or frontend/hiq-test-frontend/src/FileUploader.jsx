import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Button from './components/Button'
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react'

export default function FileUploader({ onUpload, loading, uploadComplete }) {
  const [file, setFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    onUpload(selectedFile)
  }, [onUpload])

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: { 'text/plain': ['.txt'] },
  })

  return (
    <div className="flex items-center justify-center bg-[#F9FAFB] px-4 py-10">
      <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
        
        <h1 className="flex justify-center text-3xl font-bold text-[#1F2937] gap-2">
          <UploadCloud className="h-7 w-7 text-[#6366F1]" />
          Text File Processor
        </h1>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${isDragActive
            ? 'border-[#6366F1] bg-[#EEF2FF]'
            : 'border-[#D1D5DB] hover:border-[#A5B4FC]'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-[#6B7280] text-sm">
            {isDragActive
              ? 'Släpp filen här...'
              : 'Dra in en .txt-fil här eller klicka på knappen nedan'}
          </p>
        </div>

        {/* File info */}
        {file && (
          <p className="text-sm text-[#6B7280] flex justify-center items-center gap-2">
            <FileText className="w-4 h-4 text-[#9CA3AF]" />
            {file.name}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-4">
          <Button
            onClick={open}
            size="xl"
            icon={UploadCloud}
            className="w-full sm:w-auto max-w-xs mx-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors duration-200"
          >
            Välj fil
          </Button>

          <Button
            onClick={() => file && onUpload(file)}
            size="xl"
            loading={loading}
            disabled={!file}
            className="w-full sm:w-auto max-w-xs mx-auto bg-[#34D399] hover:bg-[#10B981] text-white disabled:bg-[#D1D5DB] transition-colors duration-200"
          >
            Ladda upp & Bearbeta
          </Button>
        </div>

        {/* Upload complete feedback */}
        {uploadComplete && (
          <div className="flex items-center justify-center font-medium h-[50px] text-[#10B981]">
            <CheckCircle2 className="w-5 h-5" />
            Uppladdning lyckades – 100%
          </div>
        )}
      </div>
    </div>
  )
}
