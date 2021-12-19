import dynamic from "next/dynamic";


const MdEditorDynamic = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});

export default MdEditorDynamic;
