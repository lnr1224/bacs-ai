import React, { useState } from 'react';
import { X, Copy, Check, Download, Edit3, Save, Layers, ShieldCheck } from 'lucide-react';
import { BusinessJSON } from '../types';

interface JsonInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessJson: BusinessJSON;
  onSaveJson: (updatedJson: BusinessJSON) => void;
}

export const JsonInspectorModal: React.FC<JsonInspectorModalProps> = ({
  isOpen,
  onClose,
  businessJson,
  onSaveJson
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jsonString, setJsonString] = useState(JSON.stringify(businessJson, null, 2));
  const [parseError, setParseError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessJson.business.name.toLowerCase().replace(/\s+/g, '_')}_business_profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonString);
      onSaveJson(parsed);
      setIsEditing(false);
      setParseError(null);
    } catch (err: any) {
      setParseError(`JSON Syntax Error: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-4 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                Structured Business JSON Inspector
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The single source of truth powering all BACS AI intelligence & recommendations.
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

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              schema: BACS_BusinessJSON_v1.0
            </span>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-sm transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center space-x-1 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit JSON</span>
                </button>
              )}

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center space-x-1 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center space-x-1 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {parseError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {parseError}
            </div>
          )}

          {isEditing ? (
            <textarea
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              className="w-full h-96 p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <pre className="w-full h-96 p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-auto border border-slate-800">
              {jsonString}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
