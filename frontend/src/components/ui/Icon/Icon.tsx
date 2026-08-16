import type { IconName } from '@/types';

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

// Small hand-authored line-icon set (no external icon dependency).
const PATHS: Record<IconName, string> = {
  dashboard: 'M3 3h7v9H3V3zm11 0h7v5h-7V3zm0 9h7v9h-7v-9zM3 16h7v5H3v-5z',
  book: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17zM4 4.5v17M20 19H6.5A2.5 2.5 0 0 0 4 21.5',
  exam: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 8h6M9 12h6M9 16h3',
  upload: 'M12 16V4m0 0-4 4m4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3',
  result: 'M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  card: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11zM3 10h18M7 14.5h4',
  content: 'M4 5h16M4 12h16M4 19h10',
  correction: 'M4 20l4.5-1.2L20 7.3a1.5 1.5 0 0 0 0-2.1l-1.2-1.2a1.5 1.5 0 0 0-2.1 0L5.2 15.5 4 20z',
  class: 'M12 3 2 8l10 5 10-5-10-5zM2 15l10 5 10-5M2 11.5l10 5 10-5',
  user: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0',
  report: 'M4 20V10m6 10V4m6 16V14',
  shield: 'M12 3l8 3v6c0 4.8-3.2 8.6-8 9.7C7.2 20.6 4 16.8 4 12V6l8-3z',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4 12h1.2M18.8 12H20M12 4v1.2M12 18.8V20M6.3 6.3l.9.9M16.8 16.8l.9.9M6.3 17.7l.9-.9M16.8 7.2l.9-.9',
  logout: 'M15 3h3.5A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5H15M10 8l-4 4 4 4M6 12h12',
  menu: 'M4 6h16M4 12h16M4 18h16',
  bell: 'M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8zM9.5 18a2.5 2.5 0 0 0 5 0',
  search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3',
  chevron: 'M9 6l6 6-6 6',
  sigma: 'M18 5H7l5.5 7L7 19h11',
  check: 'M5 13l4 4L19 7',
  close: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  download: 'M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2',
  robot: 'M9 7V4h6v3M5 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7zM9 14v.01M15 14v.01M3 12h2M19 12h2',
  camera: 'M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  keyboard: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11zM6.5 9h.01M9.5 9h.01M12.5 9h.01M15.5 9h.01M17.5 9h.01M6.5 12h.01M9.5 12h.01M12.5 12h.01M15.5 12h.01M17.5 12h.01M7 15.5h10',
  chart: 'M4 20V10m6 10V4m6 16V14M4 20h16',
  trophy: 'M8 4h8v4a4 4 0 0 1-8 0V4zM8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4M10 15h4v3h-4zM8 21h8',
  briefcase: 'M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9zM8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M4 12.5h16',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  users: 'M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M17 6.5a3.2 3.2 0 0 1 0 6.3M20 20a5.8 5.8 0 0 0-4.5-6.2',
  heart: 'M12 20.5S3.5 15.3 3.5 9.4A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8.5 2.5c0 5.9-8.5 11.1-8.5 11.1z',
  star: 'M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.3l-5.4 3.1 1-6.1-4.4-4.3 6.1-.9L12 3.5z',
  phone: 'M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 14v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2z',
  mail: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3.5 7l8.5 6.5L20.5 7',
  rocket: 'M12 3c3 1.5 5 4.7 5 8.5 0 2-1 4-2 5l-1 2h-4l-1-2c-1-1-2-3-2-5C7 7.7 9 4.5 12 3zM9.5 16l-2.5 1.5V21l2.5-2M14.5 16l2.5 1.5V21l-2.5-2M11 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  medal: 'M12 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM9 20l-2-6M15 20l2-6M12 12l-1.5 2.5h3z',
  fire: 'M12 21c4 0 6.5-2.6 6.5-6.3 0-3-2-5-3-6.7-.3 1.7-1.2 2.7-2 2.7 0-2.7-1-5-3-6.7-.5 3-2.5 4.7-4 6.7-1 1.3-1.5 2.7-1.5 4C5 18.4 8 21 12 21z',
  gift: 'M4 10.5h16v3H4v-3zM5 13.5h14V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6.5zM12 10.5V21M12 10.5C10.5 7 8 6 6.8 7.2 5.6 8.4 7.5 10.5 12 10.5zM12 10.5C13.5 7 16 6 17.2 7.2c1.2 1.2-.7 3.3-5.2 3.3z',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-2 6-6 2 2-6 6-2z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V17h5v-1.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3z',
};

export function Icon({ name, size = 20, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
