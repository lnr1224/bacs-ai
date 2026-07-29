import React, { useState } from 'react';
import { 
  FileJson, 
  Copy, 
  Check, 
  Download, 
  Search, 
  Code2, 
  ChevronRight, 
  ChevronDown,
  ShieldCheck,
  Brain,
  Edit3,
  Save
} from 'lucide-react';
import { BusinessJSON } from '../types';

interface BusinessJsonInspectorViewProps {
  businessJson: BusinessJSON;
  onUpdateBusinessJson?: (updated: BusinessJSON) => void;
}

export const BusinessJsonInspectorView: React.FC<BusinessJsonInspectorViewProps> = ({
  businessJson,
  onUpdateBusinessJson
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  const [searchTerm, setSearchTerm] = useState('');
  const [rawText, setRawText] = useState(() => JSON.stringify(businessJson, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    business: true,
    market: true,
    customer: true,
    pricing: true,
    marketing: true,
    operations: true,
    competition: true,
    financials: true,
    proof: true,
    growth: true,
    risks: true
  });

  // Calculate Business Memory Completeness %
  const calculateMemoryCompleteness = (obj: any): number => {
    let totalFields = 0;
    let filledFields = 0;

    const traverse = (item: any) => {
      if (typeof item === 'object' && item !== null) {
        if (Array.isArray(item)) {
          totalFields++;
          if (item.length > 0) filledFields++;
        } else {
          Object.values(item).forEach((v) => traverse(v));
        }
      } else {
        totalFields++;
        if (item !== undefined && item !== null && String(item).trim() !== '') {
          filledFields++;
        }
      }
    };

    traverse(obj);
    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  const memoryPercentage = calculateMemoryCompleteness(businessJson);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(businessJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(businessJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessJson.business.name.toLowerCase().replace(/\s+/g, '_')}_business.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRawChange = (text: string) => {
    setRawText(text);
    try {
      const parsed = JSON.parse(text);
      setJsonError(null);
      if (onUpdateBusinessJson) {
        onUpdateBusinessJson(parsed);
      }
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  const renderValue = (val: any) => {
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {val.map((item, i) => (
            <span key={i} className="text-xs bg-slate-800 text-purple-300 px-2.5 py-1 rounded-lg font-mono border border-slate-700">
              {String(item)}
            </span>
          ))}
        </div>
      );
    }
    if (typeof val === 'object' && val !== null) {
      return <pre className="text-xs font-mono bg-slate-950 p-2.5 rounded-xl text-slate-300 border border-slate-800">{JSON.stringify(val, null, 2)}</pre>;
    }
    return <span className="text-xs text-slate-200 font-semibold">{String(val)}</span>;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 uppercase tracking-wider">
              Canonical Schema
            </span>
            <span className="text-xs text-slate-400 font-mono">
              bacs_schema_v2.5.json
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Business JSON Record
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured machine-readable facts powering BACS AI analysis & strategy engines.
          </p>
        </div>

        {/* Memory Completeness Indicator */}
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl min-w-[220px] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center space-x-1.5">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Business Memory</span>
            </span>
            <span className="font-mono text-purple-400">{memoryPercentage}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500"
              style={{ width: `${memoryPercentage}%` }}
            />
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-right">
            Memory Completeness
          </div>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="bg-slate-950 p-1 rounded-xl flex items-center text-xs font-semibold w-full sm:w-auto">
          <button
            onClick={() => setViewMode('tree')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition ${
              viewMode === 'tree' ? 'bg-purple-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Structured Tree View
          </button>
          <button
            onClick={() => {
              setViewMode('raw');
              setRawText(JSON.stringify(businessJson, null, 2));
            }}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition ${
              viewMode === 'raw' ? 'bg-purple-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Raw Editor
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={copyToClipboard}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center space-x-1.5 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={downloadJson}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow flex items-center space-x-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Content View */}
      {viewMode === 'tree' ? (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search keys, persona, competitors, or values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {Object.entries(businessJson).map(([sectionKey, sectionObj]) => {
              if (typeof sectionObj !== 'object' || sectionObj === null) return null;
              
              const isOpen = !!openSections[sectionKey];
              const entries = Object.entries(sectionObj);

              if (searchTerm) {
                const matches = JSON.stringify(sectionObj).toLowerCase().includes(searchTerm.toLowerCase());
                if (!matches) return null;
              }

              return (
                <div key={sectionKey} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full px-5 py-3.5 bg-slate-950/60 hover:bg-slate-800/60 border-b border-slate-800/80 flex items-center justify-between text-left transition"
                  >
                    <div className="flex items-center space-x-2">
                      {isOpen ? <ChevronDown className="w-4 h-4 text-purple-400" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                      <span className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                        {sectionKey}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {entries.length} fields
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {entries.map(([fieldKey, fieldValue]) => (
                        <div key={fieldKey} className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 space-y-1">
                          <p className="text-[11px] font-mono text-purple-300 font-bold">
                            {fieldKey}
                          </p>
                          {renderValue(fieldValue)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {jsonError && (
            <div className="p-3 bg-rose-950/60 text-rose-300 rounded-xl text-xs font-mono border border-rose-900">
              JSON Error: {jsonError}
            </div>
          )}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>business.json</span>
              </span>
              <span>UTF-8 JSON</span>
            </div>
            <textarea
              value={rawText}
              onChange={(e) => handleRawChange(e.target.value)}
              rows={24}
              className="w-full p-4 bg-slate-950 text-purple-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
};
