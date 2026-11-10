// Global site settings. Values marked PLACEHOLDER need real data before launch.
export const SITE = {
  name: 'DeployFleet',
  tagline: 'On Demand Technicians',
  // Public URL of the marketing site (used for canonical URLs, sitemap, schema).
  url:
    (import.meta.env.SITE ?? 'https://www.deployfleet.com').replace(/\/$/, '') +
    import.meta.env.BASE_URL.replace(/\/$/, ''),
  // The DeployFleet web app (sign-up / login / post a job).
  appUrl: 'https://app.deployfleet.com',
  description:
    'DeployFleet connects businesses with verified field technicians for on-demand and scheduled IT and low-voltage work: POS, networking, cabling, CCTV, access control and more.',
  oneLiner:
    'DeployFleet makes field service simple: post, match, track, close out, and pay, all in one place.',
  // Leave phone empty to hide every phone link on the site.
  phone: '', // e.g. '+1 (555) 010 2030'
  phoneHref: '', // e.g. 'tel:+15550102030'
  email: 'support@deployfleet.com', // PLACEHOLDER: confirm inbox
  ogImage: '/og-image.png',
  social: [] as { label: string; href: string }[],
};

// Videos: paste a YouTube ID (and the upload date, YYYY-MM-DD) to show a video.
// Sections show no video placeholder while youtubeId is empty.
export const VIDEOS = {
  // Home ("How it helps"), How It Works (providers section)
  company: {
    youtubeId: 'WiEtFAP5bno',
    uploadDate: '',
    title: 'DeployFleet for companies',
    description: 'See how companies post, match, track, close out and pay for field service jobs on DeployFleet.',
  },
  // Technicians page, How It Works (technicians section)
  technician: {
    youtubeId: 'd6Op6CRFd3o',
    uploadDate: '',
    title: 'DeployFleet for technicians',
    description: 'See how field technicians find jobs, get matched, complete work and get paid on DeployFleet.',
  },
};

// Marketing proof points. Each block is hidden until it has real content.
export const PROOF = {
  // Hero stats, e.g. { num: '750+', label: 'Jobs completed' }
  stats: [] as { num: string; label: string }[],
  // Customer logos for the blue strip: { name, src } with src under public/img/brands/
  brands: [] as { name: string; src: string }[],
  // About-section figure, e.g. { num: '5k+', label: 'Jobs dispatched across the U.S.' }
  highlight: null as null | { num: string; label: string },
};

// Testimonials: the section appears on Home and the technician page once this has entries.
// audience: 'provider' | 'technician'
export const TESTIMONIALS: { quote: string; name: string; role: string; audience: 'provider' | 'technician' }[] = [];

// Third-party services, configured with GitHub repo variables (Settings → Secrets and variables → Actions → Variables).
export const INTEGRATIONS = {
  // Contact form endpoint on the DeployFleet API (emails the team via Resend).
  // Override with the CONTACT_ENDPOINT repo variable, e.g. for a staging API.
  contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT || 'https://app.deployfleet.com/api/public/contact',
  // PostHog project API key (public by design; same project as the app). POSTHOG_KEY repo variable overrides it.
  posthogKey: import.meta.env.PUBLIC_POSTHOG_KEY || 'phc_rhE9xsitTFNbcVo7ppTRjXTGCWgVmCQ5BCGtccjQvSkL',
  posthogHost: import.meta.env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
};

export const appLinks = {
  register: `${SITE.appUrl}/register`,
  // The app opens the matching sign-up tab from ?role= (Technician is its default).
  registerCompany: `${SITE.appUrl}/register?role=company`,
  registerTechnician: `${SITE.appUrl}/register?role=technician`,
  login: `${SITE.appUrl}/login`,
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  {
    label: 'How It Works',
    href: '/how-it-works/',
    children: [
      { label: 'Overview', href: '/how-it-works/' },
      { label: 'For Providers', href: '/how-it-works/#providers' },
      { label: 'For Technicians', href: '/how-it-works/#technicians' },
      { label: 'Become a Technician', href: '/technicians/' },
    ],
  },
  { label: 'Services', href: '/services/', children: 'services' as const },
  { label: 'Contact Us', href: '/contact/' },
];

export const DIFFERENTIATORS = [
  {
    icon: 'calendar',
    title: 'Availability Calendar',
    text: 'Providers can see who’s ready now vs later. Great for urgent calls.',
  },
  {
    icon: 'star',
    title: 'Favorite Tech Pools',
    text: 'Repeat work with trusted technicians instead of starting from scratch.',
  },
  {
    icon: 'clipboard',
    title: 'Clear Scopes + Proof',
    text: 'Jobs are documented with photos, checklists, and notes for consistency.',
  },
  {
    icon: 'route',
    title: 'Built for Real Dispatch',
    text: 'Supports urgent, after-hours, weekend, and multi-site rollouts.',
  },
];

export const HELPS = [
  'Fast matching by skill, location, and availability',
  'Proof of work with photos + notes + checklists',
  'Repeatable rollouts using templates and preferred tech pools',
  'After-hours coverage for urgent calls',
];

export const PROVIDER_STEPS_SHORT = [
  {
    title: 'Post a Job',
    text: 'Create a work order in minutes with the location, scope, schedule (ASAP or scheduled), required skills, and any photos or notes the technician needs to succeed.',
  },
  {
    title: 'Match & Dispatch',
    text: 'DeployFleet matches you with technicians based on skill tags, distance, ratings, and availability, including after-hours and weekend options. You can also invite your Favorite Tech Pool first.',
  },
  {
    title: 'Track, Close Out, Pay',
    text: 'Get real-time job status updates, then receive a structured closeout with photos, notes, and checklist items. Approve the job and pay with confidence. Everything stays documented.',
  },
];

export const TECH_STEPS_SHORT = [
  {
    title: 'Create Your Profile',
    text: 'Set your skills, coverage radius, and job preferences. Choose availability for regular hours, last-minute dispatch, after-hours, and weekends.',
  },
  {
    title: 'Accept Jobs That Fit',
    text: 'See clear job details upfront (scope, site info, expectations, and payout), then accept the work that matches your schedule and skills.',
  },
  {
    title: 'Complete & Submit Closeout',
    text: 'Update job status (en route, on site, completed), finish the work, and submit a professional closeout with photos and notes. Build your rating and get invited to repeat work.',
  },
];

export const PROVIDER_STEPS = [
  {
    title: 'Create a Job in Minutes',
    text: 'Start by posting a job with the details technicians actually need to succeed on-site. Add the location, job type (CCTV, POS, networking, cabling, access control, etc.), the scope of work, urgency (ASAP vs scheduled), required skills, and any helpful photos or notes. You can also attach special instructions like access procedures, store contacts, parking guidance, and recommended arrival windows.',
  },
  {
    title: 'Match With the Right Technician',
    text: 'DeployFleet matches your job with technicians based on skill tags, service radius, ratings, and availability, including options for after-hours and weekend dispatch. If you already have preferred technicians, you can invite them first using Favorite Tech Pools, so your trusted techs get the first shot at new work before it goes wider.',
  },
  {
    title: 'Confirm Scheduling and Track Progress',
    text: 'Once a technician accepts the job, you’ll see clear status updates as work progresses (accepted, en route, on site, in progress, completed). Providers can communicate with technicians through the platform to clarify scope or share additional photos and notes, reducing on-site confusion and preventing “surprise” issues.',
  },
  {
    title: 'Get Proof of Work With Structured Closeout',
    text: 'When the job is completed, the technician submits a structured closeout that can include photos, notes, checklists, serial numbers, test results, and recommendations. This creates consistency across every job and makes it easier to validate what was done, especially during multi-site rollouts or recurring service work.',
  },
  {
    title: 'Approve and Pay With Confidence',
    text: 'After review, you approve the job and process payment through the platform. Everything stays documented: scope, communications, timestamps, proof of work, and completion notes. That means less back-and-forth, fewer disputes, and clean records for your operations.',
  },
];

export const TECH_STEPS = [
  {
    title: 'Create Your Profile and Service Area',
    text: 'Technicians sign up and build a profile that shows their real capabilities: skills, experience, coverage radius, tools, and job preferences. You can set availability for regular hours, last-minute dispatch, after-hours calls, and weekend jobs, so you’re only matched to work that fits your schedule.',
  },
  {
    title: 'Get Matched to Jobs That Fit',
    text: 'DeployFleet surfaces jobs based on your skills, location, and availability. Each job includes key details upfront (scope, site info, expectations, and payout) so you know what you’re walking into before you accept.',
  },
  {
    title: 'Communicate and Complete the Work',
    text: 'Once you accept, you can message the provider through the platform, get additional details if needed, and update status as you move through the job (en route, on site, completed). This keeps expectations clear and reduces unnecessary calls.',
  },
  {
    title: 'Submit a Professional Closeout',
    text: 'After the work is done, technicians submit a closeout with photos, notes, and checklist items required for that job type. This improves professionalism, builds your reputation, and increases repeat work from providers who want consistent quality.',
  },
  {
    title: 'Build Reputation and Get More Work',
    text: 'Every successful job strengthens your profile through ratings, reviews, and completion history. The more consistently you perform, the more likely you’ll be invited into favorite tech pools, leading to better jobs, more consistency, and long-term growth.',
  },
];
