// The fixed set of filter tags on the Projects section. The content schema
// imports this so a typo in a project file fails the build instead of
// silently creating a new filter button.

export const PROJECT_TAGS = [
  'embedded',
  'robotics',
  'pcb',
  'mechanical',
  'controls',
  'machine-learning',
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export const tagLabels: Record<ProjectTag, string> = {
  embedded: 'Embedded',
  robotics: 'Robotics',
  pcb: 'PCB',
  mechanical: 'Mechanical',
  controls: 'Controls',
  'machine-learning': 'Machine learning',
};

export function tagLabel(tag: string): string {
  return (tagLabels as Record<string, string>)[tag] ?? tag;
}
