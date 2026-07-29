import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Loader2, 
  RefreshCw, 
  Zap, 
  HelpCircle,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BusinessJSON, IntelligenceAnalysis, CopilotMessage } from '../types';

interface StrategyCopilotProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  copilotHistory: CopilotMessage[];
  onSaveHistory: (messages: CopilotMessage[]) => void;
}

export const StrategyCopilot: React.FC<StrategyCopilotProps> = ({
  businessJson,
  analysis,
  copilotHistory,
  onSaveHistory
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>(() => {
    if (copilotHistory && copilotHistory.length > 0) return copilotHistory;
    return [
      {
        id: 'welcome_msg',
        sender: 'assistant',
        text: `Hello! I am **BACS Strategy Copilot**, your senior business consultant.

I am grounded in your Business JSON for **${businessJson.business.name}** (${businessJson.business.stage} stage). 

Here are key aspects I can analyze with you:
- **Unit Economics & Margin Optimization** (Target: ${businessJson.pricing.marginsEstimated || 'N/A'})
- **Channel CAC & Acquisition** (Primary: ${businessJson.marketing.primaryChannels?.[0] || 'N/A'})
- **Assumption Experiment Protocols** (Biggest assumption: "${businessJson.risks.biggestAssumption || 'N/A'}")

What strategic query can we solve together right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'What is my single biggest growth leverage point?',
          'How do I reduce customer acquisition cost (CAC)?',
          'Help me draft a $100 experiment protocol for my biggest assumption.'
        ]
      }
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: CopilotMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessJson,
          analysis,
          stage: businessJson.business.stage,
          messages: updatedMessages,
          userQuery: query
        })
      });

      if (!res.ok) throw new Error('API server error');
      const data = await res.json();

      let textResponse = data.text || 'I have analyzed your business records.';
      const promptRegex = /\[PROMPT:\s*([^\]]+)\]/g;
      const extractedPrompts: string[] = [];
      let match;
      while ((match = promptRegex.exec(textResponse)) !== null) {
        extractedPrompts.push(match[1].trim());
      }
      textResponse = textResponse.replace(promptRegex, '').trim();

      const assistantMessage: CopilotMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: textResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: extractedPrompts.length > 0 ? extractedPrompts : [
          'How does this impact my 90-day roadmap?',
          'Give me specific ad copy angles for this persona.',
          'What supplier terms should I negotiate next?'
        ]
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      onSaveHistory(finalMessages);
    } catch (err) {
      console.error('Copilot Chat Error:', err);
      const fallbackMsg: CopilotMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: `### Strategy Recommendation for **${businessJson.business.name}**

Based on your business JSON records:
1. **Focus Area**: Address your primary risk item: "${businessJson.risks.biggestAssumption || 'Pricing validation'}".
2. **Channel Strategy**: Leverage **${businessJson.marketing.primaryChannels?.[0] || 'Direct Channels'}** with hyper-targeted testimonials.
3. **Execution**: Execute the **Phase 1 Roadmap items** before expanding ad expenditure.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'How do I improve conversion rates?',
          'What is my top priority this week?'
        ]
      };
      const finalMessages = [...updatedMessages, fallbackMsg];
      setMessages(finalMessages);
      onSaveHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const initialMsg: CopilotMessage = {
      id: `welcome_${Date.now()}`,
      sender: 'assistant',
      text: `Chat history reset. Grounded in **${businessJson.business.name}** records. What would you like to explore next?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        'How do I double my gross margin?',
        'Analyze my competitive moat.'
      ]
    };
    setMessages([initialMsg]);
    onSaveHistory([initialMsg]);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Top Copilot Bar */}
      <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold">BACS Strategy Copilot</h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grounded Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active Context: {businessJson.business.name} ({businessJson.business.industry})
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-indigo-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <div className="markdown-content">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>

                <div className={`text-[10px] mt-2 font-mono ${
                  msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                }`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedPrompts.map((promptText, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendMessage(promptText)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 hover:border-indigo-300 transition shadow-2xs flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>{promptText}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-indigo-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 italic">
              Analyzing Business JSON facts & synthesizing strategy...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder={`Ask Strategy Copilot about ${businessJson.business.name}...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
