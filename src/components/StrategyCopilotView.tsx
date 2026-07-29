import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Loader2, 
  RefreshCw, 
  Zap, 
  CheckCircle2,
  Bookmark,
  MessageSquare,
  ShieldCheck,
  Target
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BusinessJSON, IntelligenceAnalysis, CopilotMessage } from '../types';

interface StrategyCopilotViewProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  copilotHistory: CopilotMessage[];
  onSaveHistory: (messages: CopilotMessage[]) => void;
}

export const StrategyCopilotView: React.FC<StrategyCopilotViewProps> = ({
  businessJson,
  analysis,
  copilotHistory,
  onSaveHistory
}) => {
  const topPriority1 = analysis.oneThingToFix?.title || `Validate ${businessJson.pricing?.averagePricePoint || 'Pricing'} with pre-order campaign`;
  const topPriority2 = `De-risk primary channel acquisition CAC (${businessJson.marketing?.primaryChannels?.[0] || 'Digital Ads'})`;
  const topPriority3 = `Strengthen competitive moat (${businessJson.competition?.competitiveMoat || 'Speed & Differentiator'})`;

  const initialWelcomeMsg: CopilotMessage = {
    id: 'welcome_msg_init',
    sender: 'assistant',
    text: `I've analysed your business. Based on your Business JSON for **${businessJson.business.name}** (${businessJson.business.stage} stage) and BACS diagnosis, I recommend focusing on these three priorities first:

1. **${topPriority1}**
2. **${topPriority2}**
3. **${topPriority3}**

---
I am fully grounded in your **BACS_BusinessJSON_v2.5** data. What strategic question or operational hurdle can we solve together right now?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedPrompts: [
      `How do I execute Priority #1 step-by-step?`,
      `Help me draft ad copy angles for my target persona.`,
      `What is my optimal pricing model to protect gross margins?`
    ]
  };

  const [messages, setMessages] = useState<CopilotMessage[]>(() => {
    if (copilotHistory && copilotHistory.length > 0) return copilotHistory;
    return [initialWelcomeMsg];
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
          'What are the key KPIs I should track daily?',
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
        text: `### Strategy Protocol for **${businessJson.business.name}**

Based on your Business JSON facts:
1. **Focus Area**: Address your primary risk item: "${businessJson.risks?.biggestAssumption || 'Pricing validation'}".
2. **Channel Strategy**: Leverage **${businessJson.marketing?.primaryChannels?.[0] || 'Direct Channels'}** with hyper-targeted offer messaging.
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
    setMessages([initialWelcomeMsg]);
    onSaveHistory([initialWelcomeMsg]);
  };

  return (
    <div className="max-w-5xl mx-auto py-2 px-4 sm:px-6 h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md text-white font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-extrabold text-white">Business Strategy Copilot</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-purple-400 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[88%] sm:max-w-[80%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
                }`}
              >
                <div className="markdown-content">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>

                <div className={`text-[10px] mt-2 font-mono ${
                  msg.sender === 'user' ? 'text-purple-200 text-right' : 'text-slate-500'
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
                      className="text-[11px] font-medium px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-purple-950/60 text-purple-300 border border-slate-700 hover:border-purple-500/50 transition shadow-2xs flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>{promptText}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-purple-400 flex items-center justify-center border border-slate-700">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 italic">
              Analyzing Business JSON facts & synthesizing strategy...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shrink-0">
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
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl shadow transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
