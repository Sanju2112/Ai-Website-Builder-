import { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import Editor from "@monaco-editor/react";

function CodeEditors({ html, css, js, setHtml, setCss, setJs }) {
  const [copied, setCopied] = useState({ html: false, css: false, js: false });

  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 1500);
    });
  };

  const handleDownload = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    formatOnPaste: true,
    formatOnType: true,
  };

  return (
    <div className="flex flex-col h-full p-2 space-y-2">
      {/* HTML */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <label className="text-md font-semibold text-purple-400">HTML</label>
          <div className="flex space-x-2">
            <button onClick={() => handleCopy("html", html)}>
              {copied.html ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400 hover:text-white" />
              )}
            </button>
            <button onClick={() => handleDownload("index.html", html)}>
              <Download size={16} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
        <Editor
          height="220px"
          language="html"
          value={html}
          onChange={(value) => setHtml(value)}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>

      {/* CSS */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <label className="text-md font-semibold text-purple-400">CSS</label>
          <div className="flex space-x-2">
            <button onClick={() => handleCopy("css", css)}>
              {copied.css ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400 hover:text-white" />
              )}
            </button>
            <button onClick={() => handleDownload("style.css", css)}>
              <Download size={16} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
        <Editor
          height="220px"
          language="css"
          value={css}
          onChange={(value) => setCss(value)}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>

      {/* JS */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <label className="text-md font-semibold text-purple-400">JS</label>
          <div className="flex space-x-2">
            <button onClick={() => handleCopy("js", js)}>
              {copied.js ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400 hover:text-white" />
              )}
            </button>
            <button onClick={() => handleDownload("script.js", js)}>
              <Download size={16} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
        <Editor
          height="220px"
          language="javascript"
          value={js}
          onChange={(value) => setJs(value)}
          theme="vs-dark"
          options={editorOptions}
        />
      </div>
    </div>
  );
}

export default CodeEditors;
