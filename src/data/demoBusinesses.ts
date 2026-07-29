import { DemoPreset, BusinessJSON, IntelligenceAnalysis } from '../types';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'organic-skincare',
    name: 'Verdant Glow Skincare',
    industry: 'Beauty',
    stage: 'idea',
    tagline: 'Clean, botanical skin barrier repair formulated for sensitive urban skin.',
    iconName: 'Sparkles',
    businessJson: {
      business: {
        name: 'Verdant Glow Skincare',
        industry: 'Beauty',
        stage: 'idea',
        description: 'Clean, botanical skin barrier repair formulated for sensitive urban skin using upcycled organic plant extracts.',
        location: 'Austin, TX',
        model: 'Direct-to-Consumer (DTC) E-Commerce & Subscription',
        tagLine: 'Pure Botanical Barrier Repair'
      },
      market: {
        targetAudience: 'Women aged 24-42 living in metropolitan areas suffering from pollution-induced skin sensitivity.',
        marketSize: '$18.4B Clean Beauty Market in North America growing at 9.2% CAGR.',
        trends: ['Upcycled skincare ingredients', 'Microbiome-friendly barrier formulations', 'Waterless concentrated beauty'],
        geographicalFocus: 'US Metro cities (Austin, NY, LA, Seattle)'
      },
      customer: {
        idealPersona: 'Eco-conscious working professional who scrutinizes ingredient labels and seeks dermatologist-backed clean formulations.',
        painPoints: ['Skin redness from urban pollution', 'Aggressive active ingredients causing breakouts', 'Greenwashing by mass brands'],
        purchasingDrivers: ['Third-party organic certification', 'Sustainable glass packaging', 'Visible skin calming within 7 days']
      },
      pricing: {
        model: 'Premium Tiered DTC ($38-$64 per SKU) with 15% Subscription Discount',
        averagePricePoint: '$48 per bottle',
        marginsEstimated: '78% Gross Margin target',
        pricingTierDetails: 'Serum $58, Cleanser $38, Barrier Cream $48, Complete Trio Bundle $122'
      },
      marketing: {
        primaryChannels: ['Instagram/TikTok User Generated Content', 'Micro-Dermatologist Influencer Gifting', 'Klaviyo SMS/Email Workflows'],
        customerAcquisitionCost: '$24 target CAC',
        strategyNotes: 'Focus on transformation before-and-after video proof and skin barrier education reels.'
      },
      operations: {
        coreStack: ['Shopify Plus', 'Klaviyo', 'Recharge Subscriptions', 'FDA-certified organic co-packer'],
        keyTeamRoles: ['Founder / Brand Manager', 'Cosmetic Chemist Consultant', 'Performance Marketer'],
        supplyChainOrWorkflow: 'Small-batch organic formulation by Texas co-packer, glass bottle sourcing from recycled supplier.'
      },
      competition: {
        mainCompetitors: ['Biossance', 'Youth to the People', 'Summer Fridays'],
        keyDifferentiators: ['Zero synthetic fillers or water dilution', 'Upcycled local botanical actives', '100% plastic-free refill pods'],
        competitiveMoat: 'Proprietary upcycled cold-press botanical extract process.'
      },
      financials: {
        monthlyRevenue: '$0 (Pre-launch Idea)',
        burnRate: '$2,500/mo in initial formula testing & branding',
        breakEvenStatus: 'Targeting Month 6 post-launch (350 orders/mo)',
        fundingStatus: 'Bootstrapped ($25,000 founder savings)'
      },
      proof: {
        evidenceAndTraction: '100 beta test samples distributed; 92% reported reduced redness in 5 days. 1,400 email pre-launch waitlist.',
        customerTestimonialsOrMetrics: '"The serum cleared my stress redness faster than prescription creams." - Beta Tester #42',
        validationLevel: 'Medium'
      },
      growth: {
        topGrowthGoal: 'Launch Kickstarter / DTC storefront and achieve $20k initial month sales.',
        expansionTargets: ['Sephora Clean Beauty section in Year 2', 'Boutique eco-spas wholesale'],
        keyMilestones: ['Finalize formula stability testing', 'Manufacture 2,500 unit first batch', 'Launch DTC site']
      },
      risks: {
        criticalRisks: [
          'Rising digital advertising CAC eroding margins',
          'Co-packer minimum order quantity (MOQ) cash requirement',
          'Ingredient supply chain seasonality'
        ],
        biggestAssumption: 'Customers will pay $48 for an unproven new indie brand because of the upcycled barrier repair claim.'
      },
      recommendations: {
        immediateActions: [
          'Pre-sell 300 trio bundles via landing page deposit to fund batch 1',
          'Lock in minimum order quantity terms with Austin co-packer',
          'Send 50 sample kits to estheticians and micro-influencers'
        ],
        longTermFocus: ['Build recurring subscription revenue to 45% of total sales', 'Develop zero-waste refill pod packaging system']
      }
    },
    analysis: {
      overallHealthScore: 74,
      aiConfidence: 88,
      bacsIndexScore: 76,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 85, priority: 'Low', explanation: 'Strong persona definition targeting urban women with sensitive skin.', recommendedAction: 'Refine customer surveys during beta test.' },
        { key: 'validation', title: 'Problem Validation', score: 80, priority: 'Low', explanation: 'Beta testers confirm barrier repair demand with 92% satisfaction.', recommendedAction: 'Convert waitlist to pre-orders.' },
        { key: 'market', title: 'Market Readiness', score: 78, priority: 'Medium', explanation: 'Clean beauty market is booming but crowded with established players.', recommendedAction: 'Emphasize upcycled ingredient moat.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 68, priority: 'High', explanation: 'High 78% target margins, but pre-launch cash flow remains unproven.', recommendedAction: 'Run pre-order crowdfunding to de-risk inventory capital.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 70, priority: 'Medium', explanation: 'Solid channel plan relies heavily on paid social where CAC is volatile.', recommendedAction: 'Build organic TikTok aesthetic reels daily.' },
        { key: 'trust', title: 'Trust Score', score: 75, priority: 'Medium', explanation: 'Requires dermatologist backing or clinical trials to stand out.', recommendedAction: 'Partner with certified esthetician to co-sign formulas.' },
        { key: 'competition', title: 'Competitive Position', score: 72, priority: 'Medium', explanation: 'Upcycled extract angle is unique against mass clean brands.', recommendedAction: 'Highlight eco-upcycling process in videos.' },
        { key: 'operations', title: 'Operational Readiness', score: 65, priority: 'High', explanation: 'Co-packer dependency introduces MOQ and lead time bottleneck risks.', recommendedAction: 'Secure backup local formulation lab.' }
      ],
      executiveSummary: 'Verdant Glow Skincare has strong product-market fit signals in the expanding barrier repair segment. Pre-launch waitlist and beta feedback are promising. Key priority is pre-selling inventory to de-risk co-packer capital commitment.',
      strengths: [
        'High 78% target gross margin per bottle',
        'Strong consumer pull for skin barrier repair and upcycled ingredients',
        '1,400 warm waitlist leads eager for launch'
      ],
      weaknesses: [
        'Pre-revenue state with high initial capital lock-up in batch production',
        'Unproven paid advertising conversion rate'
      ],
      growthOpportunities: [
        'Pre-order crowdfunding campaign to generate cash and viral momentum',
        'Wholesale placement in high-end boutique eco-spas',
        'Subscription refill subscription boxes'
      ],
      criticalRisks: [
        'High customer acquisition cost (CAC) on Meta/TikTok eating margins',
        'Inventory stockout if co-packer lead time exceeds 10 weeks'
      ],
      quickWins: [
        'Launch 3-day VIP waitlist early-bird pre-order campaign',
        'Add live video esthetician review quotes to product landing page',
        'Offer 15% discount for 3-month recurring subscription opt-ins'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Validation & Pre-Order', duration: 'Days 1-30', focusArea: 'Cash & Pre-Sales', items: ['Run 300-unit VIP pre-order campaign', 'Finalize co-packer deposit terms', 'Send 50 influencer sample PR kits'] },
        { phase: 'Phase 2', title: 'Production & DTC Launch', duration: 'Days 31-60', focusArea: 'Fulfillment & Site Launch', items: ['Fulfill pre-orders with custom eco-packaging', 'Launch Shopify DTC store with Klaviyo flows', 'Scale TikTok UGC video ads'] },
        { phase: 'Phase 3', title: 'Subscription & Scale', duration: 'Days 61-90', focusArea: 'Retention & CAC Reduction', items: ['Activate Recharge subscription engine', 'Introduce esthetician affiliate commission portal', 'Audit CAC and optimize product bundle AOV'] }
      ],
      priorityMatrix: [
        { task: 'Launch Waitlist Pre-Order Campaign', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Clinical Barrier Repair Study', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Design Eco Glass Refill Pods', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' },
        { task: 'Set Up Post-Purchase SMS Flows', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' }
      ],
      realityCheck: [
        {
          assumption: 'Customers will pay $48 for an unknown new brand over established clean beauty names.',
          whyItMatters: 'If price perception fails, CAC will spike and inventory will stay stuck in warehouse.',
          riskIfWrong: 'Unsold batch inventory loss of $15,000.',
          lowCostExperiment: 'Run $200 in Meta test ads promoting a $48 pre-order bundle to measure click-through & deposit conversion.'
        },
        {
          assumption: 'Co-packer can deliver batch 1 within 6 weeks without quality variance.',
          whyItMatters: 'Production delays destroy launch momentum and waitlist trust.',
          riskIfWrong: 'Pre-order chargebacks and negative brand sentiment.',
          lowCostExperiment: 'Request micro-batch sample run with stability stress test before signing full production contract.'
        },
        {
          assumption: 'Skin barrier repair messaging resonates better than general anti-aging.',
          whyItMatters: 'Ad creative and headlines must focus on the highest-converting customer pain point.',
          riskIfWrong: 'Wasted ad budget on ineffective copywriting.',
          lowCostExperiment: 'A/B test two landing page headlines: "Skin Barrier Repair" vs "Clean Botanical Glow".'
        }
      ]
    }
  },
  {
    id: 'artisan-bistro',
    name: 'Osteria Del Sol',
    industry: 'Restaurant',
    stage: 'existing',
    tagline: 'Farm-to-table coastal Italian dining struggling with weeknight vacancy & rising food costs.',
    iconName: 'Utensils',
    businessJson: {
      business: {
        name: 'Osteria Del Sol',
        industry: 'Restaurant',
        stage: 'existing',
        description: 'Authentic coastal Italian dining featuring hand-rolled pasta and local seafood.',
        location: 'Charleston, SC',
        model: 'Dine-in Restaurant, Private Dining & Takeout',
        tagLine: 'Authentic Coastal Italian Dining'
      },
      market: {
        targetAudience: 'Local foodies, couple date nights, tourists seeking authentic Charleston culinary experiences.',
        marketSize: '$14M regional upscale dining market',
        trends: ['High interest in handmade pasta', 'Natural wine pairings', 'Early weekday dining shifts'],
        geographicalFocus: 'Downtown Charleston & surrounding suburbs'
      },
      customer: {
        idealPersona: 'Affluent locals (30-65) who value fresh seasonal ingredients and curated wine pairings.',
        painPoints: ['Hard to get weekend reservations', 'Limited high-quality gluten-free options', 'Slow weeknight atmosphere'],
        purchasingDrivers: ['Handmade fresh daily pasta', 'Romantic outdoor patio lighting', 'Warm attentive hospitality']
      },
      pricing: {
        model: 'A La Carte Dinner Menu ($24-$46 entrees, $14-$18 wine by glass)',
        averagePricePoint: '$68 per guest ticket',
        marginsEstimated: 'Prime Cost 67% (Food 34%, Labor 33%)',
        pricingTierDetails: 'Pasta $26-$32, Mains $36-$46, Wine $14-$22/glass'
      },
      marketing: {
        primaryChannels: ['Instagram reels of pasta making', 'Local hotel concierge relationships', 'OpenTable email promos'],
        customerAcquisitionCost: '$12 per guest via OpenTable and local promos',
        strategyNotes: 'Needs targeted weeknight incentives to boost Tuesday-Thursday cover counts.'
      },
      operations: {
        coreStack: ['Toast POS', 'OpenTable', '7shifts Scheduling', 'ChefTec Inventory'],
        keyTeamRoles: ['Executive Chef / Owner', 'General Manager', 'Head Sommelier', 'Line Cooks & Waitstaff'],
        supplyChainOrWorkflow: 'Daily seafood delivery from local docks; specialty Italian zero-flour imports.'
      },
      competition: {
        mainCompetitors: ['Indaco', 'Melfi\'s', 'Le Farfalle'],
        keyDifferentiators: ['Historic courtyard patio', 'Wood-fired coastal seafood specialties', '100% house-made pasta'],
        competitiveMoat: 'Prime historic downtown location with private garden patio.'
      },
      financials: {
        monthlyRevenue: '$82,000/month average',
        burnRate: '$74,500/month operating expenses',
        breakEvenStatus: 'Profitable ($7,500 net monthly margin, ~9%)',
        fundingStatus: 'Bank SBA loan ($180k remaining)'
      },
      proof: {
        evidenceAndTraction: '4.7 stars across 580 Google reviews. Sold out Friday & Saturday nights 3 weeks in advance.',
        customerTestimonialsOrMetrics: '"Best squid ink tagliatelle outside of Venice." - Charleston Eater Review',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Increase Tuesday-Thursday seat occupancy from 45% to 75% and expand corporate catering.',
        expansionTargets: ['Private courtyard events', 'Sunday Chef\'s Tasting Menu experience'],
        keyMilestones: ['Launch Pasta Making Masterclass series', 'Cut food cost to 30%', 'Reach $100k monthly sales']
      },
      risks: {
        criticalRisks: [
          'High food cost (34%) eroding net profitability',
          'Low Tuesday/Wednesday cover count bleeding labor dollars',
          'Kitchen staff turnover during peak tourist season'
        ],
        biggestAssumption: 'Locals will attend weekday wine & pasta pairing nights during off-peak tourism months.'
      },
      recommendations: {
        immediateActions: [
          'Engineer menu to trim 4 low-margin, high-prep ingredients',
          'Launch Tuesday "Pasta & Pinot" $45 fixed price dinner special',
          'Establish concierge kickback perks with top 5 downtown boutique hotels'
        ],
        longTermFocus: ['Build corporate private dining sales engine for winter months', 'Implement Toast inventory recipe cost tracking']
      }
    },
    analysis: {
      overallHealthScore: 68,
      aiConfidence: 91,
      bacsIndexScore: 70,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 88, priority: 'Low', explanation: 'Strong reputation among locals and tourists for authentic dining.', recommendedAction: 'Build direct SMS VIP diner list.' },
        { key: 'validation', title: 'Problem Validation', score: 90, priority: 'Low', explanation: 'High 4.7 star rating and packed weekends prove culinary quality.', recommendedAction: 'Leverage weekend waitlist overflow.' },
        { key: 'market', title: 'Market Readiness', score: 82, priority: 'Low', explanation: 'Charleston culinary scene is highly active.', recommendedAction: 'Capitalize on food tourism trends.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 62, priority: 'Critical', explanation: 'Prime cost at 67% (34% food) leaves thin 9% net margin.', recommendedAction: 'Audit ingredient food waste and renegotiate seafood contracts.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 58, priority: 'High', explanation: 'Underutilizing direct digital channels; relying too much on OpenTable fees.', recommendedAction: 'Launch Instagram reel campaign focused on midweek deals.' },
        { key: 'trust', title: 'Trust Score', score: 92, priority: 'Low', explanation: '580+ raving Google reviews establish high local credibility.', recommendedAction: 'Highlight awards on menu.' },
        { key: 'competition', title: 'Competitive Position', score: 75, priority: 'Medium', explanation: 'Great patio, but fierce Italian restaurant competition in town.', recommendedAction: 'Promote unique wood-fired seafood specialty.' },
        { key: 'operations', title: 'Operational Readiness', score: 64, priority: 'High', explanation: 'Weeknight labor schedule is overstaffed relative to low cover counts.', recommendedAction: 'Flex line cook schedules on slow Tuesdays.' }
      ],
      executiveSummary: 'Osteria Del Sol is a beloved restaurant with full weekend reservations, but squeezed net margins (9%) due to 34% food costs and slow Tuesday-Thursday cover counts. Fixing food waste and boosting weeknight diners will immediately increase monthly net profit by $8,000+.',
      strengths: [
        'Packed weekend seats with 3-week advance reservation waitlist',
        'Stellar 4.7-star rating with deep culinary authority',
        'Beautiful historic downtown garden patio setting'
      ],
      weaknesses: [
        'Prime cost at 67% (Food cost 34% vs 28% target)',
        'Low weekday occupancy (45% on Tuesdays/Wednesdays)'
      ],
      growthOpportunities: [
        'Tuesday "Pasta & Pinot" fixed price tasting night',
        'Sunday afternoon hands-on pasta making masterclasses ($95/ticket)',
        'Corporate private event bookings for patio space'
      ],
      criticalRisks: [
        'Rising seafood vendor costs cutting net margin to zero',
        'Staff overtime pay during holiday rushes'
      ],
      quickWins: [
        'Remove 3 high-waste menu items and recalculate portion sizes in POS',
        'Offer local hoteliers a $15 gift card per guest reservation brought in',
        'Create a weekly SMS VIP table drop for cancelled weekend reservations'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Margin & Waste Audit', duration: 'Days 1-30', focusArea: 'Food Cost Reduction', items: ['Conduct 14-day waste inventory audit with Executive Chef', 'Renegotiate wholesale pricing with primary seafood dock', 'Re-engineer menu layout to push highest-margin pasta SKUs'] },
        { phase: 'Phase 2', title: 'Midweek Occupancy Boost', duration: 'Days 31-60', focusArea: 'Revenue Optimization', items: ['Launch Tuesday Pasta & Pinot promo', 'Partner with top 5 Charleston boutique hotels', 'Host 2 sold-out Sunday Pasta Masterclasses'] },
        { phase: 'Phase 3', title: 'Private Events & Retainers', duration: 'Days 61-90', focusArea: 'High-Margin Expansion', items: ['Package courtyard for corporate holiday parties', 'Implement 7shifts automated labor scheduling limits', 'Achieve 15% net operating margin'] }
      ],
      priorityMatrix: [
        { task: 'Launch Tuesday Pasta & Pinot Promo', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Re-negotiate Supplier Seafood Contracts', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Redesign Physical Menu Layout', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Install Outdoor Patio Heating System', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Charleston locals will come out for a Tuesday $45 fixed price pasta special.',
          whyItMatters: 'Weeknight seats are currently 55% empty while fixed kitchen labor costs run anyway.',
          riskIfWrong: 'Wasted marketing expenditure and quiet dining room reputation.',
          lowCostExperiment: 'Test the offer via an Instagram story poll and 500-person local email blast before printing menus.'
        },
        {
          assumption: 'Food cost can be reduced from 34% to 29% without lowering portion size or quality.',
          whyItMatters: 'A 5% reduction in food cost adds $4,100 directly to net monthly income.',
          riskIfWrong: 'Guest dissatisfaction if dish quality or portion perception drops.',
          lowCostExperiment: 'Weigh food prep waste for 7 days to isolate exact trim loss on fish and produce.'
        },
        {
          assumption: 'Hotel concierges will actively recommend Osteria if given direct incentives.',
          whyItMatters: 'Hotel recommendations yield high-spending tourist walk-ins on weeknights.',
          riskIfWrong: 'Concierges continue routing guests to larger corporate steak houses.',
          lowCostExperiment: 'Visit 5 hotel front desks with fresh cannoli boxes and handwritten invitation cards.'
        }
      ]
    }
  },
  {
    id: 'eco-laundry',
    name: 'Sudsy Eco Laundromat',
    industry: 'Cleaning',
    stage: 'idea',
    tagline: 'Modern, solar-powered laundromat with app-based pickup & delivery for busy professionals.',
    iconName: 'Sparkles',
    businessJson: {
      business: {
        name: 'Sudsy Eco Laundromat',
        industry: 'Cleaning',
        stage: 'idea',
        description: 'Next-gen solar-powered laundromat combining high-efficiency commercial washers with a mobile wash-and-fold delivery app.',
        location: 'Denver, CO',
        model: 'Self-Service Coinless + Wash & Fold Mobile Delivery Subscription',
        tagLine: 'Smart Eco Laundry & Delivery'
      },
      market: {
        targetAudience: 'Apartment renters without in-unit laundry & busy dual-income urban families in Denver.',
        marketSize: '$6.2B US Laundromat & Dry Cleaning Industry',
        trends: ['Contactless app payments', 'Hypoallergenic eco-detergents', 'Doorstep wash & fold subscriptions'],
        geographicalFocus: 'Capitol Hill & Highlands neighborhoods, Denver'
      },
      customer: {
        idealPersona: '30-something tech worker living in a historic condo with no washer/dryer hookups.',
        painPoints: ['Wasting 3 hours every Sunday at dingy laundromats', 'Broken quarter machines', 'Harsh chemical smell on clothes'],
        purchasingDrivers: ['App-scheduled doorstep pickup', 'Organic scent-free detergents', 'Fast 24-hour turnaround']
      },
      pricing: {
        model: 'Self-Serve ($4.50-$8.50/wash) + Delivery ($1.95/lb or $89/mo subscription for 50 lbs)',
        averagePricePoint: '$42/mo per subscription user',
        marginsEstimated: '62% Gross Margin on delivery services',
        pricingTierDetails: 'Pay-as-you-go $2.25/lb (15lb min); Flex Sub $89/mo; Family Sub $159/mo'
      },
      marketing: {
        primaryChannels: ['Apartment building lobby flyer partnerships', 'Local hyper-targeted Google Search Ads', 'Door hanger coupons'],
        customerAcquisitionCost: '$18 estimated CAC per delivery subscriber',
        strategyNotes: 'Offer first bag wash & fold for $10 to lower trial friction.'
      },
      operations: {
        coreStack: ['Cents Laundromat OS', 'DoorDash Drive for overflow delivery', 'Dexter Commercial Washers', 'Stripe'],
        keyTeamRoles: ['Founder / Operator', 'Attendant / Wash Specialist (2)', 'Delivery Driver (Part-time)'],
        supplyChainOrWorkflow: 'Solar roof array powering 24 Dexter high-spin washers with plant-based bulk detergent tanks.'
      },
      competition: {
        mainCompetitors: ['Traditional neighborhood coin laundries', 'Rinse delivery app', 'Dry cleaning chains'],
        keyDifferentiators: ['Solar-powered zero-carbon wash', 'Clean lounge aesthetic with high-speed WiFi & espresso bar', 'Same-day delivery option'],
        competitiveMoat: 'Prime corner real estate in high-density non-laundry apartment corridor.'
      },
      financials: {
        monthlyRevenue: '$0 (Idea Stage)',
        burnRate: '$1,200/mo in lease negotiation and architectural site layout',
        breakEvenStatus: 'Estimated Month 9 post-opening (180 active delivery subscribers + self-serve traffic)',
        fundingStatus: 'Seeking $220k SBA loan + $60k equity partner'
      },
      proof: {
        evidenceAndTraction: 'Surveyed 210 local apartment residents: 78% lack in-unit laundry and 64% expressed interest in $89/mo wash-and-fold delivery.',
        customerTestimonialsOrMetrics: '"I would instantly pay $90 a month to never touch laundry again." - Denver Resident Survey #114',
        validationLevel: 'Medium'
      },
      growth: {
        topGrowthGoal: 'Secure lease, complete buildout, and launch with 100 delivery subscribers in Month 1.',
        expansionTargets: ['Corporate gym uniform cleaning contracts', 'Second location in South Broadway'],
        keyMilestones: ['Sign 10-year lease', 'Secure SBA equipment financing', 'Launch local app waitlist']
      },
      risks: {
        criticalRisks: [
          'High upfront capital expenditure ($280k total equipment & buildout)',
          'Lease zoning delays or utility hookup upgrades',
          'Driver logistics costs eating wash-and-fold margins'
        ],
        biggestAssumption: 'Suburban condo renters will pay $1.95/lb for laundry delivery instead of using coin laundromats.'
      },
      recommendations: {
        immediateActions: [
          'Pre-sell 50 discounted charter subscriptions to validate delivery demand',
          'Lock in equipment rebate incentives with local energy utility',
          'Finalize lease contingency clauses for plumbing & electrical capacity'
        ],
        longTermFocus: ['Scale delivery routes using batch neighborhood pickup zones', 'Add commercial Airbnb linen cleaning contracts']
      }
    },
    analysis: {
      overallHealthScore: 71,
      aiConfidence: 86,
      bacsIndexScore: 73,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 86, priority: 'Low', explanation: 'Well-defined pain point for urban apartment renters without in-unit laundry.', recommendedAction: 'Target marketing directly to non-laundry apartment complexes.' },
        { key: 'validation', title: 'Problem Validation', score: 82, priority: 'Low', explanation: 'Strong survey validation (210 respondents, 78% interest).', recommendedAction: 'Convert survey respondents into pre-paid charter members.' },
        { key: 'market', title: 'Market Readiness', score: 76, priority: 'Medium', explanation: 'High demand for convenience services in Denver.', recommendedAction: 'Secure lease before competitor claims corridor.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 60, priority: 'Critical', explanation: 'High CapEx ($280k) requires strict payback model and equipment financing.', recommendedAction: 'Secure SBA loan approval early.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 68, priority: 'Medium', explanation: 'Offline apartment lobby marketing combined with geo-targeted search works well.', recommendedAction: 'Negotiate flyers with property managers.' },
        { key: 'trust', title: 'Trust Score', score: 70, priority: 'Medium', explanation: 'Eco-certification and modern branding build strong early trust.', recommendedAction: 'Display solar kilowatt counter in store front.' },
        { key: 'competition', title: 'Competitive Position', score: 78, priority: 'Low', explanation: 'Differentiates sharply against old, dirty neighborhood coin-ops.', recommendedAction: 'Highlight bright lounge & fast wifi amenities.' },
        { key: 'operations', title: 'Operational Readiness', score: 58, priority: 'High', explanation: 'Pickup & delivery logistics need tight route management to stay profitable.', recommendedAction: 'Limit delivery radius to a 3-mile initial zone.' }
      ],
      executiveSummary: 'Sudsy Eco Laundromat has validated strong consumer demand for app-based laundry delivery in high-density Denver renter corridors. The primary hurdle is managing CapEx equipment financing ($280k) and keeping delivery route logistics tight.',
      strengths: [
        'High demand in apartment heavy district with no in-unit laundry',
        'Dual revenue stream: steady self-serve cash flow + high-margin recurring delivery subscriptions',
        'Strong eco-positioning with solar power and hypoallergenic soaps'
      ],
      weaknesses: [
        'Heavy upfront equipment CapEx ($280,000)',
        'Delivery driver fuel and labor costs require dense route optimization'
      ],
      growthOpportunities: [
        'B2B contracts for local boutique hotels, gyms, and Airbnb hosts',
        'Pre-selling lifetime founder memberships before doors open',
        'Automated lockers in apartment lobbies for 24/7 drop-offs'
      ],
      criticalRisks: [
        'Utility hookup delays (gas/water/electric transformer upgrades)',
        'Rising local commercial lease rates per square foot'
      ],
      quickWins: [
        'Offer 50 apartment property managers free laundry service in exchange for lobby flyer placement',
        'Apply for Denver Green Business municipal clean energy grants',
        'Collect $25 pre-launch waitlist deposits for free laundry bags'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Lease & Financing', duration: 'Days 1-30', focusArea: 'CapEx & Site Control', items: ['Sign lease with 90-day rent-free buildout period', 'Finalize SBA 7(a) equipment loan approval', 'Obtain municipal plumbing permits'] },
        { phase: 'Phase 2', title: 'Buildout & Charter Presale', duration: 'Days 31-60', focusArea: 'Store Construction', items: ['Install Dexter high-efficiency washers & solar panels', 'Pre-sell 50 delivery subscriptions via neighborhood ads', 'Set up Cents POS & driver dispatch app'] },
        { phase: 'Phase 3', title: 'Grand Opening & Scale', duration: 'Days 61-90', focusArea: 'Launch & B2B', items: ['Host neighborhood ribbon-cutting with free wash day', 'Scale wash-and-fold delivery to 150 active subscribers', 'Pitch local Airbnb co-hosts for linen services'] }
      ],
      priorityMatrix: [
        { task: 'Secure SBA Equipment Loan Approval', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Pre-sell 50 Charter Subscriptions', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Partner with Apartment Property Managers', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Build Custom Custom Mobile App', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Apartment renters will pay $89/mo for laundry wash & fold delivery.',
          whyItMatters: 'Delivery subscription cash flow is essential to pay off equipment loan debt service.',
          riskIfWrong: 'Relying solely on low-margin self-serve walk-in quarter machines.',
          lowCostExperiment: 'Create a simple landing page offering 1-month trial for $49 and track credit card pre-orders.'
        },
        {
          assumption: 'The municipal power grid can support 24 commercial gas dryers without a $40k transformer upgrade.',
          whyItMatters: 'Unforeseen utility upgrade fees will drain cash reserves before opening.',
          riskIfWrong: 'Cost overrun and 3-month construction halt.',
          lowCostExperiment: 'Hire a licensed MEP engineer for a $750 site utility inspection before signing lease.'
        },
        {
          assumption: 'DoorDash Drive can handle peak delivery overflow without ruining turnaround times.',
          whyItMatters: 'Hiring full-time in-house drivers is unprofitable until subscription density reaches 100 users per zip code.',
          riskIfWrong: 'Late deliveries ruining customer retention.',
          lowCostExperiment: 'Run a 2-week test delivery pilot using DoorDash Drive with a partner laundromat.'
        }
      ]
    }
  },
  {
    id: 'swift-logistics',
    name: 'Apex Freight & Logistics',
    industry: 'Logistics',
    stage: 'expansion',
    tagline: 'Regional cold-chain freight fleet planning multi-state warehouse expansion.',
    iconName: 'Truck',
    businessJson: {
      business: {
        name: 'Apex Freight & Logistics',
        industry: 'Logistics',
        stage: 'expansion',
        description: 'Regional temperature-controlled logistics provider specializing in pharmaceutical and organic food distribution.',
        location: 'Columbus, OH',
        model: 'B2B Dedicated Contract Carriage & Cold Warehouse Storage',
        tagLine: 'Precision Cold-Chain Distribution'
      },
      market: {
        targetAudience: 'Mid-sized food manufacturers, grocery chains, and healthcare distributors in the Midwest.',
        marketSize: '$118B US Cold Chain Logistics Market',
        trends: ['FDA FSMA strict temperature monitoring regulations', 'Short-haul regional dedicated fleets', 'IoT sensor tracking'],
        geographicalFocus: 'Ohio, Indiana, Michigan, Pennsylvania corridor'
      },
      customer: {
        idealPersona: 'VP of Supply Chain at a regional organic dairy or pharma distributor needing 100% compliance SLA.',
        painPoints: ['Spoilage risk from unmonitored reefer trailers', 'Unreliable freight brokers', 'Driver capacity shortages'],
        purchasingDrivers: ['Real-time IoT temperature telemetry logs', '99.2% on-time delivery track record', 'Dedicated fleet contracts']
      },
      pricing: {
        model: 'Milestone Freight Contract ($3.40/mile reefer rate + fuel surcharge + $14/pallet/month cold storage)',
        averagePricePoint: '$42,000/mo per enterprise contract',
        marginsEstimated: '22% Net Operating Margin',
        pricingTierDetails: 'Dedicated Tractor-Trailer $3.60/mi; LTL Cold $4.10/mi; Pallet Storage $14/mo'
      },
      marketing: {
        primaryChannels: ['Direct B2B Enterprise Account Executive Outbound', 'Midwest Supply Chain Expos', 'LinkedIn Executive Thought Leadership'],
        customerAcquisitionCost: '$1,400 per enterprise contract',
        strategyNotes: 'Focus on case studies demonstrating zero-spoilage compliance for pharma clients.'
      },
      operations: {
        coreStack: ['Samsara Telemetry', 'McLeod TMS', 'QuickBooks Enterprise', 'Samsara Asset Tracking'],
        keyTeamRoles: ['CEO / Founder', 'Fleet Safety Manager', 'Dispatch Supervisor (3)', 'CDL-A Drivers (18)'],
        supplyChainOrWorkflow: '14 owned reefer trucks + 20,000 sq ft temperature-monitored hub in Columbus.'
      },
      competition: {
        mainCompetitors: ['Lineage Logistics', 'Americold', 'Regional freight brokers'],
        keyDifferentiators: ['Direct driver accountability with zero broker middleman', 'Real-time live customer temperature portal', 'Same-day emergency reefer dispatch'],
        competitiveMoat: 'Long-term dedicated multi-year contracts with top 3 regional grocery chains.'
      },
      financials: {
        monthlyRevenue: '$285,000/month',
        burnRate: '$222,000/month operating expenses',
        breakEvenStatus: 'Highly Profitable ($63,000/mo net operating income)',
        fundingStatus: '$450k commercial line of credit (unused)'
      },
      proof: {
        evidenceAndTraction: '14 trucks running at 94% route capacity. 99.4% on-time delivery rate over last 12 months.',
        customerTestimonialsOrMetrics: '"Apex has maintained 100% cold-chain audit compliance for 3 years straight." - Supply Director, Horizon Dairy',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Acquire 30,000 sq ft satellite warehouse in Indianapolis and add 6 reefer trucks.',
        expansionTargets: ['Indianapolis hub expansion', 'Pharma cold-chain certification upgrade'],
        keyMilestones: ['Secure $1.2M equipment loan', 'Sign 2 anchor contracts in Indiana', 'Hire 8 CDL-A drivers']
      },
      risks: {
        criticalRisks: [
          'High fuel price spikes eroding non-indexed contracts',
          'CDL driver recruitment bottlenecks',
          'Capital lockup in new warehouse lease prior to contract execution'
        ],
        biggestAssumption: 'Indianapolis food producers will switch from existing brokers to Apex dedicated freight contract.'
      },
      recommendations: {
        immediateActions: [
          'Pre-sign anchor tenant contract in Indianapolis before executing warehouse lease',
          'Implement automated fuel surcharge adjustment indexing on all contracts',
          'Launch CDL driver referral bonus program ($1,500 per driver hire)'
        ],
        longTermFocus: ['Achieve GDP (Good Distribution Practice) pharma certification for high-margin medical loads', 'Transition fleet to low-emission hybrid reefer units']
      }
    },
    analysis: {
      overallHealthScore: 86,
      aiConfidence: 94,
      bacsIndexScore: 88,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 92, priority: 'Low', explanation: 'Deep relationships with regional food and pharma producers.', recommendedAction: 'Maintain executive QBR reviews.' },
        { key: 'validation', title: 'Problem Validation', score: 95, priority: 'Low', explanation: '99.4% on-time rate and zero spoilage track record.', recommendedAction: 'Use performance metrics in expansion sales pitch.' },
        { key: 'market', title: 'Market Readiness', score: 88, priority: 'Low', explanation: 'Cold-chain demand is growing steadily.', recommendedAction: 'Expand regional footprint.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 84, priority: 'Low', explanation: 'Solid $63k monthly net profit with low debt.', recommendedAction: 'Fund expansion through mix of profits and lease financing.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 72, priority: 'Medium', explanation: 'Outbound sales team needed for new Indianapolis territory.', recommendedAction: 'Hire regional account director in Indy.' },
        { key: 'trust', title: 'Trust Score', score: 96, priority: 'Low', explanation: 'Flawless audit trail and IoT telemetry builds immense enterprise trust.', recommendedAction: 'Feature live temperature dashboard in sales meetings.' },
        { key: 'competition', title: 'Competitive Position', score: 82, priority: 'Low', explanation: 'Beats generic brokers on reliability and sensor tracking.', recommendedAction: 'Emphasize dedicated fleet guarantee.' },
        { key: 'operations', title: 'Operational Readiness', score: 78, priority: 'Medium', explanation: 'Driver recruitment is the main operational constraint for expanding 6 trucks.', recommendedAction: 'Build driver talent pipeline.' }
      ],
      executiveSummary: 'Apex Freight is a highly profitable, operationally sound cold-chain logistics business ready for regional expansion into Indianapolis. Securing anchor B2B contracts before signing warehouse leases will ensure low-risk, immediate profitability in the new territory.',
      strengths: [
        'Robust $63,000 monthly net operating profit (22% net margin)',
        'Superior 99.4% on-time delivery rate with IoT temperature monitoring',
        'Strong balance sheet with $450k unused credit line'
      ],
      weaknesses: [
        'Driver recruitment capacity constraints in Midwest CDL market',
        'Geographic concentration in Ohio hub'
      ],
      growthOpportunities: [
        'Indianapolis hub expansion capturing cross-Midwest freight routes',
        'High-margin pharmaceutical cold-chain transport certification',
        'Cross-docking services for small local food artisans'
      ],
      criticalRisks: [
        'Diesel fuel price spikes without automatic contract indexing',
        'Executing warehouse lease before securing committed freight volume'
      ],
      quickWins: [
        'Update all customer contracts to auto-adjust fuel surcharges weekly based on EIA index',
        'Launch driver referral bonus program to recruit 4 CDL drivers in 30 days',
        'Pre-sell 40% of planned Indianapolis warehouse pallet space'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Contract Pre-Selling', duration: 'Days 1-30', focusArea: 'Indianapolis Demand', items: ['Execute LOI with 2 anchor Indianapolis food distributors', 'Audit EIA fuel index clause across existing contracts', 'Begin CDL driver recruitment campaign'] },
        { phase: 'Phase 2', title: 'Facility Lease & Fleet Purchase', duration: 'Days 31-60', focusArea: 'Infrastructure Expansion', items: ['Sign Indianapolis 30,000 sq ft warehouse lease', 'Take delivery of 6 leased Freightliner reefer trucks', 'Install Samsara IoT sensors on new fleet'] },
        { phase: 'Phase 3', title: 'Go-Live & Optimization', duration: 'Days 61-90', focusArea: 'Regional Operations', items: ['Commence daily Columbus-Indianapolis freight lane runs', 'Achieve 85% pallet capacity in new warehouse', 'Review quarterly operating margin targets'] }
      ],
      priorityMatrix: [
        { task: 'Secure Indianapolis Anchor Tenant LOIs', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Lease & Outfit Indianapolis Warehouse Hub', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Index All Contracts to EIA Fuel Price', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Upgrade Fleet to Electric Yard Horses', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Indianapolis food producers will switch from existing freight brokers to Apex dedicated contracts.',
          whyItMatters: 'Expansion warehouse lease fixed cost ($18,000/mo) requires immediate contract volume.',
          riskIfWrong: 'Carrying empty warehouse overhead for 6+ months.',
          lowCostExperiment: 'Secure signed Letters of Intent (LOI) for $30,000/mo freight spend before signing lease.'
        },
        {
          assumption: 'Apex can recruit 8 qualified CDL-A drivers in Indianapolis within 45 days.',
          whyItMatters: 'New reefer trucks cannot sit idle without incurring lease payments.',
          riskIfWrong: 'Turning down booked freight loads due to driver shortage.',
          lowCostExperiment: 'Run a $500 targeted Facebook/Indeed driver hiring campaign in Indy to measure applicant lead flow.'
        },
        {
          assumption: 'Samsara IoT temperature logs provide enough value to charge a 15% rate premium over traditional carriers.',
          whyItMatters: 'Higher reefer rate ($3.40 vs $2.95/mi) is key to maintaining 22% net margins.',
          riskIfWrong: 'Price competition forcing rate concessions.',
          lowCostExperiment: 'Present the IoT audit portal to 3 prospective clients during price negotiations and test compliance willingness.'
        }
      ]
    }
  },
  {
    id: 'maison-fashion',
    name: 'Maison Atelier',
    industry: 'Fashion',
    stage: 'existing',
    tagline: 'Sustainable linen apparel brand facing high return rates and rising Meta CAC.',
    iconName: 'Shirt',
    businessJson: {
      business: {
        name: 'Maison Atelier',
        industry: 'Fashion',
        stage: 'existing',
        description: 'Ethical, European-certified organic linen resortwear designed for timeless capsule wardrobes.',
        location: 'Miami, FL',
        model: 'DTC E-Commerce & Selective Wholesale Boutiques',
        tagLine: 'Timeless Sustainable Linen'
      },
      market: {
        targetAudience: 'Women aged 28-50 prioritizing eco-luxury, minimalist aesthetic, and vacation apparel.',
        marketSize: '$3.1B Sustainable Apparel segment',
        trends: ['Capsule wardrobes', 'Plastic-free organic fibers', 'Monochrome linen sets'],
        geographicalFocus: 'US Coastal States (FL, CA, NY, SC)'
      },
      customer: {
        idealPersona: 'Eco-conscious professional woman who travels frequently and values breathable luxury fabrics.',
        painPoints: ['Linen wrinkling too easily', 'Inconsistent online fit leading to wrong size orders', 'Cheap fast-fashion knockoffs'],
        purchasingDrivers: ['100% French organic flax certification', 'Flattering relaxed tailoring', 'Plastic-free shipping']
      },
      pricing: {
        model: 'Premium Direct (Tops $110, Pants $140, Dresses $185)',
        averagePricePoint: '$155 Average Order Value (AOV)',
        marginsEstimated: '68% Gross Margin',
        pricingTierDetails: 'Linen Shirt $110, Wide Leg Trousers $140, Wrap Dress $185, Resort Bundle $380'
      },
      marketing: {
        primaryChannels: ['Meta Instagram Video Ads', 'Pinterest Lifestyle Pins', 'Klaviyo Email Automations'],
        customerAcquisitionCost: '$52 current CAC (up from $31 last year)',
        strategyNotes: 'Rising CAC is eroding marketing ROI; email revenue needs to hit 35% of total.'
      },
      operations: {
        coreStack: ['Shopify', 'Klaviyo', 'Loop Returns', 'Gorgias Customer Service'],
        keyTeamRoles: ['Founder / Creative Director', 'E-Commerce Growth Lead', 'Customer Success Manager'],
        supplyChainOrWorkflow: 'Organic linen fabric woven in Portugal, ethical garment assembly in family factory in Portugal.'
      },
      competition: {
        mainCompetitors: ['Deiji Studios', 'Lunya', 'Posse', 'Reformational linen line'],
        keyDifferentiators: ['Pre-shrunk softened French flax', 'Tailored versatile cuts that transition from beach to dinner', 'Zero synthetic dyes'],
        competitiveMoat: 'Exclusive OEKO-TEX certified European linen supply agreement.'
      },
      financials: {
        monthlyRevenue: '$64,000/month average',
        burnRate: '$59,000/month operating expenses',
        breakEvenStatus: 'Modestly Profitable ($5,000/mo net profit margin ~7.8%)',
        fundingStatus: 'Bootstrapped ($40k founder loan)'
      },
      proof: {
        evidenceAndTraction: '12,000 active customer email subscribers. 28% repeat purchase rate within 6 months.',
        customerTestimonialsOrMetrics: '"The linen trousers are my absolute staple for summer travel." - Vogue Reader Feature',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Cut return rate from 28% to 16% and reduce CAC by boosting organic influencer gifting.',
        expansionTargets: ['Wholesale placement in 20 luxury resort boutiques', 'International shipping to UK/EU'],
        keyMilestones: ['Implement video sizing guide on product pages', 'Launch VIP email loyalty tier', 'Achieve $90k monthly revenue']
      },
      risks: {
        criticalRisks: [
          'High apparel return rate (28%) burning shipping & restocking costs',
          'Rising Meta ad acquisition costs ($52 CAC)',
          'Deadstock inventory tie-up in unpopular size SKUs'
        ],
        biggestAssumption: 'Adding video fit guides and customer reviews will reduce sizing-related returns by 40%.'
      },
      recommendations: {
        immediateActions: [
          'Integrate true-to-size interactive fit calculator on all Shopify product pages',
          'Launch post-purchase SMS sizing check-in flow before shipping',
          'Pre-order drop next collection to fund production upfront'
        ],
        longTermFocus: ['Expand wholesale distribution in luxury hotel resort shops', 'Develop recycled linen blend line for lower price point entry']
      }
    },
    analysis: {
      overallHealthScore: 70,
      aiConfidence: 89,
      bacsIndexScore: 72,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 86, priority: 'Low', explanation: 'Strong brand affinity among eco-conscious luxury travelers.', recommendedAction: 'Gather video testimonials.' },
        { key: 'validation', title: 'Problem Validation', score: 88, priority: 'Low', explanation: 'Good repeat purchase rate (28%) proves garment quality.', recommendedAction: 'Nurture loyal customer base via VIP perks.' },
        { key: 'market', title: 'Market Readiness', score: 80, priority: 'Low', explanation: 'Linen resortwear trend remains strong.', recommendedAction: 'Capitalize on seasonal vacation rushes.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 62, priority: 'Critical', explanation: '7.8% net margin is squeezed by 28% product return rate and $52 CAC.', recommendedAction: 'Fix online fit guidance to lower return costs.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 58, priority: 'High', explanation: 'Over-reliant on Meta paid ads; email & organic channels underperforming.', recommendedAction: 'Scale Klaviyo automation and micro-influencer gifting.' },
        { key: 'trust', title: 'Trust Score', score: 84, priority: 'Low', explanation: 'OEKO-TEX organic certification provides genuine credibility.', recommendedAction: 'Highlight fabric certifications on product badges.' },
        { key: 'competition', title: 'Competitive Position', score: 74, priority: 'Medium', explanation: 'Pre-shrunk softened linen is a good differentiator.', recommendedAction: 'Showcase wash durability in video ads.' },
        { key: 'operations', title: 'Operational Readiness', score: 66, priority: 'High', explanation: 'Returns processing via Loop Returns needs better size-exchange incentives.', recommendedAction: 'Offer 10% bonus credit on exchanges vs refunds.' }
      ],
      executiveSummary: 'Maison Atelier has a stylish product with strong 68% gross margins, but net profits are hindered by an 28% return rate and $52 Meta CAC. Adding interactive fit guides and incentivizing size exchanges over cash refunds will instantly recover $6,000+ monthly revenue.',
      strengths: [
        'High-quality OEKO-TEX certified organic European linen',
        'Strong $155 Average Order Value (AOV)',
        'Healthy 28% repeat customer rate'
      ],
      weaknesses: [
        'High 28% apparel return rate eating profit in restocking fees',
        'Rising Meta CAC ($52) eroding DTC ad profit'
      ],
      growthOpportunities: [
        'Wholesale placement in 20 luxury coastal resort boutiques',
        'VIP Email loyalty program driving 35%+ of store revenue',
        'Pre-order capsule drops to eliminate deadstock inventory'
      ],
      criticalRisks: [
        'Deadstock cash tie-up in XS/XL extreme sizes',
        'Dependence on Meta ad platform algorithm shifts'
      ],
      quickWins: [
        'Offer $15 bonus store credit when customers choose a size exchange over a cash refund',
        'Add 15-second model fit videos showing 3 different height models for top 5 dresses',
        'Activate Klaviyo abandoned checkout 3-step SMS sequence'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Return Rate Reduction', duration: 'Days 1-30', focusArea: 'Fit Guidance & Exchanges', items: ['Install interactive sizing calculator app', 'Add video model fit clips to top 5 PDPs', 'Set up Loop Returns exchange bonus incentive'] },
        { phase: 'Phase 2', title: 'Retention & Email Growth', duration: 'Days 31-60', focusArea: 'Klaviyo Revenue', items: ['Launch VIP Linen Club loyalty email tier', 'Run organic micro-influencer gifting campaign (40 creators)', 'A/B test Pinterest video pins vs Meta ads'] },
        { phase: 'Phase 3', title: 'Resort Wholesale Expansion', duration: 'Days 61-90', focusArea: 'B2B Distribution', items: ['Pitch 25 Florida/Caribbean resort boutiques', 'Execute pre-order drop for Spring capsule', 'Target 16% max return rate and 15% net margin'] }
      ],
      priorityMatrix: [
        { task: 'Add Video Model Fit Clips to Product Pages', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Launch Resort Wholesale Outbound Sales', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Incentivize Size Exchanges in Loop Returns', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Redesign Entire Brand Website Template', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Adding model sizing videos will reduce apparel return rates from 28% to 18%.',
          whyItMatters: 'Each returned garment costs $14 in two-way shipping, inspection, and repackaging fees.',
          riskIfWrong: 'Continued cash drain on reverse logistics.',
          lowCostExperiment: 'Add videos to the top 2 highest-returned dress SKUs and measure 30-day return rate delta.'
        },
        {
          assumption: 'Customers will accept store exchange credit with a $15 bonus instead of requesting a full refund.',
          whyItMatters: 'Retaining customer cash on exchange keeps revenue locked in.',
          riskIfWrong: 'Customers complain if exchange bonus is not clear.',
          lowCostExperiment: 'Turn on exchange bonus rule in Loop Returns for 14 days and track retention rate.'
        },
        {
          assumption: 'High-end resort boutiques will buy Maison Atelier wholesale at a 50% margin split.',
          whyItMatters: 'Wholesale opens predictable bulk cash flow without digital ad CAC.',
          riskIfWrong: 'Boutiques demand consignment terms instead of upfront purchase orders.',
          lowCostExperiment: 'Send sample boxes to 10 local Miami boutique owners and request feedback on wholesale pricing.'
        }
      ]
    }
  },
  {
    id: 'beacon-academy',
    name: 'Beacon STEM Academy',
    industry: 'Education',
    stage: 'existing',
    tagline: 'Private K-8 STEM academy facing student retention drops and marketing acquisition friction.',
    iconName: 'GraduationCap',
    businessJson: {
      business: {
        name: 'Beacon STEM Academy',
        industry: 'Education',
        stage: 'existing',
        description: 'Innovative private K-8 academy combining project-based robotics, coding, and outdoor environmental science.',
        location: 'Raleigh, NC',
        model: 'Annual Tuition & Summer STEM Camp Fees',
        tagLine: 'Future-Focused K-8 Education'
      },
      market: {
        targetAudience: 'Tech industry parents in Research Triangle Park seeking accelerated STEM learning for children.',
        marketSize: '$4.8B US Private Elementary Education Market',
        trends: ['Robotics & AI literacy for kids', 'Project-based learning', 'Smaller class sizes (< 16)'],
        geographicalFocus: 'Raleigh-Durham-Cary metro triangle'
      },
      customer: {
        idealPersona: 'Software engineer / biotech manager parent looking for engaging hands-on STEM curriculum.',
        painPoints: ['Overcrowded public school classrooms', 'Rote memorization teaching', 'Lack of coding in elementary grades'],
        purchasingDrivers: ['1:12 teacher-student ratio', 'Robotics lab facilities', 'High secondary prep placement']
      },
      pricing: {
        model: 'Annual Tuition ($14,500/yr per student) + Summer Camp ($450/week)',
        averagePricePoint: '$14,500 tuition per student',
        marginsEstimated: '18% Operating Margin',
        pricingTierDetails: 'K-4 Tuition $13,800/yr; 5-8 Tuition $15,200/yr; After-School STEM $220/mo'
      },
      marketing: {
        primaryChannels: ['Parent referral word-of-mouth', 'Community STEM Open House events', 'Local Google Search Ads'],
        customerAcquisitionCost: '$650 CAC per enrolled student',
        strategyNotes: 'Open House conversion rate is high (42%), but getting initial campus visits requires better local SEO.'
      },
      operations: {
        coreStack: ['Blackbaud SIS', 'Brightwheel Parent App', 'Google Workspace for Education', 'HubSpot CRM'],
        keyTeamRoles: ['Head of School', 'Director of Admissions', 'Lead STEM Instructors (12)', 'Administrative Assistant'],
        supplyChainOrWorkflow: '12-acre campus facility with 2 LEGO Robotics labs and outdoor hydroponic greenhouse.'
      },
      competition: {
        mainCompetitors: ['Ravenscroft School', 'Cary Academy', 'Local STEM charter schools'],
        keyDifferentiators: ['Dedicated AI & Robotics lab for K-4', '100% outdoors environmental science module', 'No standardized test pressure'],
        competitiveMoat: 'Proprietary project-based STEM curriculum co-designed with Duke University educators.'
      },
      financials: {
        monthlyRevenue: '$145,000/month average ($1.74M annual tuition)',
        burnRate: '$122,000/month operational expenses',
        breakEvenStatus: 'Profitable ($23,000/mo operating net profit)',
        fundingStatus: 'School bond debt ($420k remaining on campus upgrade)'
      },
      proof: {
        evidenceAndTraction: '120 enrolled students (capacity 150). 96% parent satisfaction score on annual survey.',
        customerTestimonialsOrMetrics: '"My daughter built a solar sensor car in 3rd grade. Beacon ignited her passion." - Parent Review',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Fill 30 vacant student seats to reach 100% campus capacity (150 students) and expand summer camps.',
        expansionTargets: ['High School 9-12 expansion wing', 'Weekend Coding Academy for non-enrolled kids'],
        keyMilestones: ['Host 4 Spring Open House events', 'Launch Parent Ambassador Referral Bonus', 'Reach 150 enrolled students']
      },
      risks: {
        criticalRisks: [
          '8th grade graduation student churn requiring new kindergarten enrollment fill',
          'Rising teacher compensation pressures in Raleigh tech market',
          'Facility maintenance debt payments'
        ],
        biggestAssumption: 'Offering a $1,000 tuition credit for parent referrals will generate 15 new student enrollments.'
      },
      recommendations: {
        immediateActions: [
          'Launch Parent Referral Ambassador Campaign with $1,000 tuition credit per successful enrollment',
          'Run targeted Google Search Ads for "Private STEM School Raleigh"',
          'Host Saturday Morning Family Robotics Workshops to drive campus visits'
        ],
        longTermFocus: ['Build corporate tuition subsidy partnerships with RTP biotech firms', 'Construct High School expansion wing']
      }
    },
    analysis: {
      overallHealthScore: 82,
      aiConfidence: 92,
      bacsIndexScore: 84,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 94, priority: 'Low', explanation: 'Targeting tech parents in Research Triangle with exact curriculum alignment.', recommendedAction: 'Maintain parent advisory board.' },
        { key: 'validation', title: 'Problem Validation', score: 92, priority: 'Low', explanation: '96% parent satisfaction and 120 enrolled students prove strong positioning.', recommendedAction: 'Gather video parent testimonials.' },
        { key: 'market', title: 'Market Readiness', score: 86, priority: 'Low', explanation: 'Raleigh tech population growth drives demand for premium private education.', recommendedAction: 'Partner with tech HR onboarding teams.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 78, priority: 'Low', explanation: 'Healthy $23k monthly operating profit, but 30 empty seats represent $435k missed annual tuition.', recommendedAction: 'Fill remaining 30 seats.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 68, priority: 'Medium', explanation: 'Relying too passively on organic word-of-mouth; needs structured parent referral engine.', recommendedAction: 'Launch $1,000 tuition referral perk.' },
        { key: 'trust', title: 'Trust Score', score: 95, priority: 'Low', explanation: 'Duke University curriculum co-design creates undeniable academic trust.', recommendedAction: 'Feature Duke partnership prominently on homepage.' },
        { key: 'competition', title: 'Competitive Position', score: 84, priority: 'Low', explanation: 'Robotics & AI labs for K-4 stand out against traditional prep schools.', recommendedAction: 'Showcase student robotics projects.' },
        { key: 'operations', title: 'Operational Readiness', score: 80, priority: 'Low', explanation: '1:12 ratio and campus facilities operate smoothly.', recommendedAction: 'Optimize summer camp facility utilization.' }
      ],
      executiveSummary: 'Beacon STEM Academy is a high-performing private school with strong academic trust and solid profits. However, 30 vacant seats represent $435,000 in unrealized high-margin annual tuition. Activating a parent referral program will quickly fill campus capacity.',
      strengths: [
        'Proprietary STEM curriculum co-developed with Duke educators',
        'High 96% parent satisfaction rating',
        'High-value tuition model ($14,500/year per student)'
      ],
      weaknesses: [
        '30 empty seats out of 150 student capacity',
        'Passive marketing lead generation process'
      ],
      growthOpportunities: [
        'Parent Referral Program ($1,000 tuition discount per referral)',
        'Summer STEM Camp scale (adding 200 non-enrolled camper slots)',
        'Corporate employee education perk packages with RTP tech companies'
      ],
      criticalRisks: [
        'Annual 8th-grade graduating class churn requiring constant top-of-funnel kindergarten admissions',
        'Teacher retention competition with public school salary raises'
      ],
      quickWins: [
        'Announce $1,000 Tuition Credit Referral Program to existing school parents',
        'Host a free "Build a Robot with Dad/Mom" Saturday event for prospective families',
        'Set up automated email nurture series for parents who download the curriculum overview brochure'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Referral Engine Launch', duration: 'Days 1-30', focusArea: 'Parent Advocacy', items: ['Announce $1,000 Tuition Referral Credit to current parents', 'Host 2 Saturday Family STEM Workshops', 'Launch local Google Search Ad campaign for Fall admissions'] },
        { phase: 'Phase 2', title: 'Open House & Campus Tours', duration: 'Days 31-60', focusArea: 'Admissions Conversion', items: ['Conduct 4 personalized Open House campus tour weekends', 'Follow up with 45 prospective parent inquiries', 'Secure 20 new enrolled student commitments'] },
        { phase: 'Phase 3', title: 'Summer Camp Expansion', duration: 'Days 61-90', focusArea: 'Off-Season Revenue', items: ['Sell out 8 weeks of Summer STEM Camp (200 campers)', 'Finalize 100% full 150-student enrollment for Fall term', 'Achieve $2.1M annual tuition run-rate'] }
      ],
      priorityMatrix: [
        { task: 'Launch Parent Referral Tuition Credit Campaign', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Secure RTP Corporate Employee Tuition Subsidies', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Host Saturday Morning Family STEM Workshops', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Build New High School Classroom Wing', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Current satisfied parents will actively refer friends if offered a $1,000 tuition credit.',
          whyItMatters: 'Word-of-mouth is the highest-converting lead source for private schools.',
          riskIfWrong: 'Low participation rate if parents feel uncomfortable selling to friends.',
          lowCostExperiment: 'Survey 20 top parent advocate families to test interest in the referral credit program.'
        },
        {
          assumption: 'Saturday morning STEM workshops will convert 30% of visiting families into tour applications.',
          whyItMatters: 'Hands-on experience shows children\'s excitement to parents directly.',
          riskIfWrong: 'High weekend staff labor cost with low admissions outcome.',
          lowCostExperiment: 'Host 1 test workshop capped at 15 families and measure application submission rate within 7 days.'
        },
        {
          assumption: 'RTP tech companies will promote Beacon STEM Academy in their new employee relocation packets.',
          whyItMatters: 'Provides direct access to relocating tech families moving to Raleigh.',
          riskIfWrong: 'HR departments decline to partner with private schools.',
          lowCostExperiment: 'Pitch HR benefits leads at 3 local tech firms with an exclusive corporate tuition discount offer.'
        }
      ]
    }
  },
  {
    id: 'nexus-digital',
    name: 'Nexus Growth Agency',
    industry: 'Agency',
    stage: 'expansion',
    tagline: 'B2B performance marketing agency transitioning from custom projects to productized retainers.',
    iconName: 'Zap',
    businessJson: {
      business: {
        name: 'Nexus Growth Agency',
        industry: 'Agency',
        stage: 'expansion',
        description: 'Specialized performance growth agency driving paid media and conversion rate optimization for B2B SaaS brands.',
        location: 'San Francisco, CA',
        model: 'Monthly Productized Retainers ($6k-$15k/mo) + Performance Upside',
        tagLine: 'Data-Driven B2B Growth Engineering'
      },
      market: {
        targetAudience: 'Series A to C B2B SaaS companies ($2M-$20M ARR) struggling to scale customer acquisition efficiently.',
        marketSize: '$42B Global Digital Agency Market',
        trends: ['Productized fixed-scope retainers', 'AI-assisted creative testing', 'RevOps integration'],
        geographicalFocus: 'North American B2B SaaS hubs (SF, Austin, NY, Toronto)'
      },
      customer: {
        idealPersona: 'VP of Marketing or CMO at a 40-person SaaS company with a $30k+ monthly ad budget.',
        painPoints: ['Slow internal creative production', 'High CAC on LinkedIn & Google', 'Agencies that report vanity metrics instead of pipeline MRR'],
        purchasingDrivers: ['Proven pipeline attribution', 'Fast 14-day onboarding sprint', 'Transparent Slack communication']
      },
      pricing: {
        model: 'Monthly Retainer (Core $7,500/mo, Scale $12,500/mo) + 5% of Net New ARR generated',
        averagePricePoint: '$9,200 monthly retainer per client',
        marginsEstimated: '48% Gross Margin',
        pricingTierDetails: 'Core Growth $7,500/mo; Scale Growth $12,500/mo; CRO Add-on $3,500/mo'
      },
      marketing: {
        primaryChannels: ['LinkedIn Founder Video Thought Leadership', 'Cold Email Outbound Campaigns', 'SaaS Growth Case Study PDF Assets'],
        customerAcquisitionCost: '$2,800 per retained client',
        strategyNotes: 'Outbound cold email generates 40% of meetings; LinkedIn content generates high-intent inbounds.'
      },
      operations: {
        coreStack: ['ClickUp', 'Slack Connect', 'HubSpot CRM', 'Supermetrics', 'TripleWhale'],
        keyTeamRoles: ['Managing Director', 'Head of Media Buying', 'Senior CRO Strategist (2)', 'Copywriter & Designer (3)'],
        supplyChainOrWorkflow: 'Fully remote 10-person team operating agile 2-week client sprint cycles.'
      },
      competition: {
        mainCompetitors: ['Refine Labs', 'Directive Consulting', 'KlientBoost'],
        keyDifferentiators: ['Exclusive focus on B2B SaaS pipeline ARR (not just clicks)', '14-day rapid creative launch guarantee', 'Fixed productized packages with no surprise hourly bills'],
        competitiveMoat: 'Proprietary B2B ad creative testing framework & benchmark dataset across 40+ SaaS accounts.'
      },
      financials: {
        monthlyRevenue: '$110,000/month MRR (12 active retainers)',
        burnRate: '$78,000/month operational expenses',
        breakEvenStatus: 'Highly Profitable ($32,000/mo net operating profit)',
        fundingStatus: 'Bootstrapped ($90k retained cash reserve)'
      },
      proof: {
        evidenceAndTraction: '12 active enterprise retainers with average client lifespan of 16 months. Scaled Client A from $3M to $8M ARR.',
        customerTestimonialsOrMetrics: '"Nexus lowered our LinkedIn CAC by 38% while doubling qualified demo bookings in 60 days." - CMO, CloudScale SaaS',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Expand MRR from $110k to $200k by adding a dedicated outbound sales team and productized CRO audit.',
        expansionTargets: ['UK/European B2B SaaS expansion', 'AI Ad Creative Generator SaaS spin-off'],
        keyMilestones: ['Hire dedicated Account Executive', 'Productize $2,500 Growth Audit lead magnet', 'Reach 20 active retainers']
      },
      risks: {
        criticalRisks: [
          'Client concentration risk (Top 2 clients represent 32% of total MRR)',
          'Team utilization bottleneck at 85% capacity requiring senior hires',
          'SaaS client budget cuts during economic downturns'
        ],
        biggestAssumption: 'Selling a standalone $2,500 "Growth Audit" will convert 40% of buyers into $9,200/mo ongoing retainers.'
      },
      recommendations: {
        immediateActions: [
          'Launch productized $2,500 "B2B SaaS Growth Audit" to shorten sales cycles',
          'Hire 1 Senior Media Buyer to unlock team capacity for 5 new client retainers',
          'Set up automated Slack client health alerts to prevent churn'
        ],
        longTermFocus: ['Build automated client dashboard portal', 'Spin off internal creative workflow tool into standalone micro-SaaS']
      }
    },
    analysis: {
      overallHealthScore: 84,
      aiConfidence: 93,
      bacsIndexScore: 86,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 94, priority: 'Low', explanation: 'Sharp ideal customer profile focused on Series A-C B2B SaaS.', recommendedAction: 'Refine case studies.' },
        { key: 'validation', title: 'Problem Validation', score: 92, priority: 'Low', explanation: '16-month average client retention proves strong service delivery.', recommendedAction: 'Gather video case study interviews.' },
        { key: 'market', title: 'Market Readiness', score: 86, priority: 'Low', explanation: 'B2B SaaS companies constantly need pipeline efficiency.', recommendedAction: 'Scale LinkedIn authority content.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 88, priority: 'Low', explanation: 'Predictable $110k MRR with high 29% net profit margin.', recommendedAction: 'Reinvest cash flow into sales talent.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 76, priority: 'Medium', explanation: 'Needs dedicated outbound AE to convert pipeline faster.', recommendedAction: 'Hire full-time Account Executive.' },
        { key: 'trust', title: 'Trust Score', score: 90, priority: 'Low', explanation: 'Verified case studies with hard ARR metrics establish elite credibility.', recommendedAction: 'Feature client ROI metrics on homepage hero.' },
        { key: 'competition', title: 'Competitive Position', score: 82, priority: 'Low', explanation: 'Productized pricing sets Nexus apart from hourly agencies.', recommendedAction: 'Promote 14-day rapid launch guarantee.' },
        { key: 'operations', title: 'Operational Readiness', score: 72, priority: 'High', explanation: 'Team utilization is at 85%; hiring senior media buyers is critical before adding 5 new clients.', recommendedAction: 'Recruit 1 Senior Media Buyer immediately.' }
      ],
      executiveSummary: 'Nexus Growth Agency is a thriving, highly profitable B2B performance agency with $110k MRR and 48% gross margins. Operational capacity is near full (85%). Hiring one senior media buyer and launching a productized $2,500 audit will easily push MRR past $180k.',
      strengths: [
        'Predictable $110,000 MRR with 16-month average client retention',
        'Strong 29% net profit margin ($32k/mo net cash generation)',
        'Productized retainer model eliminates scope creep disputes'
      ],
      weaknesses: [
        'Team utilization at 85% capacity limiting new client onboarding',
        'Client concentration (Top 2 accounts equal 32% of MRR)'
      ],
      growthOpportunities: [
        'Productized $2,500 "SaaS Growth Audit" as high-converting front-end lead magnet',
        'Hiring dedicated Account Executive to triple outbound demo volume',
        'Performance-based upside sharing on pipeline ARR milestones'
      ],
      criticalRisks: [
        'Sudden churn of top 2 clients reducing monthly profit by $35k',
        'Talent bottleneck delaying delivery if 3 clients sign simultaneously'
      ],
      quickWins: [
        'Package existing audit process into a $2,500 paid "Rapid SaaS Audit"',
        'Ask top 3 satisfied SaaS clients for warm introductions to peer founders',
        'Implement 90-day contract auto-renewal notices in ClickUp'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'Capacity & Front-End Audit', duration: 'Days 1-30', focusArea: 'Hiring & Lead Gen', items: ['Hire 1 Senior Media Buyer to expand client capacity', 'Package & launch the $2,500 Rapid SaaS Growth Audit', 'Publish 2 video case studies on LinkedIn'] },
        { phase: 'Phase 2', title: 'Outbound Sales Acceleration', duration: 'Days 31-60', focusArea: 'Sales Pipeline', items: ['Hire 1 dedicated B2B Account Executive', 'Sell 6 Rapid Growth Audits', 'Convert 3 audit buyers into $9,200/mo ongoing retainers'] },
        { phase: 'Phase 3', title: 'Scale to $200k MRR', duration: 'Days 61-90', focusArea: 'MRR Milestone', items: ['Cross $175k MRR threshold across 18 active accounts', 'Maintain zero client churn with Slack health alerts', 'Evaluate European B2B market entry'] }
      ],
      priorityMatrix: [
        { task: 'Launch $2,500 Paid Growth Audit Offer', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Hire Senior Media Buyer & Outbound AE', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Request Client Referral Introductions', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Build Custom Internal Client Portal', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'B2B SaaS CMOs will buy a $2,500 standalone Audit before committing to a $9,200/mo retainer.',
          whyItMatters: 'A paid audit lowers buyer friction and builds trust before long-term commitment.',
          riskIfWrong: 'Wasted effort building audit templates if buyers prefer direct proposals.',
          lowCostExperiment: 'Pitch the $2,500 Audit to 10 cold prospects on LinkedIn and track meeting acceptance rate.'
        },
        {
          assumption: 'Nexus can recruit and onboard a Senior Media Buyer within 30 days.',
          whyItMatters: 'Team is at 85% capacity; taking on 3 new clients without hiring will cause burn out and churn.',
          riskIfWrong: 'Overworked team leading to missed KPI targets and client cancellations.',
          lowCostExperiment: 'Post candidate role on LinkedIn and interview top 3 candidates within 14 days.'
        },
        {
          assumption: 'Top 2 enterprise clients will renew contracts for another 12 months.',
          whyItMatters: 'Top 2 clients represent 32% of total MRR ($35,000/mo).',
          riskIfWrong: 'Losing $35k MRR drops net profit to near zero.',
          lowCostExperiment: 'Conduct an executive QBR with both clients this week and present a 12-month joint growth roadmap.'
        }
      ]
    }
  },
  {
    id: 'urban-boutique',
    name: 'Velvet & Vine Retail',
    industry: 'Retail',
    stage: 'existing',
    tagline: 'Brick-and-mortar lifestyle boutique expanding into omnichannel e-commerce & local events.',
    iconName: 'ShoppingBag',
    businessJson: {
      business: {
        name: 'Velvet & Vine Retail',
        industry: 'Retail',
        stage: 'existing',
        description: 'Curated apparel, artisan home decor, and botanical gifts in a charming downtown storefront.',
        location: 'Savannah, GA',
        model: 'Brick-and-Mortar Storefront & E-Commerce Store',
        tagLine: 'Curated Southern Lifestyle & Decor'
      },
      market: {
        targetAudience: 'Local Savannah residents, weekend tourists, and southern lifestyle enthusiasts.',
        marketSize: '$1.8M local gift & lifestyle retail market',
        trends: ['Artisan home goods', 'Local maker pop-ups', 'Buy online, pick up in store (BOPIS)'],
        geographicalFocus: 'Downtown Savannah Historic District'
      },
      customer: {
        idealPersona: '35-60 year old woman shopping for unique host gifts, home accents, or vacation outfits.',
        painPoints: ['Generic mass-market department store items', 'Inconvenient store parking', 'Lack of online ordering'],
        purchasingDrivers: ['Unique local artist products', 'Beautiful gift packaging', 'Warm boutique customer service']
      },
      pricing: {
        model: 'Retail Keystone Markup (2.0x wholesale cost)',
        averagePricePoint: '$44 Average Order Value',
        marginsEstimated: '52% Gross Margin',
        pricingTierDetails: 'Gifts $18-$35, Home Decor $42-$95, Apparel $68-$140'
      },
      marketing: {
        primaryChannels: ['Instagram storefront aesthetic photos', 'Savannah tourism map ads', 'Local customer VIP SMS club'],
        customerAcquisitionCost: '$8 per customer via foot traffic & Instagram',
        strategyNotes: 'Needs better customer CRM capture at POS to turn one-time tourists into repeat online shoppers.'
      },
      operations: {
        coreStack: ['Shopify POS', 'Klaviyo', 'Stocky Inventory', 'Lightspeed'],
        keyTeamRoles: ['Owner / Lead Buyer', 'Assistant Store Manager', 'Sales Associates (3)'],
        supplyChainOrWorkflow: 'Weekly shipments from 40 independent artisans and Atlanta market vendors.'
      },
      competition: {
        mainCompetitors: ['Paris Market', 'One Fish Two Fish', 'Anthropologie local store'],
        keyDifferentiators: ['Exclusive Savannah artisan pottery & scents', 'Complimentary custom gift wrapping', 'Weekend wine & shop events'],
        competitiveMoat: 'Prime pedestrian foot traffic location on Historic Bull Street.'
      },
      financials: {
        monthlyRevenue: '$46,000/month average',
        burnRate: '$41,200/month operational expenses',
        breakEvenStatus: 'Profitable ($4,800/mo net operating profit)',
        fundingStatus: 'Bootstrapped ($15k working capital reserve)'
      },
      proof: {
        evidenceAndTraction: '4.8 stars across 240 Google reviews. 8 years in continuous operation on Bull Street.',
        customerTestimonialsOrMetrics: '"My favorite shop in Savannah! Found the most gorgeous hand-poured candle." - Tourist Review',
        validationLevel: 'High'
      },
      growth: {
        topGrowthGoal: 'Launch e-commerce store to capture tourist repeat sales post-vacation and hit $65k/mo revenue.',
        expansionTargets: ['Private evening shopping parties', 'Seasonal candle subscription box'],
        keyMilestones: ['Sync Shopify POS inventory with web store', 'Build tourist email capture flow', 'Reach $15k/mo online sales']
      },
      risks: {
        criticalRisks: [
          'High summer heat tourism drop in Savannah (July-August foot traffic dip)',
          'Inventory cash lock-up in slow-moving seasonal decor SKUs',
          'Rising commercial lease rent on Bull Street'
        ],
        biggestAssumption: 'Tourists who visit the store will purchase online from home if sent a post-trip email series.'
      },
      recommendations: {
        immediateActions: [
          'Capture tourist email/SMS at POS by offering a 10% post-vacation online shipping coupon',
          'Launch weekend "Sip & Shop" evening events to boost local resident foot traffic',
          'Run end-of-season clearance on slow-moving inventory to free up $8,000 in cash'
        ],
        longTermFocus: ['Build quarterly Southern Artisan Gift Box subscription line', 'Expand store footprint into adjacent space']
      }
    },
    analysis: {
      overallHealthScore: 72,
      aiConfidence: 87,
      bacsIndexScore: 74,
      scores: [
        { key: 'customer', title: 'Customer Clarity', score: 86, priority: 'Low', explanation: 'Strong tourist and local resident foot traffic appeal.', recommendedAction: 'Segment CRM between locals vs tourists.' },
        { key: 'validation', title: 'Problem Validation', score: 88, priority: 'Low', explanation: '8 years of continuous store profitability proves concept.', recommendedAction: 'Leverage store legacy in online marketing.' },
        { key: 'market', title: 'Market Readiness', score: 78, priority: 'Low', explanation: 'Savannah tourism traffic is steady, but summer months are slow.', recommendedAction: 'Use e-commerce to offset summer store dip.' },
        { key: 'revenue', title: 'Revenue Readiness', score: 64, priority: 'High', explanation: 'Modest $4,800 monthly net profit; cash locked in inventory.', recommendedAction: 'Clear deadstock to boost cash reserves.' },
        { key: 'marketing', title: 'Marketing Readiness', score: 60, priority: 'High', explanation: 'Missing out on post-vacation e-commerce sales from tourists.', recommendedAction: 'Implement POS email capture for 10% web coupon.' },
        { key: 'trust', title: 'Trust Score', score: 90, priority: 'Low', explanation: '240+ rave reviews on Google build high physical store trust.', recommendedAction: 'Feature Google review badges at checkout.' },
        { key: 'competition', title: 'Competitive Position', score: 76, priority: 'Medium', explanation: 'Unique local artisan scent line differentiates from mass retail.', recommendedAction: 'Promote proprietary scent candle line online.' },
        { key: 'operations', title: 'Operational Readiness', score: 68, priority: 'Medium', explanation: 'Shopify POS and e-commerce web store inventory must be synced 1:1.', recommendedAction: 'Audit stock counts with Stocky app.' }
      ],
      executiveSummary: 'Velvet & Vine Retail is a beloved Savannah boutique with a prime location, but loses potential revenue when tourists return home without an online buying channel. Syncing inventory to Shopify e-commerce and capturing emails at POS will unlock $15,000+ in online repeat sales.',
      strengths: [
        'Prime Bull Street location in Savannah Historic District with heavy foot traffic',
        'Stellar 4.8-star review rating across 240+ reviews',
        'High 52% keystone gross margin on unique artisan goods'
      ],
      weaknesses: [
        'Summer seasonal foot traffic dip in Savannah (July-August)',
        'Low online sales conversion due to untracked tourist emails'
      ],
      growthOpportunities: [
        'Post-vacation e-commerce email funnel targeting past store tourists',
        'Local "Sip & Shop" private evening shopping events for Savannah residents',
        'Artisan Scent Candle monthly subscription box'
      ],
      criticalRisks: [
        'Bull Street commercial lease rent renewal increase',
        'Deadstock inventory locking up working capital'
      ],
      quickWins: [
        'Implement POS prompt: "Want 10% off online shipping when you get home?" to capture emails',
        'Host a Thursday evening "Wine & Design" event for local neighborhood residents',
        'Discount 20 slow-moving home decor SKUs by 35% to generate $5,000 working cash'
      ],
      roadmap: [
        { phase: 'Phase 1', title: 'POS CRM & Deadstock Clearance', duration: 'Days 1-30', focusArea: 'Cash & Email Capture', items: ['Train POS staff to capture email/SMS with 10% web coupon', 'Run 14-day clearance sale on aged inventory', 'Sync Shopify POS stock 100% with e-commerce store'] },
        { phase: 'Phase 2', title: 'Tourist Post-Trip Email Engine', duration: 'Days 31-60', focusArea: 'Online Revenue Growth', items: ['Launch Klaviyo "Remember Savannah" 3-part email sequence', 'Run targeted Facebook ads to past store visitors', 'Achieve $5,000 in monthly online store sales'] },
        { phase: 'Phase 3', title: 'Omnichannel & Events', duration: 'Days 61-90', focusArea: 'Local Loyalty', items: ['Host monthly Sip & Shop private evening events', 'Launch Velvet & Vine Candle Subscription Box', 'Reach $65,000 combined monthly sales ($15k online)'] }
      ],
      priorityMatrix: [
        { task: 'Implement POS Tourist Email Capture Prompt', impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
        { task: 'Launch E-Commerce Online Store & Sync POS', impact: 'High', effort: 'High', quadrant: 'Major Project' },
        { task: 'Host Thursday Evening Sip & Shop Event', impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
        { task: 'Complete Complete Interior Store Remodel', impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
      ],
      realityCheck: [
        {
          assumption: 'Tourists who buy in person will re-order online when sent a post-vacation email coupon.',
          whyItMatters: 'Capturing tourist LTV extends revenue far beyond a single $44 vacation purchase.',
          riskIfWrong: 'Time spent entering customer emails yields low open rates.',
          lowCostExperiment: 'Collect 100 emails at POS next week and send a test 10% discount email; measure click & purchase rate.'
        },
        {
          assumption: 'Local Savannah residents will attend weekday evening "Sip & Shop" events.',
          whyItMatters: 'Local residents provide steady off-season revenue when tourist numbers drop in summer.',
          riskIfWrong: 'Empty evening store events with unused wine & snack expenses.',
          lowCostExperiment: 'Promote 1 event to a 500-person local customer list and require free RSVP tickets on Eventbrite.'
        },
        {
          assumption: 'Inventory can be kept 100% in sync between Shopify POS and the web store without stockouts.',
          whyItMatters: 'Selling an item online that was just bought in-store creates angry customer refund situations.',
          riskIfWrong: 'Customer service complaints and order cancellations.',
          lowCostExperiment: 'Test inventory sync with 25 fast-moving SKUs for 14 days before listing full catalog online.'
        }
      ]
    }
  }
];
