// Service categories. Each entry generates a page at /services/<slug>/.
export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string; // card description (from the content brief)
  metaTitle: string;
  metaDescription: string;
  intro: string;
  tasks: string[];
  closeout: string[];
  faqs: { q: string; a: string }[];
  accent?: boolean;
};

const commonCloseout = ['Before / after photos', 'Technician notes', 'Job-type checklist', 'Timestamps for every status change'];

export const SERVICES: Service[] = [
  {
    slug: 'cctv-surveillance',
    icon: 'camera',
    title: 'CCTV & Surveillance',
    short: 'Camera outages, NVR/DVR troubleshooting, upgrades, replacements, cabling fixes.',
    metaTitle: 'CCTV & Surveillance Technicians On Demand',
    metaDescription:
      'Dispatch verified CCTV technicians for camera outages, NVR/DVR troubleshooting, upgrades, replacements and cabling fixes, with photo-documented closeouts.',
    intro:
      'When a camera goes dark, you lose visibility at the exact moment you might need it. DeployFleet matches you with CCTV-skilled technicians near your site who can diagnose, repair, or replace and document every step.',
    tasks: ['Camera outage diagnosis and repair', 'NVR/DVR troubleshooting and replacement', 'Camera upgrades and replacements', 'Re-aiming, focus, and coverage checks', 'Coax/Cat6 cabling fixes and PoE checks', 'Recording and remote-view verification'],
    closeout: ['Camera-by-camera photos and views', 'NVR/DVR model and serial numbers', 'Recording retention verified', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can I dispatch a CCTV tech the same day?', a: 'Yes. Post the job as ASAP and DeployFleet shows you technicians with CCTV skills who are available now, including after-hours and weekends.' },
      { q: 'How do I know the cameras are actually working after the visit?', a: 'Technicians submit a structured closeout with photos of each camera view, notes, and a checklist so you can verify before you approve and pay.' },
    ],
  },
  {
    slug: 'pos-installs-rollouts',
    icon: 'pos',
    title: 'POS Installs & Rollouts',
    short: 'Register swaps, pin pads, printers/scanners, after-hours cutovers, multi-site rollouts.',
    metaTitle: 'POS Install & Rollout Technicians',
    metaDescription:
      'On-demand POS technicians for register swaps, pin pads, printers, scanners, after-hours cutovers and multi-site rollouts, with consistent closeouts at every store.',
    intro:
      'POS work has to happen fast and often after close. DeployFleet helps you staff single-store swaps and multi-site rollouts with technicians who know the hardware and follow the same checklist at every location.',
    tasks: ['Register and terminal swaps', 'Pin pad installs and replacements', 'Receipt printer and scanner setup', 'After-hours cutovers', 'Multi-site rollout waves', 'Peripheral and network connectivity checks'],
    closeout: ['Serial numbers for swapped devices', 'Test transaction confirmation', 'Photos of the finished station', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can I run the same POS job across dozens of stores?', a: 'Yes. Use job templates and your Favorite Tech Pool to dispatch repeatable rollouts, and get the same closeout format from every site.' },
      { q: 'Do technicians work after the store closes?', a: 'Technicians set after-hours and weekend availability on their profiles, so you can match cutovers to techs who are ready for those windows.' },
    ],
  },
  {
    slug: 'networking-wifi',
    icon: 'wifi',
    title: 'Networking & Wi-Fi',
    short: 'Access point installs, dead zone fixes, switch swaps, connectivity troubleshooting, rack cleanup.',
    metaTitle: 'Networking & Wi-Fi Field Technicians',
    metaDescription:
      'Hire verified network technicians for access point installs, Wi-Fi dead zone fixes, switch swaps, connectivity troubleshooting and rack cleanup.',
    intro:
      'A down network can stop a whole location. DeployFleet gets a networking-skilled technician on site to restore connectivity, install or replace gear, and leave the rack cleaner than they found it.',
    tasks: ['Access point installs and replacements', 'Wi-Fi dead zone fixes', 'Switch and router swaps', 'Connectivity troubleshooting', 'Rack cleanup and labeling', 'Circuit hand-off and smart-hands support'],
    closeout: ['Before / after rack photos', 'Device models and serial numbers', 'Connectivity test results', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can a technician work with our remote network team?', a: 'Yes. Add contacts and instructions to the job scope, and the tech can coordinate with your NOC or remote engineers while on site.' },
      { q: 'What proof do I get after a network visit?', a: 'Photos, notes, test results and any serial numbers you require, all attached to the job record.' },
    ],
  },
  {
    slug: 'structured-cabling',
    icon: 'cable',
    title: 'Structured Cabling',
    short: 'Cat6/fiber-ready cabling, patch panels, labeling, rack organization, testing documentation.',
    metaTitle: 'Structured Cabling Technicians',
    metaDescription:
      'Dispatch structured cabling technicians for Cat6 and fiber-ready runs, patch panels, labeling, rack organization and testing documentation.',
    intro:
      'Good cabling is invisible until it isn’t. DeployFleet connects you with cabling technicians who run, terminate, label and test, then hand you documentation you can rely on.',
    tasks: ['Cat6 / fiber-ready cable runs', 'Patch panel installs and terminations', 'Labeling to your standard', 'Rack organization and cable management', 'Drop additions and moves', 'Certification and test documentation'],
    closeout: ['Cable test results', 'Labeling map and photos', 'Rack before / after photos', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Do I get test results for new drops?', a: 'You can require test documentation in the job checklist, and the technician attaches it to the closeout.' },
      { q: 'Can I add drops during a larger rollout?', a: 'Yes. Cabling jobs can be part of multi-site rollouts and dispatched with the same template at each location.' },
    ],
  },
  {
    slug: 'access-control',
    icon: 'key',
    title: 'Access Control',
    short: 'Door strikes/maglocks, readers, REX devices, controller troubleshooting, wiring and service.',
    metaTitle: 'Access Control Service Technicians',
    metaDescription:
      'On-demand access control technicians for door strikes, maglocks, readers, REX devices, controller troubleshooting, wiring and service.',
    intro:
      'A door that won’t lock (or won’t open) is a security and safety problem. DeployFleet dispatches access control technicians who can troubleshoot hardware, controllers and wiring quickly.',
    tasks: ['Door strike and maglock service', 'Card reader installs and replacements', 'REX device troubleshooting', 'Controller diagnostics', 'Low-voltage wiring and service', 'Door operation testing'],
    closeout: ['Door-by-door test results', 'Hardware photos', 'Parts replaced and serial numbers', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can you handle urgent lock failures?', a: 'Yes. Post it as ASAP and see access control techs who are available now, including nights and weekends.' },
      { q: 'Will the technician test every door?', a: 'Add door testing to the job checklist and the tech confirms each item with notes and photos in the closeout.' },
    ],
  },
  {
    slug: 'alarm-systems',
    icon: 'bell',
    title: 'Alarm Systems',
    short: 'False alarm troubleshooting, sensor replacement, panel issues, battery/communication support.',
    metaTitle: 'Alarm System Technicians On Demand',
    metaDescription:
      'Dispatch alarm technicians for false alarm troubleshooting, sensor replacement, panel issues, and battery and communication support.',
    intro:
      'False alarms cost money and erode trust in the system. DeployFleet helps you find alarm technicians who can trace the cause, replace failing parts, and confirm the panel is communicating.',
    tasks: ['False alarm troubleshooting', 'Sensor and contact replacement', 'Panel diagnostics', 'Battery replacement', 'Communicator and signal support', 'Zone testing'],
    closeout: ['Zone test results', 'Parts replaced', 'Panel and battery photos', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can a tech coordinate with our monitoring company?', a: 'Yes. Include the monitoring contact and test procedure in the job instructions so the tech can place the account on test and verify signals.' },
      { q: 'Do I get documentation for each zone?', a: 'You can require zone-by-zone results in the checklist, and they are attached to the closeout.' },
    ],
  },
  {
    slug: 'kiosks-digital-signage',
    icon: 'monitor',
    title: 'Kiosks & Digital Signage',
    short: 'Mounts, swaps, power/network issues, device setup, on-site troubleshooting.',
    metaTitle: 'Kiosk & Digital Signage Technicians',
    metaDescription:
      'Field technicians for kiosk and digital signage mounts, swaps, power and network issues, device setup and on-site troubleshooting.',
    intro:
      'A blank screen or frozen kiosk is visible to every customer. DeployFleet dispatches technicians who can mount, swap, power up and connect your displays and kiosks, then prove it with photos.',
    tasks: ['Display and kiosk mounting', 'Device swaps', 'Power and network troubleshooting', 'Media player setup', 'On-site troubleshooting', 'Rollout installs across locations'],
    closeout: ['Photos of the working display', 'Device serial numbers', 'Network and power checks', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can I roll out signage to many locations?', a: 'Yes. Use templates and preferred tech pools to run consistent installs at every site.' },
      { q: 'What if the issue turns out to be content, not hardware?', a: 'Technicians can coordinate with your remote team through the platform and document what they found in the closeout.' },
    ],
  },
  {
    slug: 'on-site-it-support',
    icon: 'laptop',
    title: 'On-Site IT Support',
    short: 'Workstation swaps, printer support, peripheral setup, device troubleshooting.',
    metaTitle: 'On-Site IT Support Technicians',
    metaDescription:
      'On-demand IT field technicians for workstation swaps, printer support, peripheral setup and device troubleshooting at any location.',
    intro:
      'Some problems need hands on site. DeployFleet gives your help desk a reliable field arm: technicians who swap, set up and troubleshoot devices and report back clearly.',
    tasks: ['Workstation and laptop swaps', 'Printer support', 'Peripheral setup', 'Device troubleshooting', 'Smart-hands for remote IT', 'Asset tagging and returns'],
    closeout: ['Asset tags and serial numbers', 'Photos of the finished setup', 'Help-desk ticket notes', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can technicians follow our help desk’s instructions?', a: 'Yes. Add your procedures to the job scope and message the tech through the platform while they work.' },
      { q: 'Can I track returned equipment?', a: 'Require serial numbers and photos in the checklist so every swap and return is documented.' },
    ],
  },
  {
    slug: 'voip-phone-systems',
    icon: 'phone',
    title: 'VOIP / Phone Systems',
    short: 'Handset installs, cabling/PoE checks, on-site troubleshooting and verification.',
    metaTitle: 'VOIP & Phone System Technicians',
    metaDescription:
      'Dispatch VOIP technicians for handset installs, cabling and PoE checks, and on-site phone system troubleshooting and verification.',
    intro:
      'When phones go down, customers can’t reach you. DeployFleet matches you with technicians who can install handsets, check cabling and PoE, and verify every line before they leave.',
    tasks: ['Handset installs and swaps', 'Cabling and PoE checks', 'On-site troubleshooting', 'Call and line verification', 'Switch port and VLAN checks with your team', 'Multi-site phone rollouts'],
    closeout: ['Handset serial / MAC list', 'Test call verification', 'Photos of installed handsets', ...commonCloseout.slice(1)],
    faqs: [
      { q: 'Can the technician test calls before leaving?', a: 'Yes. Add test calls to the checklist and the tech confirms each one in the closeout.' },
      { q: 'Do you support phone rollouts?', a: 'Yes. Dispatch the same job template across locations and get consistent closeouts.' },
    ],
  },
  {
    slug: 'after-hours-weekend-dispatch',
    icon: 'moon',
    title: 'After-Hours / Weekend Dispatch',
    short: 'Urgent coverage when locations can’t wait.',
    metaTitle: 'After-Hours & Weekend Technician Dispatch',
    metaDescription:
      'Urgent after-hours and weekend technician dispatch for IT and low-voltage issues. See who is available now and get proof of work.',
    intro:
      'Outages don’t wait for business hours. Technicians on DeployFleet set after-hours and weekend availability, so you can see who’s ready now and dispatch in minutes.',
    tasks: ['Emergency break-fix', 'After-close cutovers and installs', 'Weekend rollouts', 'Overnight outage response', 'Last-minute coverage gaps', 'All service categories'],
    closeout: ['Arrival and completion timestamps', 'Photos and notes', 'Job-type checklist', 'Recommendations for follow-up'],
    faqs: [
      { q: 'How do I find a tech who is available right now?', a: 'The Availability Calendar shows who is ready now vs later, so you can dispatch urgent calls to technicians who can actually go.' },
      { q: 'Does after-hours work get the same documentation?', a: 'Yes. Every job gets the same structured closeout, whatever time it happens.' },
    ],
    accent: true,
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
