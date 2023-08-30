import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { FaTimes, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

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

  async function save(e:any){
    e.preventDefault()
    setLoading(true)
    console.log(value);
    if (editorRef.current) {
      const content = editorRef.current.getContent();
    
      setDirty(false);
      editorRef.current.setDirty(false);
      const data:any = {
        name: session?.user?.name,
        title: value,
        content: content,
        create_at: new Date()
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
    <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder='Masukkan judul' name='title' id='title' className=' text-lg focus:border-black  border-b-2 focus:outline-none p-2' />
    <button className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl ' onClick={save}>{loading ? 'Loading...' : 'Publish'}</button>
    </div>
   
    {/* <button onClick={handlePublish} className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl absolute right-10 top-6 z-[99999999]'>Publish</button> */}
    
    
    </div>
  );
}
