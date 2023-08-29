import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';

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
  const {push} = useRouter();
  const editorRef:any = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {user}:any=useSession()
  async function save(e:any){
    e.preventDefault()
    setLoading(true)
    if (editorRef.current) {
      const content = editorRef.current.getContent();
    
      setDirty(false);
      editorRef.current.setDirty(false);
      const data:any = {
        name: user.name,
        title: e.target.title.value,
        content: content
      }
      // an application would save the editor content to the server here
      const result = await fetch('/api/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    if(result.status === 200){
        setLoading(false)
        // e.target.reset()
        push('/signin')
    }
    else {
        setLoading(false);
        const errorResponse = await result.json();
        if (errorResponse && errorResponse.message) {
          setError(errorResponse.message);
        } else {
          setError('Terjadi kesalahan'); 
        }
      }
      console.log(content);
      
    }
  };
  const handlePublish = () =>{
    
  }
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
    <>
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
      initialValue='<p><span style="font-size: 42pt;"><strong>Judul Artikel</strong></span></p>
      <p>&nbsp;</p>'
      onEditorChange={handleEditorChange}
    />
    {/* <button onClick={handlePublish} className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl absolute right-10 top-6 z-[99999999]'>Publish</button> */}
    <button className='bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl absolute right-10 top-6 z-[99999999]' onClick={save} disabled={!dirty}>Save</button>
      {dirty && <p>You have unsaved content!</p>}
    <input type="text" placeholder='Masukkan judul' name='title' id='title' className='w-[1200px] font-bold text-xl absolute top-28 py-4 mx-4 border-b-2 focus:outline-none' />
    </>
  );
}
