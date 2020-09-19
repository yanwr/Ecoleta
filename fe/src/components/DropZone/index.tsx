import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface DropComponentProps {
    onSelectFile: (file: File) => void;
};

const DropZoneComponent:React.FC<DropComponentProps> = ({ onSelectFile }) => {
    const [fileURL, setFileURL] = useState('');
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setFileURL(URL.createObjectURL(file));
        onSelectFile(file);
    }, [onSelectFile]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*'});
    return (
        <div className={"container-dropzone"} {...getRootProps()}>
            <input {...getInputProps()} accept={"image/*"}/>
            {
                fileURL 
                ? <img src={fileURL} alt={"Image"} />
                : <p>
                    <FiUpload />
                    {
                        isDragActive ?
                        " Drop the files here ... ":
                        "Drag drop some files here, or click to select files"
                    }
                </p>
            }
        </div>
    );
};
export default DropZoneComponent;