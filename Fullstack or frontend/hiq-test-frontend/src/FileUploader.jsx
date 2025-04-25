import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Button from './components/Button'
import { H1, H2, Paragraph, Label } from './components/Typography'
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
        <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="flex justify-center text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <UploadCloud className="h-7 w-7 text-[#9933FF]" />
                    Text File Processor
                </h1>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${isDragActive
                        ? 'border-[#9933FF] bg-purple-50'
                        : 'border-gray-300 hover:border-[#9933FF]/40'
                        }`}
                >
                    <input {...getInputProps()} />
                    <p className="text-gray-500 text-sm">
                        {isDragActive
                            ? 'Släpp filen här...'
                            : 'Dra in en .txt-fil här eller klicka på knappen nedan'}
                    </p>
                </div>

                {/* File info */}
                {file && (
                    <p className="text-sm text-gray-600 flex justify-center items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        {file.name}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-4">
                    <Button
                        onClick={open}
                        size="xl"
                        variant="success"
                        icon={UploadCloud}
                        className="w-full sm:w-auto max-w-xs mx-auto"
                    >
                        Välj fil
                    </Button>

                    <Button
                        onClick={() => file && onUpload(file)}
                        size="xl"
                        variant="primary"
                        loading={loading}
                        disabled={!file}
                        className="w-full sm:w-auto max-w-xs mx-auto"
                    >
                        Ladda upp & Bearbeta
                    </Button>
                </div>

                {/* Upload complete feedback */}
                {uploadComplete && (
                    <div className="flex items-center justify-center font-medium">
                        <CheckCircle2 className="w-5 h-5" />
                        Uppladdning lyckades – 100%
                    </div>
                )}
            </div>
        </div>
    )
}
