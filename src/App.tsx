import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

function App() {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    const savedData = localStorage.getItem("notes");

    editorRef.current = new EditorJS({
      holder: holderRef.current,
      placeholder: "Scrie aici... ✍️",
      data: savedData ? JSON.parse(savedData) : undefined,

      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        code: Code,
        delimiter: Delimiter,
        marker: Marker,
        inlineCode: InlineCode,
        image: SimpleImage,
      },
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  const saveData = async () => {
    const data = await editorRef.current?.save();
    localStorage.setItem("notes", JSON.stringify(data));
    alert("Salvat!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>📚 Codex Notes</h1>
      <button onClick={saveData}>💾 Save</button>

      <div
        ref={holderRef}
        style={{
          marginTop: 20,
          background: "white",
          padding: 20,
          borderRadius: 10,
          minHeight: 300,
        }}
      />
    </div>
  );
}

export default App;
