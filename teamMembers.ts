/**
 * Team Members — Last Minute Life Saver
 * Used for delegation matching.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string; // Emoji
  expertise: string[];
  availability: 'available' | 'busy' | 'away';
  speed: 'fast' | 'medium' | 'slow';
  currentLoad: number; // 0-100
}

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sarah Chen',
    role: 'Senior Developer',
    avatar: '👩‍💻',
    expertise: ['coding', 'backend', 'architecture', 'code-review', 'database'],
    availability: 'available',
    speed: 'fast',
    currentLoad: 40,
  },
  {
    id: 'team-2',
    name: 'Mark Johnson',
    role: 'Product Manager',
    avatar: '👨‍💼',
    expertise: ['product', 'client', 'presentation', 'writing', 'requirements'],
    availability: 'busy',
    speed: 'medium',
    currentLoad: 75,
  },
  {
    id: 'team-3',
    name: 'Jake Williams',
    role: 'Operations Lead',
    avatar: '👨‍💻',
    expertise: ['admin', 'scheduling', 'documentation', 'finance', 'logistics'],
    availability: 'available',
    speed: 'medium',
    currentLoad: 25,
  },
  {
    id: 'team-4',
    name: 'Emily Davis',
    role: 'UI/UX Designer',
    avatar: '👩‍🎨',
    expertise: ['design', 'wireframe', 'figma', 'presentation', 'creative'],
    availability: 'available',
    speed: 'fast',
    currentLoad: 35,
  },
  {
    id: 'team-5',
    name: 'Michael Chang',
    role: 'QA Engineer',
    avatar: '👨‍🔬',
    expertise: ['testing', 'qa', 'documentation', 'bug-hunt', 'admin'],
    availability: 'away',
    speed: 'medium',
    currentLoad: 10,
  },
];
