import { useState } from "react";
import axios from "axios";
import CodeEditors from "./components/CodeEditors";
import LivePreview from "./components/LivePreview";
import { CircleArrowLeft } from "lucide-react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateCode = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL, {
        prompt,
      }); 

      setHtml(res.data.html);
      setCss(res.data.css);
      setJs(res.data.js);
      setShowEditor(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-gray-100">
      {!showEditor ? (
        <div className="flex items-center justify-center min-h-screen p-4 relative">
          <div className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  🚀 AI Website Builder
                </h1>
                <p className="text-gray-300 text-lg">
                  Transform your ideas into beautiful websites instantly
                </p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your website idea... (e.g., Simple portfolio website, E-commerce landing page for sneakers, Interactive todo app with dark theme)"
                    className="w-full p-4 h-32 bg-slate-900/80 border border-slate-600/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {prompt.length}/500
                  </div>
                </div>

                <button
                  onClick={generateCode}
                  disabled={isLoading || !prompt.trim()}
                  className="relative group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating your website...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>✨ Generate Website</span>
                    </div>
                  )}
                </button>

                {isLoading && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span>
                        AI is crafting your website with HTML, CSS, and
                        JavaScript...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-slate-900">
          <div className="p-4 bg-gradient-to-r from-slate-800 to-gray-800 text-center border-b border-slate-700/50 shadow-lg">
            <div className="flex items-center justify-between mx-auto">
              <button
                onClick={() => setShowEditor(false)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  <CircleArrowLeft size={30} />
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <span className="text-purple-400 font-semibold">
                  Generated:
                </span>
                <span className="text-gray-300 italic bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                  {prompt}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Preview</span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row">
            <div className="flex-1 flex flex-col bg-slate-900 border-r border-slate-700/50">
              <CodeEditors
                html={html}
                css={css}
                js={js}
                setHtml={setHtml}
                setCss={setCss}
                setJs={setJs}
              />
            </div>
            <div className="flex-1 bg-white">
              <LivePreview html={html} css={css} js={js} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
