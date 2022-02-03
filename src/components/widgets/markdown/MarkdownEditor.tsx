import React from 'react';
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import MdEditorDynamic from "@components/widgets/markdown/MarkdownEditorDynamic";


interface MarkdownEditorProps {
  description: string,
  setDescription: (description: string) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ description, setDescription }) => {

  const handleEditorChange = ({ text }: { text: string }) => {
    const newValue = text.replace(/\d/g, "");
    setDescription(newValue);
  };


  const mde = <MdEditorDynamic
      value={ description }
      style={{
        height: "500px"
      }}
      onChange={handleEditorChange}
      renderHTML={text =>
          <div style={{ maxWidth: '500px' }}>
              <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ text }</ReactMarkdown>
          </div>
      }
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
    />

  return (
      <div>
        <section style={{ height: 500 + 'px' }}>
          { mde }
        </section>
      </div>
  )
};

export default MarkdownEditor;

