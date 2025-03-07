import { useEffect, useRef } from 'react';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

const MarkdownEditor = ({ value, onChange, placeholder, maxHeights }) => {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    console.log(onChange)
    useEffect(() => {
        if (!editorRef.current && textareaRef.current) {

            editorRef.current = new EasyMDE({
                element: textareaRef.current,
                initialValue: value,
                toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "fullscreen"],
                spellChecker: false,
                maxHeight: maxHeights,
            });

            editorRef.current.codemirror.on('change', () => {

                const newValue = editorRef.current.value();
                if (newValue !== value) {
                    onChange(newValue);
                }
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (editorRef.current && editorRef.current.value() !== value) {
            editorRef.current.value(value);
        }
    }, [value]);

    return (
            <textarea
                ref={textareaRef}
                id="markdown-editor"
                placeholder={placeholder}
                style={{ width: '100%', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}
            ></textarea>
    );
};

export default MarkdownEditor;