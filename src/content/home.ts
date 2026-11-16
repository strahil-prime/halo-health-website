/**
 * Homepage copy, in one place so it can move to the CMS later.
 *
 * DRAFT COPY. Derived from the approved product specification; every claim
 * here describes how the service is designed, not a measured outcome. Do not
 * add statistics, partner names, approvals or testimonials until they are
 * confirmed. Programme names are working names pending trademark clearance.
 *
 * Headlines are arrays of segments so parts can be set in italic (`em`) or
 * in the quieter second tone (`soft`).
 */

export interface Segment {
  text: string;
  em?: boolean;
  soft?: boolean;
}

export const nav = [
  { label: 'Programmes', href: '#programmes' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Care team', href: '#care-team' },
  { label: 'For organisations', href: '#organisations' },
  { label: 'Journal', href: '#journal' },
] as const;

export const notice = {
  short: 'Preventive care, not an emergency service.',
  long: 'Halo Health offers preventive care and is not an emergency service. In an emergency, call your local emergency number.',
} as const;

export const cta = {
  primary: 'Start your assessment',
  signIn: 'Sign in',
  team: 'Talk to our team',
} as const;

export const hero = {
  eyebrow: 'Preventive health and longevity',
  /** One entry per line of the headline. */
  titleLines: [
    { text: 'Know where your' },
    { text: 'health stands.' },
    { text: 'Know what comes next.', em: true },
  ] satisfies Segment[],
  body: 'A physician-led assessment, one personal plan and a care team that stays with you. Preventive medicine, made part of daily life.',
  secondaryCta: 'See how it works',
  assurances: [
    'Every result signed by a physician',
    'One plan, one care team',
    'Your data stays yours',
  ],
  firstStep: {
    eyebrow: 'Your first step',
    title: 'The Longevity Assessment',
    body: 'Questionnaire, indicated tests and a physician’s review.',
  },
  imageAlt: 'A woman in profile in warm low light, eyes closed, calm',
} as const;

export const audiences = {
  eyebrow: 'Care designed for',
  items: ['Individuals', 'Employers', 'Insurers', 'Medical groups'],
} as const;

export const statement = {
  eyebrow: 'Lifestyle medicine',
  title: [
    { text: 'Preventive health and longevity,' },
    { text: 'guided by physicians', em: true },
    { text: 'and built into the way you already live.', soft: true },
  ] satisfies Segment[],
} as const;

export type PillarId = 'nourish' | 'move' | 'sleep' | 'restore';

export const pillars: {
  id: PillarId;
  area: string;
  title: string;
  body: string;
  imageAlt: string;
}[] = [
  {
    id: 'nourish',
    area: 'Nutrition',
    title: 'Nourish',
    body: 'Food that suits your results, your tastes and your week.',
    imageAlt:
      'Hands pouring olive oil over a bowl of roasted vegetables and grains',
  },
  {
    id: 'move',
    area: 'Movement',
    title: 'Move',
    body: 'Strength and mobility, built at your own pace.',
    imageAlt: 'A grey-haired man stretching his arm overhead in warm light',
  },
  {
    id: 'sleep',
    area: 'Sleep',
    title: 'Rest',
    body: 'Sleep treated as a foundation, not an afterthought.',
    imageAlt: 'A woman asleep in linen bedding in low warm light',
  },
  {
    id: 'restore',
    area: 'Stress and recovery',
    title: 'Restore',
    body: 'Calm, recovery and room to breathe in a full life.',
    imageAlt: 'Hands cupped around a steaming ceramic cup on a wooden table',
  },
];

/**
 * Design promises, not outcomes. `parts` are animated numbers joined by an
 * italic word; `from` is where the count starts.
 */
export const promises: {
  parts: { from: number; value: number }[];
  joiner?: string;
  title: string;
  body: string;
}[] = [
  {
    parts: [{ from: 0, value: 1 }],
    title: 'Physician signs every result',
    body: 'Nothing reaches you without a physician’s review and signature.',
  },
  {
    parts: [
      { from: 0, value: 2 },
      { from: 0, value: 5 },
    ],
    joiner: 'to',
    title: 'Small actions a day',
    body: 'Your plan arrives as a few daily steps, sized to fit real life.',
  },
  {
    parts: [
      { from: 0, value: 6 },
      { from: 0, value: 12 },
    ],
    joiner: 'and',
    title: 'Month follow-ups',
    body: 'We measure again, compare with your baseline and adjust the plan.',
  },
  {
    parts: [{ from: 9, value: 0 }],
    title: 'Clinical decisions made by AI',
    body: 'Technology keeps things organised. People decide on your care.',
  },
];

export const journey = {
  eyebrow: 'How it works',
  titleLines: [
    { text: 'A clear path,' },
    { text: 'one step at a time.', em: true },
  ] satisfies Segment[],
  steps: [
    {
      title: 'Assess',
      body: 'A health questionnaire first, then the measurements and tests your physician considers indicated.',
    },
    {
      title: 'Understand',
      body: 'A physician reviews and signs your results, then explains them in plain language.',
    },
    {
      title: 'Plan',
      body: 'One personal plan across nutrition, movement, sleep and stress, shaped around your life.',
    },
    {
      title: 'Live it',
      body: 'A few small actions each day, with your coach beside you and check-ins at 6 and 12 months.',
    },
  ],
} as const;

export type ProgrammeImage =
  | 'programmes'
  | 'nourish'
  | 'journalWalk'
  | 'sleep'
  | 'restore'
  | 'move'
  | 'app';

export interface Programme {
  id: string;
  title: string;
  note: string;
  body: string;
  tags: string[];
  image: ProgrammeImage;
  imageAlt: string;
}

/** Working names (pending trademark clearance). */
export const programmes = {
  eyebrow: 'Programmes',
  titleLines: [
    { text: 'Programmes shaped by' },
    { text: 'what your results show.', em: true },
  ] satisfies Segment[],
  body: 'Everything begins with the assessment. From there, your physician recommends only the programmes that are indicated for you.',
  assessmentCta: 'Start the assessment',
  items: [
    {
      id: 'longevity-assessment',
      title: 'Longevity Assessment',
      note: 'Where everyone starts',
      body: 'A complete starting picture of your health: a questionnaire, physical measurements and the laboratory tests your physician considers indicated. Reviewed, signed and turned into a personal plan.',
      tags: [
        'Questionnaire',
        'Indicated tests',
        'Physician review',
        'Personal plan',
      ],
      image: 'programmes',
      imageAlt:
        'A physician in an ivory blazer listening to a patient across a small table',
    },
    {
      id: 'metabolic-health',
      title: 'Metabolic Health',
      note: 'Energy and markers',
      body: 'Work towards steadier energy and healthier markers, with a coach beside you and a physician overseeing the plan.',
      tags: ['Coach-led', 'Physician oversight', 'Group or hybrid'],
      image: 'nourish',
      imageAlt:
        'Hands pouring olive oil over a bowl of roasted vegetables and grains',
    },
    {
      id: 'heart-health',
      title: 'Heart Health',
      note: 'Cardiovascular risk',
      body: 'Understand your cardiovascular risk and work on it step by step, with blood-pressure tracking at home and physician review.',
      tags: ['Hybrid', 'Physician review', 'Home blood pressure'],
      image: 'journalWalk',
      imageAlt: 'A couple in their sixties walking a coastal path at sunset',
    },
    {
      id: 'sleep',
      title: 'Sleep',
      note: 'Rest and recovery',
      body: 'A structured programme based on CBT-I, with support from a coach or clinician when you need it.',
      tags: ['Digital', 'Based on CBT-I', 'Coach or clinician support'],
      image: 'sleep',
      imageAlt: 'A woman asleep in linen bedding in low warm light',
    },
    {
      id: 'stress-resilience',
      title: 'Stress Resilience and Wellbeing',
      note: 'Pressure and mood',
      body: 'Practical skills for pressure, recovery and mood, with clear routes to a care team.',
      tags: ['Digital', 'Group sessions'],
      image: 'restore',
      imageAlt: 'Hands cupped around a steaming ceramic cup on a wooden table',
    },
    {
      id: 'strength-mobility',
      title: 'Strength and Mobility',
      note: 'Strong and steady',
      body: 'Coach-led training to stay strong, steady and independent, at home or with partner studios.',
      tags: ['Coach-led', 'Partner studios'],
      image: 'move',
      imageAlt: 'A grey-haired man stretching his arm overhead in warm light',
    },
    {
      id: 'womens-midlife',
      title: 'Women’s Midlife and Menopause',
      note: 'Midlife, guided',
      body: 'Clear guidance through midlife, with every medical decision made by qualified professionals.',
      tags: ['Digital', 'Group sessions'],
      image: 'app',
      imageAlt:
        'A woman relaxed on a linen sofa with a cup, looking at her phone',
    },
  ] satisfies [Programme, ...Programme[]],
} as const;

export type TeamImage = 'physician' | 'coach' | 'navigator' | 'specialist';

export const careTeam = {
  eyebrow: 'Your care team',
  titleLines: [
    { text: 'The people' },
    { text: 'behind your plan.', em: true },
  ] satisfies Segment[],
  body: 'One team that knows your results and each other. You meet them by name when you begin.',
  /** Roles, not named people. Portraits are illustrative. */
  roles: [
    {
      image: 'physician',
      area: 'Medicine',
      title: 'Your physician',
      body: 'Reviews and signs every result, and leads your plan.',
      imageAlt:
        'Portrait of a physician with grey-streaked hair in a dark blazer',
    },
    {
      image: 'coach',
      area: 'Coaching',
      title: 'Your coach',
      body: 'Turns the plan into habits and keeps you company along the way.',
      imageAlt: 'Portrait of a smiling coach with a short beard in a sand knit',
    },
    {
      image: 'navigator',
      area: 'Coordination',
      title: 'Your care navigator',
      body: 'Books, reminds and answers, so nothing falls between appointments.',
      imageAlt: 'Portrait of a care navigator in a cream knit, smiling softly',
    },
    {
      image: 'specialist',
      area: 'Specialist care',
      title: 'Partner specialists',
      body: 'Cardiology, nutrition, sleep and more, brought in when indicated.',
      imageAlt:
        'Portrait of a specialist with silver hair, a beard and round glasses',
    },
  ] satisfies {
    image: TeamImage;
    area: string;
    title: string;
    body: string;
    imageAlt: string;
  }[],
} as const;

export const places = [
  {
    id: 'clinic',
    label: 'In person',
    title: [{ text: 'At a partner' }, { text: 'clinic', em: true }],
    points: [
      'Measurements and indicated tests',
      'Unhurried time with your physician',
      'Specialists when they are needed',
    ],
    cta: 'Book your assessment',
    imageAlt:
      'A physician and a patient talking in armchairs in a lamp-lit room at dusk',
  },
  {
    id: 'app',
    label: 'Every day',
    title: [{ text: 'In the Halo Health' }, { text: 'app', em: true }],
    points: [
      'Your daily actions, a few at a time',
      'Results and plan in one place',
      'Your coach and care team close at hand',
    ],
    cta: 'Open Halo Health',
    imageAlt:
      'A woman relaxed on a linen sofa with a cup, looking at her phone',
  },
] satisfies {
  id: 'clinic' | 'app';
  label: string;
  title: Segment[];
  points: string[];
  cta: string;
  imageAlt: string;
}[];

export const organisations = {
  eyebrow: 'For organisations',
  title: [
    { text: 'Prevention for the people' },
    { text: 'you look after.', em: true },
  ] satisfies Segment[],
  body: 'Employers and insurers see aggregate results only. Individual health data stays with the individual and their care team.',
  cards: [
    {
      title: 'Employers',
      body: 'A health benefit your people will use, with reporting in aggregate only.',
    },
    {
      title: 'Insurers',
      body: 'Structured prevention programmes with planned follow-up for your members.',
    },
    {
      title: 'Medical groups',
      body: 'A lifestyle medicine pathway that extends the care you already give.',
    },
  ],
} as const;

export const questions = {
  eyebrow: 'Questions',
  title: [
    { text: 'Asked' },
    { text: 'before starting.', em: true },
  ] satisfies Segment[],
  body: 'Something we have not covered? Write to us and a person will reply.',
  contactCta: 'Write to us',
  items: [
    {
      id: 'who-reviews',
      question: 'Who reviews my results?',
      answer:
        'A physician reviews and signs every result before you see it, then explains what it means for you and what, if anything, to do next.',
    },
    {
      id: 'who-sees',
      question: 'Who can see my health data?',
      answer:
        'Only you, your physician, your coach and clinical governance. Nobody else, and never for advertising.',
    },
    {
      id: 'employer-insurer',
      question: 'Does my employer or insurer see my results?',
      answer:
        'No. Employers and insurers only ever see anonymous totals. Your individual results are never used for premiums, pricing or eligibility.',
    },
    {
      id: 'ai',
      question: 'Is AI making decisions about my care?',
      answer:
        'No. Automation may schedule and remind. Every clinical decision and all health advice comes from a licensed professional.',
    },
    {
      id: 'after',
      question: 'What happens after the assessment?',
      answer:
        'Your physician’s recommendations become your plan: indicated care first, then the programmes and habits that support it. Follow-up at six and twelve months shows your progress.',
    },
  ],
} as const;

export type JournalImage = 'journalNotes' | 'journalWalk' | 'journalSleep';

/** Sample titles: the journal has not launched yet. */
export const journal = {
  eyebrow: 'Journal',
  title: [
    { text: 'Notes on' },
    { text: 'living well, longer.', em: true },
  ] satisfies Segment[],
  status: 'Opening soon',
  articles: [
    {
      image: 'journalNotes',
      topic: 'Assessment',
      title: 'What a preventive health assessment actually looks at',
      imageAlt:
        'Hands writing with a fountain pen beside a notebook and a ceramic cup',
    },
    {
      image: 'journalWalk',
      topic: 'Movement',
      title: 'Walking, strength and the years ahead',
      imageAlt: 'A couple in their sixties walking a coastal path at sunset',
    },
    {
      image: 'journalSleep',
      topic: 'Sleep',
      title: 'An evening routine your physician would recognise',
      imageAlt:
        'A bedside table with a lit lamp, a glass of water and an open book',
    },
  ] satisfies {
    image: JournalImage;
    topic: string;
    title: string;
    imageAlt: string;
  }[],
} as const;

export const closing = {
  eyebrow: 'Begin',
  title: [
    { text: 'Start with one clear picture' },
    { text: 'of your health.', em: true },
  ] satisfies Segment[],
  body: 'The assessment begins with a questionnaire you can complete at home, in your own time.',
  imageAlt:
    'A figure standing at the shoreline at dawn, the sea reflecting the first light',
} as const;

export const footer = {
  tagline:
    'Physician-led preventive health and longevity care, in person and in everyday life.',
  columns: [
    {
      title: 'Care',
      links: [
        { label: 'Programmes', href: '#programmes' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Care team', href: '#care-team' },
        { label: 'Journal', href: '#journal' },
      ],
    },
    {
      title: 'Organisations',
      links: [
        { label: 'Employers', href: '#organisations' },
        { label: 'Insurers', href: '#organisations' },
        { label: 'Medical groups', href: '#organisations' },
      ],
    },
  ],
  rights: 'Halo Health. All rights reserved.',
  wordmark: 'Halo Health',
} as const;
