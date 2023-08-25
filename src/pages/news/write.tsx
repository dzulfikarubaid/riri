import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


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
  const editorRef:any = useRef(null);

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
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => {
        editorRef.current = editor;
        RemoveImagePlugin(editor);
      }}
      init={{
        height: 1000,
        plugins: 'image',
        
        image_title: false,
        automatic_uploads: false,
        file_picker_types: 'image',
        file_picker_callback: handleFilePicker,
      }}
      onEditorChange={handleEditorChange}
    />
  );
}
