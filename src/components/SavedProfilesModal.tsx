import React, { useState } from 'react';
import { 
  X, 
  FolderOpen, 
  Trash2, 
  Building2, 
  Check, 
  Calendar, 
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SavedProfile } from '../types';

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProfiles: SavedProfile[];
  activeProfileId: string | null;
  onSelectProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
  onNewDiagnosis: () => void;
}

export const SavedProfilesModal: React.FC<SavedProfilesModalProps> = ({
  isOpen,
  onClose,
  savedProfiles,
  activeProfileId,
  onSelectProfile,
  onDeleteProfile,
  onNewDiagnosis
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = savedProfiles.filter(p => 
    p.businessJson.business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.businessJson.business.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Saved Business Profiles ({savedProfiles.length})</h2>
              <p className="text-xs text-slate-400">Local BACS Diagnosis History</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Filter saved profiles by name or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No saved profiles found. Start a new diagnosis to generate one!
              </div>
            ) : (
              filtered.map((profile) => {
                const isActive = profile.id === activeProfileId;
                const bName = profile.businessJson.business.name;
                const bIndustry = profile.businessJson.business.industry;
                const bStage = profile.stage;
                const bacsIndex = profile.analysis.bacsIndexScore;

                return (
                  <div
                    key={profile.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div 
                      onClick={() => {
                        onSelectProfile(profile.id);
                        onClose();
                      }}
                      className="flex-1 min-w-0 cursor-pointer space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{bName}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                          {bStage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {bIndustry} • BACS Index: <strong className="text-indigo-600 font-bold">{bacsIndex}/100</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          onSelectProfile(profile.id);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isActive ? 'Active' : 'Load'}
                      </button>

                      <button
                        onClick={() => onDeleteProfile(profile.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onNewDiagnosis();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow transition flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Diagnosis</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
