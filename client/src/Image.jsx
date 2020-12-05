import React, { useState, useEffect } from 'react'

export default function Image({ file }) {

    const [url, setUrl] = useState(null)
    const [progress, setProgress] = useState(0)

    const fileReader = new FileReader();
    fileReader.onload = () => {
        const arrayBuffer = fileReader.result
        const blob = new Blob([arrayBuffer], [file.type])
        const blobUrl = URL.createObjectURL(blob)
        setUrl(blobUrl)
        setProgress(100)
    }
    fileReader.onprogress = (e) => {
        // evt is an ProgressEvent.
        if (e.lengthComputable) {
            const percentLoaded = Math.round((e.loaded / e.total) * 100);
            setProgress(percentLoaded)
        }
    }

    useEffect(() => {
        fileReader.readAsArrayBuffer(file)
    }, [file])

    return (
        <li className='imageList__element' >
            {<Loader progress={progress} />}
            {url && <img className='imageList__image' alt={file.filename} src={url} />}
        </li>
    )
}


function Loader({ progress }) {
    return (
        <div className='loader'>
            <span className='loader__progressBar' style={{ width: `${progress}%` }}></span>
        </div>
    )
}