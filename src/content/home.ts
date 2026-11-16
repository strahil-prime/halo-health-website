/**
 * Homepage copy, in one place so it can move to the CMS later.
 *
 * DRAFT COPY. Derived from the approved product specification; every claim
 * here describes how the service is designed, not a measured outcome. Do not
 * add statistics, partner names, approvals or testimonials until they are
 * confirmed. Programme names are working names pending trademark clearance.
 */

export const nav = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Our standards', href: '#standards' },
  { label: 'The app', href: '#daily' },
  { label: 'For organisations', href: '#organisations' },
] as const;

export const hero = {
  eyebrow: 'Lifestyle Medicine Center',
  titleLines: [
    [{ text: 'Know where your' }, { text: 'health stands.' }],
    [
      { text: 'Know what', em: true },
      { text: 'comes next.', em: true },
    ],
  ],
  body: 'A clinical health assessment, results reviewed by a physician, and a personal plan you can actually live with. A few small actions at a time.',
  primaryCta: 'Start your assessment',
  secondaryCta: 'See how it works',
  assurances: [
    'Physician-reviewed results',
    'Your data stays yours',
    'No miracle claims',
  ],
} as const;

export const expect = {
  eyebrow: 'What to expect',
  title: 'Prevention, practised with the rigour of medicine.',
  items: [
    {
      from: 0,
      value: 1,
      label: 'physician',
      body: 'A real physician reviews and signs every clinical result before you see it.',
    },
    {
      from: 0,
      value: 2,
      valueTo: 5,
      label: 'small actions a day',
      body: 'Your plan becomes two to five daily steps. Enough to change things, not enough to overwhelm.',
    },
    {
      from: 0,
      value: 4,
      label: 'people, at most',
      body: 'Only you, your physician, your coach and clinical governance can ever see your health data.',
    },
    {
      from: 9,
      value: 0,
      label: 'AI in clinical decisions',
      body: 'Every clinical decision belongs to a licensed professional. Always.',
    },
  ],
} as const;

export const marquee = [
  'The science of prevention',
  'The practice of living well',
] as const;

export const journey = {
  eyebrow: 'How it works',
  title: 'One clear path, from first question to lasting habit.',
  body: 'However you arrive, the journey is the same. Each step leads to one obvious next step.',
  steps: [
    {
      title: 'Assess',
      body: 'Answer a clinically governed health assessment at your own pace. It looks for warning signs and calculates published risk scores.',
      meta: 'Online, at your own pace',
    },
    {
      title: 'Examine',
      body: 'The assessment configures the examinations that fit your risk profile. Book them with a provider in the network.',
      meta: 'Only what is indicated for you',
    },
    {
      title: 'Understand',
      body: 'A physician reviews and signs your results. You get a plain-language explanation first, with the clinical detail one tap away.',
      meta: 'Signed by a physician',
    },
    {
      title: 'Plan',
      body: 'Your physician’s recommendations become My Plan: indicated care first, then the programmes and habits that support it.',
      meta: 'Indicated care always comes first',
    },
    {
      title: 'Live it',
      body: 'The app turns your plan into a few small daily actions, with coaching, tools and content to keep you going.',
      meta: 'Two to five actions a day',
    },
    {
      title: 'Follow up',
      body: 'Medical follow-up at six and twelve months shows honest progress, and your plan adjusts with you.',
      meta: '6 and 12 months',
    },
  ],
} as const;

export type ProgrammeCategory = 'assess' | 'body' | 'mind' | 'living';

export const programmeFilters: {
  id: 'all' | ProgrammeCategory;
  label: string;
}[] = [
  { id: 'all', label: 'All' },
  { id: 'assess', label: 'Assess' },
  { id: 'body', label: 'Body' },
  { id: 'mind', label: 'Mind' },
  { id: 'living', label: 'Longevity living' },
];

/** Working names (pending trademark clearance). */
export const programmes: {
  title: string;
  category: ProgrammeCategory;
  body: string;
  format: string;
}[] = [
  {
    title: 'Longevity Assessment',
    category: 'assess',
    body: 'The starting point: a digital assessment, the examinations that fit you, and a physician review.',
    format: 'Digital + examinations',
  },
  {
    title: 'Metabolic Health',
    category: 'body',
    body: 'Build steadier energy and healthier markers with a coach and physician oversight.',
    format: 'Group or hybrid',
  },
  {
    title: 'Heart Health',
    category: 'body',
    body: 'Understand your cardiovascular risk and lower it, with home blood-pressure tracking.',
    format: 'Hybrid + physician review',
  },
  {
    title: 'Strength & Mobility',
    category: 'body',
    body: 'Coach-led training to stay strong, steady and independent for decades to come.',
    format: 'Coach-led + partner studios',
  },
  {
    title: 'Sleep',
    category: 'mind',
    body: 'A structured programme based on CBT-I, with coach or clinician support.',
    format: 'Digital + support',
  },
  {
    title: 'Stress Resilience & Wellbeing',
    category: 'mind',
    body: 'Practical skills for pressure, recovery and mood, with clear routes to a care team.',
    format: 'Digital + group',
  },
  {
    title: 'Women’s Midlife & Menopause',
    category: 'body',
    body: 'Clear guidance through midlife, with medical decisions made by qualified professionals.',
    format: 'Digital + group',
  },
  {
    title: 'Longevity Foundations',
    category: 'living',
    body: 'The essentials of living well for longer, at your own pace. Coaching is optional.',
    format: 'Self-paced',
  },
  {
    title: 'Longevity Immersion',
    category: 'living',
    body: 'A three to seven night stay to reset your routines, then continue them at home.',
    format: 'Hotel stay + at home',
  },
];

export const standards = {
  eyebrow: 'Our standards',
  title: ['Medicine first.', 'Always.'],
  body: 'Wellness is full of promises. We would rather be precise. These rules are built into how Halo Health works, not added on top.',
  cards: [
    {
      icon: 'signature',
      title: 'Signed by a physician',
      body: 'Every clinical result you see has been reviewed and signed by a real physician.',
    },
    {
      icon: 'shield',
      title: 'Your data is yours',
      body: 'Employers and insurers only ever see anonymous totals. Your individual results are never used for premiums, pricing or eligibility.',
    },
    {
      icon: 'stethoscope',
      title: 'Care before commerce',
      body: 'Indicated care always comes before optional programmes. There are no offers on your results.',
    },
    {
      icon: 'user',
      title: 'People make clinical decisions',
      body: 'Automation may schedule and remind. It never decides. No AI in clinical decisions or health advice.',
    },
  ],
  wontFindTitle: 'What you won’t find here',
  wontFind: [
    'Detoxes and cleanses',
    'IV and NAD+ drips',
    'Peptides',
    'Age-reversal promises',
    'Before-and-after photos',
    'Pressure to buy',
  ],
} as const;

export const daily = {
  eyebrow: 'The app',
  title: 'Small actions. Every day. That is the whole secret.',
  body: 'The Halo Health app turns your plan into two to five small actions a day, then helps you keep going with coaching, lifestyle tools and honest progress.',
  points: [
    'One clear next step, every time you open it',
    'Gentle streaks, never competition',
    'Help is always one tap away',
  ],
  phone: {
    greeting: 'Good morning',
    heading: 'Today',
    note: 'Illustrative example',
    actions: [
      { label: '10-minute walk after lunch', meta: 'Movement', done: true },
      { label: 'Protein with breakfast', meta: 'Nutrition', done: true },
      { label: 'Evening blood pressure', meta: 'Measurement', done: false },
      { label: 'Lights out by 22:30', meta: 'Sleep', done: false },
    ],
  },
} as const;

export const organisations = {
  eyebrow: 'For organisations',
  title: 'Preventive health for the people you look after.',
  body: 'Halo Health is configured for your organisation, under our brand or yours. People keep their account and their data, whatever changes.',
  cta: 'Talk to our team',
  tabs: [
    {
      id: 'insurers',
      label: 'Insurers',
      title: 'Prevention your members will use',
      body: 'Offer screening, examinations and programmes through one journey. You receive aggregate reporting only. Individual health data never reaches underwriting.',
      points: [
        'Eligibility and packages configured, not coded',
        'A provider network with booking built in',
        'Aggregate, anonymised reporting',
      ],
    },
    {
      id: 'medical-groups',
      label: 'Medical groups',
      title: 'Your brand, your physicians, your patients',
      body: 'Run the platform under your own name with your own package catalogue. Your physicians interpret the results, and recalls return to you.',
      points: [
        'White-label member experience',
        'A clinical portal for your physicians',
        'Recall brings patients back to your group',
      ],
    },
    {
      id: 'employers',
      label: 'Employers',
      title: 'A benefit people trust',
      body: 'Give your team a credible route to better health. You see participation and totals, never anyone’s individual results.',
      points: [
        'Simple activation for your team',
        'Team challenges that stay kind',
        'Participation and aggregate insight only',
      ],
    },
  ],
} as const;

export const closing = {
  title: ['Start with one clear picture', 'of your health.'],
  body: 'The assessment takes a little time and a little honesty. What you get back is clarity, and one next step.',
  primaryCta: 'Start your assessment',
  secondaryCta: 'Talk to our team',
} as const;

export const footer = {
  tagline: 'Preventive health and longevity, guided by physicians.',
  emergency:
    'Halo Health does not provide emergency care. If you think you may have a medical emergency, call your local emergency number straight away.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Programmes', href: '#programmes' },
        { label: 'Our standards', href: '#standards' },
        { label: 'The app', href: '#daily' },
      ],
    },
    {
      title: 'Organisations',
      links: [
        { label: 'Insurers', href: '#organisations' },
        { label: 'Medical groups', href: '#organisations' },
        { label: 'Employers', href: '#organisations' },
      ],
    },
  ],
} as const;
