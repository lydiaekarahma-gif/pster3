import React, { useState, useEffect } from 'react';
import { 
  Wand2, 
  LayoutTemplate, 
  Download, 
  Palette, 
  Type, 
  Share2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { PosterData, GeneratorStatus, FontStyle } from './types';
import { generatePosterContent } from './services/geminiService';
import PosterPreview from './components/PosterPreview';

const DEFAULT_POSTER: PosterData = {
  title: "SUMMER VIBES",
  tagline: "Experience the heat",
  description: "Join us for an unforgettable season of music, art, and community. Don't miss out on the biggest event of the year.",
  primaryColor: "#1e293b",
  secondaryColor: "#f59e0b",
  backgroundColor: "#f1f5f9",
  fontStyle: "sans"
};

function App() {
  const [topic, setTopic] = useState('');
  const [posterData, setPosterData] = useState<PosterData>(DEFAULT_POSTER);
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setStatus(GeneratorStatus.LOADING);
    setErrorMessage(null);
    
    try {
      const generatedData = await generatePosterContent(topic);
      setPosterData(generatedData);
      setStatus(GeneratorStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate poster. Please check your API key configuration or try again.");
      setStatus(GeneratorStatus.ERROR);
    }
  };

  const handleDownload = () => {
    // Basic instruction for user since we aren't using heavy canvas libraries
    alert("Pro Tip: Use your device's screenshot tool to capture the poster in high quality!");
  };

  // Helper to update specific fields
  const updateField = <K extends keyof PosterData>(field: K, value: PosterData[K]) => {
    setPosterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-brand-500" />
            <span className="font-bold text-xl tracking-tight">Poster<span className="text-brand-500">Digital</span></span>
          </div>
          <div className="flex items-center gap-4">
             <a 
               href="https://vercel.com" 
               target="_blank" 
               rel="noreferrer"
               className="text-xs font-mono text-neutral-500 hover:text-white transition-colors"
             >
               Deployed on Vercel
             </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 h-[calc(100vh-6rem)]">
        
        {/* LEFT PANEL: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* AI Generator Section */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-brand-500">
              <Wand2 className="w-5 h-5" />
              <h2 className="font-semibold text-sm uppercase tracking-wider">AI Generator</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="topic" className="text-sm text-neutral-400">What is your poster about?</label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., A minimalist coffee shop opening, a heavy metal concert, a summer tech conference..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-none h-24"
              />
              
              <button
                onClick={handleGenerate}
                disabled={status === GeneratorStatus.LOADING || !topic.trim()}
                className="group flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium py-2.5 rounded-lg transition-all active:scale-[0.98]"
              >
                {status === GeneratorStatus.LOADING ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generatng...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Generate Magic
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="flex items-start gap-2 text-red-400 text-xs bg-red-950/20 p-3 rounded-lg border border-red-900/50">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </section>

          {/* Manual Edits Section */}
          <section className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
             <div className="flex items-center gap-2 text-neutral-400">
              <Palette className="w-5 h-5" />
              <h2 className="font-semibold text-sm uppercase tracking-wider">Customization</h2>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-neutral-500 uppercase">Color Palette</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input 
                    type="color" 
                    value={posterData.backgroundColor}
                    onChange={(e) => updateField('backgroundColor', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-xs text-neutral-500 block text-center mt-1">Background</span>
                </div>
                <div>
                  <input 
                    type="color" 
                    value={posterData.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-xs text-neutral-500 block text-center mt-1">Primary</span>
                </div>
                <div>
                  <input 
                    type="color" 
                    value={posterData.secondaryColor}
                    onChange={(e) => updateField('secondaryColor', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-xs text-neutral-500 block text-center mt-1">Accent</span>
                </div>
              </div>
            </div>

            {/* Typography */}
             <div className="space-y-3">
              <label className="text-xs font-semibold text-neutral-500 uppercase flex items-center gap-2">
                <Type className="w-3 h-3" /> Typography
              </label>
              <div className="flex gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                {(['sans', 'serif', 'mono'] as FontStyle[]).map((font) => (
                  <button
                    key={font}
                    onClick={() => updateField('fontStyle', font)}
                    className={`flex-1 py-1.5 text-xs rounded capitalize transition-colors ${posterData.fontStyle === font ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Content Inputs */}
            <div className="space-y-4">
               <div className="space-y-1">
                 <label className="text-xs text-neutral-500">Title</label>
                 <input 
                   type="text" 
                   value={posterData.title}
                   onChange={(e) => updateField('title', e.target.value)}
                   className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-xs text-neutral-500">Tagline</label>
                 <input 
                   type="text" 
                   value={posterData.tagline}
                   onChange={(e) => updateField('tagline', e.target.value)}
                   className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-xs text-neutral-500">Description</label>
                 <textarea 
                   value={posterData.description}
                   onChange={(e) => updateField('description', e.target.value)}
                   rows={3}
                   className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm focus:border-brand-500 focus:outline-none resize-none"
                 />
               </div>
            </div>

          </section>
        </div>

        {/* RIGHT PANEL: Preview */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 bg-neutral-900/50 rounded-2xl border border-neutral-800 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
             {/* Grid Background Pattern */}
             <div className="absolute inset-0 opacity-10" style={{ 
               backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}></div>
             
             <PosterPreview data={posterData} className="max-w-md lg:max-w-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transform hover:scale-[1.01] transition-transform duration-500" />
          </div>

          <div className="flex justify-end gap-4">
             <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: posterData.title,
                    text: posterData.description,
                    url: window.location.href
                  }).catch(console.error);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
               <Share2 className="w-4 h-4" />
               Share
             </button>
             <button 
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10"
            >
               <Download className="w-4 h-4" />
               Download / Print
             </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
