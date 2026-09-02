// Identity, links and hero copy. Everything here is sourced from the resume
// unless marked TODO.

export const profile = {
  name: 'Danish Silva',
  // One line positioning statement for the hero. Drafted from the resume
  // career objective; edit freely.
  tagline:
    'Final year Mechatronics Engineering student at UTS, taking hardware from schematic and PCB design through power, sensing and control to a tested working system.',
  location: 'Sydney, NSW',
  email: 'danishsilva@gmail.com',
  github: 'https://github.com/danish-silva',
  linkedin: 'https://www.linkedin.com/in/danish-silva',
  // Served from /public. The PDF itself is tracked in ASSETS.md.
  resume: '/Danish-Silva-Resume.pdf',
  // Short line of role keywords for recruiters scanning quickly.
  // TODO: confirm or edit this list.
  keywords: ['Robotics', 'Embedded systems', 'Electronics', 'Computer vision', 'Mechanical design'],
  availability:
    'Open to 2027 graduate roles in robotics, embedded systems, electronics, computer vision and mechanical design.',
  // TODO: confirm CTA wording.
  cta: {
    primary: { label: 'See my projects', href: '#projects' },
    secondary: { label: 'Get in touch', href: '#contact' },
    tertiary: { label: 'Download resume', href: '/Danish-Silva-Resume.pdf' },
  },
} as const;
