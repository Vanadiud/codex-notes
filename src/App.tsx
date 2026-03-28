import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

function App() {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!holderRef.current) return;
    if (editorRef.current) return;

    const savedData = localStorage.getItem("notes");

    editorRef.current = new EditorJS({
      holder: holderRef.current,
      placeholder: "Scrie conspectul aici... 📚",
      data: savedData ? JSON.parse(savedData) : undefined,
    });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const saveData = async () => {
    const data = await editorRef.current?.save();

    localStorage.setItem("notes", JSON.stringify(data));

    alert("✅ Conspect salvat local!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>📚 Codex Notes</h1>

      <button onClick={saveData}>💾 Save Conspect</button>

      <div
        ref={holderRef}
        style={{
          marginTop: 20,
          background: "white",
          color: "black",
          padding: 20,
          borderRadius: 10,
          minHeight: 300,
        }}
      />
    </div>
  );
}

export default App;
