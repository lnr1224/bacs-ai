import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { generateIntelligenceAnalysis } from './src/utils/analysisGenerator';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini client
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing. AI routes will use local intelligent fallback algorithms.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Resilient Gemini generateContent helper with model fallback and clean rate-limit handling
async function safeGenerateContent(ai: GoogleGenAI, params: {
  contents: any;
  config?: any;
  preferredModel?: string;
  contextName?: string;
}) {
  const modelsToTry = [
    params.preferredModel || 'gemini-3.6-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash'
  ];

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isQuotaOrRateLimit = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota exceeded');

      if (isQuotaOrRateLimit) {
        if (i < modelsToTry.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
          continue;
        }
      }

      if (i === modelsToTry.length - 1) {
        console.info(`[BACS AI Engine] Gemini API (${params.contextName || 'request'}) unavailable. Seamlessly using local intelligence fallback.`);
      }
    }
  }
  return null;
}

// 1. Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Adaptive Interview Next Question
app.post('/api/interview/next-question', async (req, res) => {
  try {
    const { stage, previousQA, businessName, industry, location } = req.body;
    const ai = getGenAIClient();
    const targetCountry = location || 'United States';

    const getFallbackQuestion = () => {
      const qaCount = previousQA ? previousQA.length : 0;
      const fallbackQuestions = [
        {
          questionId: 'target_audience',
          category: 'Market & Location Focus',
          question: `Who is the primary target customer for ${businessName || 'your business'} in ${targetCountry}, and what is their single biggest local pain point in the ${industry || 'target'} space?`,
          suggestedAnswers: [
            `Urban working professionals in ${targetCountry}`,
            `Small business owners & vendors in ${targetCountry}`,
            `Middle-class families seeking quality in ${targetCountry}`,
            `Corporate B2B clients across ${targetCountry}`
          ]
        },
        {
          questionId: 'revenue_model',
          category: 'Revenue & Local Currency Pricing',
          question: `What is your pricing structure and target price point in ${targetCountry}, and what local payment methods or purchasing preferences do your buyers use?`,
          suggestedAnswers: [
            'Direct one-time sales with card / local bank transfer',
            'Monthly subscription / retainer billing',
            'A la carte service packaging with upfront deposit',
            'Wholesale distribution to local retailers'
          ]
        },
        {
          questionId: 'marketing_channels',
          category: 'Marketing & Acquisition Channels',
          question: `Which customer acquisition channels work best in ${targetCountry} for ${businessName || 'your business'} (e.g. Instagram/TikTok, WhatsApp, SEO, word-of-mouth, local events)?`,
          suggestedAnswers: [
            'Social media video & influencer partnerships',
            'Direct WhatsApp & word-of-mouth community referrals',
            'Google Search & local SEO targeting major cities',
            'B2B outbound sales & local trade shows'
          ]
        },
        {
          questionId: 'biggest_risk',
          category: 'Operations & Local Risks',
          question: `What critical operational, supply chain, regulatory, or economic risk in ${targetCountry} is most likely to derail your business growth?`,
          suggestedAnswers: [
            'Import tariffs, currency fluctuation & shipping delays',
            'High customer acquisition costs on digital ad networks',
            'Reliability of local suppliers or co-packers',
            'Regulatory permits or compliance friction'
          ]
        },
        {
          questionId: 'growth_goals',
          category: 'Growth & Expansion Goals',
          question: `What is your single most important revenue or customer growth target for the next 90 days in ${targetCountry}?`,
          suggestedAnswers: [
            'Secure initial 50 paying customers',
            'Achieve $10,000 monthly recurring revenue',
            'Expand into 2 additional major cities in ' + targetCountry,
            'Launch wholesale partnerships with 10 local stockists'
          ]
        }
      ];
      return fallbackQuestions[qaCount % fallbackQuestions.length];
    };

    if (!ai) {
      return res.json(getFallbackQuestion());
    }

    const systemInstruction = `You are BACS AI, an elite Business Consultant. You are conducting an adaptive interview for an entrepreneur in "${targetCountry}" operating in stage: "${stage}".
Ask ONE sharp, highly contextual follow-up question to probe deeper into their business logic, economics, or local market factors in ${targetCountry}.
Format your response in JSON matching:
{
  "questionId": "string",
  "category": "string",
  "question": "string",
  "suggestedAnswers": ["string", "string", "string", "string"]
}`;

    const promptText = `Business Name: ${businessName || 'N/A'}, Industry: ${industry || 'N/A'}, Stage: ${stage}, Country/Location: ${targetCountry}.
Previous Questions and Answers:
${JSON.stringify(previousQA || [], null, 2)}

Formulate the next most vital follow-up question tailored specifically for an entrepreneur operating in ${targetCountry}.`;

    const response = await safeGenerateContent(ai, {
      contents: promptText,
      contextName: 'next-question',
      preferredModel: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questionId: { type: Type.STRING },
            category: { type: Type.STRING },
            question: { type: Type.STRING },
            suggestedAnswers: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['questionId', 'category', 'question', 'suggestedAnswers']
        }
      }
    });

    if (response) {
      const parsed = JSON.parse(response.text || '{}');
      if (parsed && parsed.question) {
        return res.json(parsed);
      }
    }

    return res.json(getFallbackQuestion());
  } catch (err) {
    console.error('Error in next-question route:', err);
    const fallback = {
      questionId: `q_${Date.now()}`,
      category: 'Market & Location Focus',
      question: `What primary customer segment in ${req.body?.location || 'your country'} are you targeting with ${req.body?.businessName || 'your business'}?`,
      suggestedAnswers: ['Urban working professionals', 'Small business owners', 'Direct-to-consumer online buyers', 'B2B corporate clients']
    };
    res.json(fallback);
  }
});

// 3. Generate Business JSON
app.post('/api/business/generate-json', async (req, res) => {
  try {
    const { stage, initialData, interviewQA } = req.body;
    const ai = getGenAIClient();

    const constructFallbackJson = () => {
      const name = initialData?.name || 'My Business';
      const industry = initialData?.industry || 'Technology';
      const countryLocation = initialData?.location || 'United States';

      // Parse user's answers from Q&A history
      const qaMap: Record<string, string> = {};
      (interviewQA || []).forEach((qa: any) => {
        if (qa.category) qaMap[qa.category.toLowerCase()] = qa.answer;
        if (qa.questionId) qaMap[qa.questionId.toLowerCase()] = qa.answer;
      });

      const allAnswersText = (interviewQA || []).map((q: any) => `${q.category || 'QA'}: ${q.answer}`).join('; ');

      const targetAudience = qaMap['market & customer'] || qaMap['market & location focus'] || qaMap['target_audience'] || `Target customers in ${countryLocation}`;
      const pricingModel = qaMap['revenue & pricing'] || qaMap['revenue & local currency pricing'] || qaMap['revenue_model'] || 'Direct Pricing';
      const marketingChannel = qaMap['marketing & acquisition'] || qaMap['marketing & acquisition channels'] || qaMap['marketing_channels'] || 'Social Media & Direct Referrals';
      const biggestRisk = qaMap['operations & risk'] || qaMap['operations & local risks'] || qaMap['biggest_risk'] || 'Rising customer acquisition cost';
      const growthGoal = qaMap['growth & expansion'] || qaMap['growth & expansion goals'] || qaMap['growth_goals'] || `Expand market share in ${countryLocation}`;

      return {
        business: {
          name,
          industry,
          stage: stage || 'idea',
          description: allAnswersText ? `Venture in ${countryLocation}: ${allAnswersText.slice(0, 180)}...` : `A focused ${industry} business operating in ${countryLocation}.`,
          location: countryLocation,
          model: pricingModel,
          tagLine: `${industry} Innovation in ${countryLocation}`
        },
        market: {
          targetAudience: targetAudience,
          marketSize: `Addressable market in ${countryLocation}`,
          trends: [`Growing demand in ${countryLocation}`, 'Digital customer onboarding', 'Quality & reliability preference'],
          geographicalFocus: countryLocation
        },
        customer: {
          idealPersona: targetAudience,
          painPoints: ['High cost or low quality of current alternatives', 'Inconvenient local access', 'Lack of customer support'],
          purchasingDrivers: ['Speed of delivery', 'Proven local reputation', 'Transparent pricing']
        },
        pricing: {
          model: pricingModel,
          averagePricePoint: 'Market Competitive',
          marginsEstimated: '60% - 70% Gross Margin',
          pricingTierDetails: `Tailored pricing model for ${countryLocation} customers`
        },
        marketing: {
          primaryChannels: [marketingChannel, 'Word-of-Mouth Referrals', 'Direct Customer Engagement'],
          customerAcquisitionCost: 'Target low CAC via direct channels',
          strategyNotes: `Primary focus on ${marketingChannel} targeting buyers in ${countryLocation}.`
        },
        operations: {
          coreStack: ['Digital Order Management', 'Payment Gateway', 'Customer Support CRM'],
          keyTeamRoles: ['Founder / Operations Lead', 'Sales & Marketing Specialist'],
          supplyChainOrWorkflow: `Fulfillment and operations optimized for ${countryLocation}.`
        },
        competition: {
          mainCompetitors: [`Existing legacy providers in ${countryLocation}`],
          keyDifferentiators: [`Superior customer experience and localized service in ${countryLocation}`],
          competitiveMoat: `Agile local operations and strong customer relationships`
        },
        financials: {
          monthlyRevenue: stage === 'idea' ? '$0 (Pre-launch validation)' : '$10,000/mo',
          burnRate: '$3,000/mo',
          breakEvenStatus: stage === 'idea' ? 'Targeting Month 6' : 'Profitable',
          fundingStatus: 'Bootstrapped / Founder Funded'
        },
        proof: {
          evidenceAndTraction: allAnswersText ? `User-supplied details: ${allAnswersText.slice(0, 120)}` : 'Initial market validation interviews.',
          customerTestimonialsOrMetrics: 'Positive early buyer response and waitlist feedback.',
          validationLevel: 'Medium'
        },
        growth: {
          topGrowthGoal: growthGoal,
          expansionTargets: [`Secondary cities/regions in ${countryLocation}`, 'Product line extension'],
          keyMilestones: ['Launch primary campaign', 'Establish key supplier partnerships', `Achieve 90-day goal: ${growthGoal}`]
        },
        risks: {
          criticalRisks: [biggestRisk, `Local economic or regulatory shifts in ${countryLocation}`],
          biggestAssumption: `Target buyers in ${countryLocation} will switch to ${name} based on core value proposition.`
        },
        recommendations: {
          immediateActions: [
            `Validate ${pricingModel} with a small test campaign in ${countryLocation}`,
            `Capture early buyer testimonials for social proof`,
            `Mitigate biggest risk: ${biggestRisk}`
          ],
          longTermFocus: [
            `Build recurring customer retention in ${countryLocation}`,
            `Scale primary acquisition channel (${marketingChannel})`
          ]
        }
      };
    };

    if (!ai) {
      return res.json(constructFallbackJson());
    }

    const systemInstruction = `You are BACS AI. Synthesize all provided business facts into a complete, pristine, structured Business JSON adhering strictly to the required schema.
CRITICAL INSTRUCTION: You MUST incorporate EVERY answer provided by the user in the Interview Q&A History and Initial Data (including Business Name, Industry, Country/Location, Target Audience, Pricing, Competitors, Channels, and Risks). Do NOT overwrite user-supplied facts with generic defaults. If the user mentioned specific prices, numbers, cities, countries, products, or competitors, include them verbatim in the relevant Business JSON sections.`;

    const promptText = `Stage: ${stage}
Initial Data: ${JSON.stringify(initialData || {})}
Interview Q&A History: ${JSON.stringify(interviewQA || [])}

Return the exact JSON object following the schema structure.`;

    const response = await safeGenerateContent(ai, {
      contents: promptText,
      contextName: 'generate-json',
      preferredModel: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    if (response) {
      const parsed = JSON.parse(response.text || '{}');
      if (parsed && parsed.business) {
        return res.json(parsed);
      }
    }

    return res.json(constructFallbackJson());
  } catch (err) {
    console.error('Error in generate-json:', err);
    res.status(500).json({ error: 'Failed to generate Business JSON' });
  }
});

// 4. Analyze Business
app.post('/api/business/analyze', async (req, res) => {
  try {
    const { businessJson } = req.body;
    if (!businessJson) {
      return res.status(400).json({ error: 'businessJson is required' });
    }

    // Always calculate deterministic baseline score and analysis via analysisGenerator
    const baselineAnalysis = generateIntelligenceAnalysis(businessJson);

    const ai = getGenAIClient();
    if (!ai) {
      return res.json(baselineAnalysis);
    }

    // Refine with Gemini intelligence for richer executive summary and tailored reality checks
    const promptText = `Analyze this Business JSON for BACS AI Business Consultant:
${JSON.stringify(businessJson, null, 2)}

Provide enhanced executive summary, reality check items, and recommendations.`;

    const response = await safeGenerateContent(ai, {
      contents: promptText,
      contextName: 'analyze',
      preferredModel: 'gemini-3.6-flash',
      config: {
        systemInstruction: 'You are senior BACS AI Business Consultant. Output JSON with fields: executiveSummary, realityCheck (array of {assumption, whyItMatters, riskIfWrong, lowCostExperiment}), quickWins, recommendations.',
        responseMimeType: 'application/json'
      }
    });

    if (response) {
      const parsed = JSON.parse(response.text || '{}');
      if (parsed.executiveSummary) baselineAnalysis.executiveSummary = parsed.executiveSummary;
      if (parsed.realityCheck && Array.isArray(parsed.realityCheck)) baselineAnalysis.realityCheck = parsed.realityCheck;
      if (parsed.quickWins && Array.isArray(parsed.quickWins)) baselineAnalysis.quickWins = parsed.quickWins;
    }

    res.json(baselineAnalysis);
  } catch (err) {
    console.error('Error in analyze business:', err);
    res.status(500).json({ error: 'Failed to analyze business' });
  }
});

// 5. Strategy Copilot Endpoint
app.post('/api/copilot/chat', async (req, res) => {
  try {
    const { businessJson, analysis, stage, messages, userQuery } = req.body;
    const ai = getGenAIClient();

    const getFallbackCopilotText = () => {
      const b = businessJson?.business || {};
      return `### Strategic Diagnosis for **${b.name || 'Your Business'}** (${b.stage || 'current'} stage)

Based on your **${b.industry || 'Industry'}** Business JSON:

1. **Current Positioning & Health**:
   - Your BACS Index score sits at **${analysis?.bacsIndexScore || 75}/100**.
   - Your primary marketing focus is **${businessJson?.marketing?.primaryChannels?.[0] || 'digital channels'}**.

2. **Actionable Recommendations**:
   - **Sales & Acquisition**: Address your biggest assumption ("${analysis?.realityCheck?.[0]?.assumption || 'Pricing strategy'}") by executing a low-cost experiment.
   - **Margin Defense**: Maintain target margins (${businessJson?.pricing?.marginsEstimated || '65%'}) by auditing supplier costs.
   - **Immediate Quick Win**: ${analysis?.quickWins?.[0] || 'Implement automated post-purchase email flows'}.

*What specific operational or marketing angle would you like to dive into next?*

[PROMPT: How do I improve sales?]
[PROMPT: What is my biggest weakness?]
[PROMPT: Generate a marketing strategy.]`;
    };

    if (!ai) {
      return res.json({ text: getFallbackCopilotText() });
    }

    const conversationHistory = (messages || []).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    conversationHistory.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    const response = await safeGenerateContent(ai, {
      contents: conversationHistory,
      contextName: 'copilot',
      preferredModel: 'gemini-3.6-flash',
      config: {
        systemInstruction: `You are BACS Strategy Copilot, an elite Senior Business Consultant.
CRITICAL RULES:
1. Ground EVERY response strictly in the provided Business JSON and BACS Intelligence Analysis below.
2. NEVER contradict the Business JSON facts.
3. If information is missing to answer a question, explicitly ask the user for clarification instead of inventing fake facts.
4. Provide structured, highly actionable business advice with clear headings, bullet points, and step-by-step tactics.
5. Include 2-3 suggested follow-up prompts at the end of your response formatted as [PROMPT: text].

=== BUSINESS JSON MEMORY ===
${JSON.stringify(businessJson || {}, null, 2)}

=== BACS INTELLIGENCE ANALYSIS ===
${JSON.stringify(analysis || {}, null, 2)}

Business Stage: ${stage || 'general'}`
      }
    });

    if (response && response.text) {
      return res.json({ text: response.text });
    }

    res.json({ text: getFallbackCopilotText() });
  } catch (err) {
    console.error('Error in copilot chat:', err);
    res.status(500).json({ error: 'Failed to process copilot query' });
  }
});

// Vite middleware & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BACS AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
