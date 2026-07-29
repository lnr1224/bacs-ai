import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Send, Sparkles, Loader2, Bot, User, RefreshCw, MessageSquareText } from 'lucide-react';
import { BusinessJSON, IntelligenceAnalysis, CopilotMessage } from '../types';

interface StrategyCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  history: CopilotMessage[];
  onUpdateHistory: (history: CopilotMessage[]) => void;
}

const SUGGESTED_PROMPTS = [
  'How do I improve sales?',
  'What is my biggest weakness?',
  'Generate a marketing strategy.',
  'Generate a customer acquisition plan.',
  'How do I increase repeat customers?',
  'Create a pitch deck outline.',
  'Generate investor summary.',
  'Create a landing page layout.',
  'Generate pricing recommendations.',
  'Generate an expansion strategy.'
];

export const StrategyCopilotDrawer: React.FC<StrategyCopilotDrawerProps> = ({
  isOpen,
  onClose,
  businessJson,
  analysis,
  history,
  onUpdateHistory
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: CopilotMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...history, userMsg];
    onUpdateHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessJson,
          analysis,
          stage: businessJson.business.stage,
          messages: newHistory,
          userQuery: queryText.trim()
        })
      });

      if (!res.ok) throw new Error('Copilot endpoint failed');
      const data = await res.json();

      const botMsg: CopilotMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text || 'I have analyzed your request based on your Business JSON.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onUpdateHistory([...newHistory, botMsg]);
    } catch (err) {
      console.error('Error in Strategy Copilot:', err);
      const errorMsg: CopilotMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: `**Strategic Analysis for ${businessJson.business.name}**:\n\nBased on your Business JSON, your top priority should be addressing your primary risk factor: *"${analysis.realityCheck?.[0]?.assumption || 'Pricing validation'}"*.\n\n*Action Step*: Run a low-cost experiment to confirm customer demand before expanding capital spend.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onUpdateHistory([...newHistory, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  BACS Strategy Copilot
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-bold uppercase">
                  Grounded AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grounded strictly in {businessJson.business.name}'s Business JSON Memory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Ask Anything About Your Business
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  I diagnose sales, pricing, acquisition, and expansion strategies using your exact Business JSON metrics.
                </p>
              </div>
            </div>
          ) : (
            history.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-violet-600 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm max-w-lg ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                  ) : (
                    <div className="markdown-body text-xs sm:text-sm leading-relaxed space-y-2">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                  <span
                    className={`text-[10px] block mt-1 ${
                      msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center space-x-3 text-slate-400 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-violet-600" />
              <span>Diagnosing Business JSON memory...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
            Suggested Prompts
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs whitespace-nowrap px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              disabled={loading}
              placeholder="Ask Strategy Copilot a business question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-sm flex items-center space-x-1 shadow-md shadow-violet-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
