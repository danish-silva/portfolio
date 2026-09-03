// Identity, links and hero copy. Everything here is sourced from the resume
// unless marked TODO.

export const profile = {
  name: 'Danish Silva',
  // One line positioning statement for the hero. Drafted from the resume
  // career objective; edit freely.
  tagline:
    'Final year Mechatronics Engineering student at UTS, taking hardware from schematic and PCB design through power, sensing and control to a tested working system.',
  location: 'Sydney, NSW',
  email: 'hello@danishsilva.com',
  github: 'https://github.com/danish-silva',
  linkedin: 'https://www.linkedin.com/in/danish-silva',
  // Served from /public. The PDF itself is tracked in ASSETS.md.
  resume: '/Danish-Silva-Resume.pdf',
  // Short line of role keywords for recruiters scanning quickly.
  // TODO: confirm or edit this list.
  keywords: ['Robotics', 'Embedded Systems', 'Electronics', 'Computer Vision', 'Mechanical Design'],
  // The disciplines are already listed twice above, in the hero keyword row
  // and in the About prose, so this line does not repeat them a third time.
  availability:
    "I'm graduating in 2027 and looking for a graduate role where I can keep working close to hardware. If you're hiring, or just want to talk about something you're building, I'd love to hear from you.",
  // TODO: confirm CTA wording.
  cta: {
    primary: { label: 'See My Projects', href: '#projects' },
    secondary: { label: 'Get in Touch', href: '#contact' },
    tertiary: { label: 'Resume', href: '/Danish-Silva-Resume.pdf' },
  },
} as const;
