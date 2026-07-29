import React, { useState } from 'react';
import { Lightbulb, Building2, Rocket, ArrowRight, Sparkles, Globe, HelpCircle, CheckCircle2 } from 'lucide-react';
import { BusinessStage } from '../types';

interface StageSelectorProps {
  initialStage?: BusinessStage;
  onStartInterview: (stage: BusinessStage, initialName: string, initialIndustry: string, location: string) => void;
  onCancel: () => void;
}

export const StageSelector: React.FC<StageSelectorProps> = ({ initialStage, onStartInterview, onCancel }) => {
  const [selectedStage, setSelectedStage] = useState<BusinessStage>(initialStage || 'idea');
  const [showProfileSection, setShowProfileSection] = useState<boolean>(true);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Beauty');
  const [location, setLocation] = useState('United States');

  const handleStageClick = (stage: BusinessStage) => {
    setSelectedStage(stage);
    setShowProfileSection(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartInterview(
      selectedStage,
      name.trim() || 'My Business',
      industry,
      location.trim() || 'United States'
    );
  };

  const getStageLabel = (stage: BusinessStage) => {
    switch (stage) {
      case 'idea': return 'Business Idea';
      case 'existing': return 'Existing Business';
      case 'expansion': return 'Expansion Planning';
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        
        {/* Step Indicator & Guidance */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1 of 2: Business Stage & Location Setup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Configure Your Business Diagnosis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            BACS AI asks <strong>country- and stage-tailored questions</strong> to build your structured Business JSON memory without generic templates.
          </p>
        </div>

        {/* Process Explanation Banner */}
        <div className="bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 p-4 rounded-2xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-indigo-700 dark:text-indigo-300">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>How the Diagnosis Process Works:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div className="flex items-start space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span><strong>1. Select Stage & Country</strong>: Defines your regulatory & market scope.</span>
            </div>
            <div className="flex items-start space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span><strong>2. 5 Adaptive Questions</strong>: AI asks questions specific to your country & answers.</span>
            </div>
            <div className="flex items-start space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span><strong>3. Real Business JSON</strong>: Generates an instant analysis reflecting your exact inputs.</span>
            </div>
          </div>
        </div>

        {/* Stage Selection Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              1. Select Your Current Business Stage
            </label>
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Selection Remembered by AI</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => handleStageClick('idea')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                selectedStage === 'idea'
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedStage === 'idea' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Business Idea</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Validate demand and unit economics before investing capital.</p>
              </div>
            </div>

            <div
              onClick={() => handleStageClick('existing')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                selectedStage === 'existing'
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedStage === 'existing' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Existing Business</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Diagnose margin bottlenecks, CAC leaks, or retention drops.</p>
              </div>
            </div>

            <div
              onClick={() => handleStageClick('expansion')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                selectedStage === 'expansion'
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedStage === 'expansion' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Expansion Planning</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Assess readiness for new locations, franchising, or wholesale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form: Name, Industry, Country/Location */}
        {showProfileSection && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Enter Your Venture Profile</span>
              </label>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-full">
                Active Stage: {getStageLabel(selectedStage)}
              </span>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Verdant Skincare"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Primary Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Beauty">Beauty & Cosmetics</option>
                <option value="Furniture & Home">Furniture & Home Decor</option>
                <option value="Restaurant">Restaurant & Dining</option>
                <option value="Cleaning">Cleaning & Laundromat</option>
                <option value="Logistics">Logistics & Transport</option>
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Education">Education & Training</option>
                <option value="Agency">Digital Agency & Services</option>
                <option value="Retail">Retail Store</option>
                <option value="Software">Software & SaaS</option>
                <option value="Healthcare">Healthcare & Wellness</option>
                <option value="Construction">Construction & Trades</option>
                <option value="Agriculture">Agriculture & Farming</option>
                <option value="RealEstate">Real Estate & Property</option>
                <option value="Food">Food & Beverage CPG</option>
                <option value="Hospitality">Hospitality & Hotels</option>
                <option value="Ecommerce">E-Commerce</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>Country / Region</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nigeria, United States, UK, Kenya"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400">
              Country context ensures local currency, channels & regulatory accuracy.
            </span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-md shadow-indigo-500/20 transition-all"
              >
                <span>Continue to Step 2 (Interview)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

