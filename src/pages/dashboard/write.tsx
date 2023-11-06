import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { FaTimes, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import classNames from "classnames"; 
const RemoveImagePlugin = (editor:any) => {
    editor.ui.registry.addMenuItem('removeimage', {
      text: 'Remove Image',
      onAction: () => {
        const selectedNode = editor.selection.getNode();
        if (selectedNode.nodeName === 'IMG') {
          editor.selection.select(selectedNode);
          editor.selection.setContent('');
        }
      },
    });
  
    editor.ui.registry.addButton('removeimage', {
      icon: 'remove',
      tooltip: 'Remove Image',
      onAction: () => {
        const selectedNode = editor.selection.getNode();
        if (selectedNode.nodeName === 'IMG') {
          editor.selection.select(selectedNode);
          editor.selection.setContent('');
        }
      },
    });
  };
export default function Write() {
  const [value, setValue] = useState('');
  const {push} = useRouter();
  const editorRef:any = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage]:any = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  async function save(e:any){
    e.preventDefault()
    setLoading(true)
    console.log(value);
    if (!selectedImage){
      setSelectedImage('logo-aeli-putih.png')
    }
    if (editorRef.current) {
      const content = editorRef.current.getContent();
    
      setDirty(false);
      editorRef.current.setDirty(false);
      const data:any = {
        name: session?.user?.name,
        title: value,
        content: content,
        create_at: new Date(),
        image:selectedImage
      }
      console.log(data);
      // an application would save the editor content to the server here
      const result = await fetch('/api/addarticles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    
    if(result.status === 200){
        setLoading(false)
        // e.target.reset()
        push('/articles')
    }
    else {
        setLoading(false);
        const errorResponse = await result.json();
        if (errorResponse) {
          setError(errorResponse.message);
        } else {
          setError('Terjadi kesalahan'); 
        }
      }
      
      
    }
  };

  const handleEditorChange = (content:any, editor:any) => {
    console.log(content);
  };
  
  const handleFilePicker = (callback:any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async (event:any) => {
      const file = event.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      callback(blobUrl, { alt: file.name });
    };

    input.click();
  };

  return (
    <div className='relative w-full h-screen'>
      {
      isOpen && (
        <div className="flex h-full  fixed flex-col justify-center items-center w-full z-[99999999999] backdrop-blur-xl overflow-hidden">
      <div className="bg-white rounded-xl flex flex-col gap-10 p-10 w-[450px] border-2 overflow-y-auto">
        <div className='flex flex-row-reverse'>
          <button onClick={() => setIsOpen(!isOpen)}><FaTimes size={20}></FaTimes></button>
        </div>
  
        {selectedImage && (
          <div>
            <div className='p-4 bg-gray-50 flex flex-col justify-center items-center' >
            <div className='flex flex-row-reverse w-full'>
              <button onClick={() => setSelectedImage(null)}><FaTimes size={20}></FaTimes></button>
            </div>
            <img
              alt="not found"
              width={"250px"}
              src={selectedImage}
            />
            </div>
          
          </div>
        )}
        <div className='flex flex-col gap-4'>
          <label htmlFor="title">Judul Artikel</label>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder='Masukkan judul artikel anda' name='title' id='title' className=' focus:border-black rounded-lg  border focus:outline-none p-2' />
        </div>
        
        <div className='flex flex-col gap-4'>
          <h1>Masukkan Gambar Thumbnail</h1>
        <input
        className={classNames({
          // button colors
          "file:bg-violet-50 file:text-black hover:file:bg-violet-100": true,
          // button shape and spacing
          "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
          "file:px-4 file:py-2 file:mr-4 file:border-none": true,
          // overall input styling
          "hover:cursor-pointer border rounded-lg text-gray-400": true,
        })}
          type="file"
          name="myImage"
          onChange={(event:any) => {
            const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
      const base64Data = e.target.result; // Base64-encoded string
      setSelectedImage(base64Data); // Simpan data Base64 ke dalam state
    };
    reader.readAsDataURL(file);
          }}
        />
        <label htmlFor="myImage" className='text-gray-400'>SVG, PNG, JPG (rekomendasi: ukuran 1x1).</label>
        </div>
        
        <button className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl ' onClick={save}>{loading ? 'Loading...' : 'Publish'}</button>
        
      </div>
      </div>
      )
    }
       <div className='absolute right-10 bottom-10 z-[999999999999]'> 
        {error && (
          <div className='flex flex-row gap-4 text-red-500  bg-red-100 border border-red-500 p-1 px-3 rounded-xl justify-center items-center'>
            <FaExclamationCircle size={15}></FaExclamationCircle>
            <p className=''>
            {error}
          </p>
          <button className='text-black' onClick={() => setError("")}><FaTimes size={15}></FaTimes></button>

          </div>
          
        )}
      </div>
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      id='editor'
      onInit={(evt, editor) => {
        editorRef.current = editor;
        RemoveImagePlugin(editor);
      }}
      onDirty={() => setDirty(true)}
      init={{
        branding: false,
        height: 1000,
        plugins: 'image',
        image_title: false,
        automatic_uploads: false,
        file_picker_types: 'image',
        file_picker_callback: handleFilePicker,
        
      }}
      initialValue="<div style='border: 1px solid #ccc; padding: 5px >apa
      </div>"
      onEditorChange={handleEditorChange}
    />
    
   
    <div className='absolute right-10 top-6 z-[99999999] flex flex-row gap-10 justify-center items-center'>
    <button className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl ' onClick={() => setIsOpen(!isOpen)}>{loading ? 'Loading...' : 'Save'}</button>
    
    
    
    </div>
   
    {/* <button onClick={handlePublish} className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl absolute right-10 top-6 z-[99999999]'>Publish</button> */}
    
    
    </div>
  );
}
