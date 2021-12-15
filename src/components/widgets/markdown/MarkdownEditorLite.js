
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MdParser from './MdParser';

const MarkdownEditorLite = ({
  description, setDescription
}) => {
  let mdEditor = null;

  const handleEditorChange = ({ text }) => {
      setDescription(text);
  };

  const handleImageUpload = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      const convertBase64UrlToBlob = (urlData) => {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type:mime})
      };
      const blob = convertBase64UrlToBlob(reader.result);
      setTimeout(() => {
        callback('https://avatars0.githubusercontent.com/u/21263805?s=40&v=4')
      }, 1000)
    };
    reader.readAsDataURL(file)
  };

  const renderHTML= (text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MdParser.render(text))
      }, 0)
    })
  };

  const mde = <MdEditor
      ref={node => mdEditor = node}
      value={description}
      style={{height: '500px' }}
      renderHTML={renderHTML}
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
      onChange={ handleEditorChange }
      onImageUpload={ handleImageUpload }
    />

  return (
      <div>
        <section style={{ height: 500 + 'px' }}>
          { mde }
        </section>
      </div>
  )
};

export default MarkdownEditorLite;

