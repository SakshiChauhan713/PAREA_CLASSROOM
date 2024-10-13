import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../button'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

    const [file, setFile] = useState<File[]>([]);
    const [FileUrl, setFileUrl] = useState('');

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.svg'] ,
                // 'application/*': ['.pdf', 'vnd.ms-powerpoint', 'msword' ], // for PDF files
                // // 'application/vnd.ms-powerpoint', // for PPT files
                // // 'application/msword', // for DOC files
                // 'text/*':['plain'], // for TXT files  
        }
    })

    return (
        <div {...getRootProps()} className=' scroll-smooth flex flex-center flex-col bg-dark-3 rounded-xl w-10/12 cursor-pointer text-center '>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                FileUrl ? (
                    <>
                    <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                        <img
                            src={FileUrl}
                            alt="image"
                            className='file_uploader-img'
                        />
                        
                    </div>
                    <p className='file_uploader-label'>Click or Drag image to Replace.</p>
                    </>
                ) : (
                    <div className='file_uploader-box'>
                        <img
                            src='/assets/icons/file-upload.svg'
                            width={96}
                            height={77}
                            alt='file-upload'
                        />
                        <h3 className='base-medium text-light-4 mb-2 mt-6'>Drag photo here.</h3>
                        <p className='text-light-4 small-regular mb-6'>PDF, JPG, PNG</p>
                        <Button className='shad-button_primary ml-4 mb-2 mt-2  '>
                            Select from Computer.
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader

