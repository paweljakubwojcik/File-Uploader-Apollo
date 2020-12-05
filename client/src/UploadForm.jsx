import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import Image from './Image'

const UPLOAD_FILE = gql`
    mutation singleUpload($file: Upload!){
        singleUpload(file:$file){
            url
        }
    }

`

function UploadForm() {

    const [files, setFiles] = useState([])
    const [images, setImages] = useState(null)
    const [links, setLinks] = useState(null)

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ singleUpload: { url } }) => {
            setLinks(links => links ? links.concat(url) : [url])
            console.log(links)
        }
    })

    const handleChange = (e) => {
        const files = e.target.files
        setFiles(files)
        setImages(Array.from(files))
        console.log('change')
        setLinks(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Array.from(files).forEach(file => uploadFile({ variables: { file } }))
        setImages(null)
        setFiles([])
    }


    useEffect(() => {
        console.log(files)
    }, [files])



    return (
        <>
            <h1>Choose Your File</h1>
            {images && <ul className='imageList'>
                {images.map(file => <Image file={file} key={file.name} />)}
            </ul>}
            {links && <ul className='links'>
                <h2>Links to your files:</h2>
                {links.map(link => <li key={link}>
                    <a href={link}>
                        {link}
                    </a>
                </li>)}
            </ul>}
            <form className='uploadForm' onSubmit={handleSubmit}>
                <div className={`uploadForm__inputContainer ${images && 'small'}`}>
                    <label className='uploadForm__label' htmlFor="upload"> Click here or drop files </label>
                    <input className='uploadForm__input' type="file" name="upload" id="upload" onChange={handleChange} multiple />
                </div>
                <button className='uploadForm__button' type="submit" onClick={e => e.target.blur()}>Upload</button>
            </form>

        </>
    )
}


export default UploadForm

