// Skill groups in the order they appear on the page. Sourced from the resume.

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { name: 'Programming', items: ['Python', 'C', 'C++'] },
  {
    name: 'Embedded and Systems',
    items: ['Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'Intel Quartus (FPGA)'],
  },
  { name: 'PCB and Electrical Design', items: ['Altium Designer', 'KiCad'] },
  { name: 'Robotics Frameworks', items: ['ROS 2', 'OpenCV', 'MoveIt 2'] },
  {
    name: 'Mechanical Design',
    items: ['SolidWorks', 'Autodesk Fusion', 'AS 1100 technical drawings'],
  },
  { name: 'Simulation', items: ['Gazebo', 'LTspice', 'Simulink'] },
  { name: 'Data and Optimisation', items: ['MATLAB', 'NumPy'] },
  { name: 'Version Control', items: ['GitHub', 'Altium 365'] },
  {
    name: 'Core Skills',
    items: [
      'Leadership',
      'Teamwork',
      'Adaptability',
      'Analytical thinking',
      'Process optimisation',
      'Stakeholder management',
      'Technical documentation',
    ],
  },
];
