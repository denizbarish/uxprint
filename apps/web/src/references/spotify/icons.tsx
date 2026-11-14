import type { ReactNode } from "react";

/* Simple line and solid glyphs drawn for these screens (not the platform's icon set). */

type IconProps = { size?: number; className?: string };

const svg = (size: number, className: string | undefined, children: ReactNode, viewBox = "0 0 24 24") => (
  <svg width={size} height={size} viewBox={viewBox} className={className} aria-hidden="true" fill="none">
    {children}
  </svg>
);

const line = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const HomeIcon = ({ size = 24, className, filled }: IconProps & { filled?: boolean }) =>
  svg(size, className, <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z" {...line} fill={filled ? "currentColor" : "none"} />);

export const SearchIcon = ({ size = 24, className }: IconProps) =>
  svg(size, className, <><circle cx="10.5" cy="10.5" r="6.5" {...line} /><path d="m15.5 15.5 4.5 4.5" {...line} /></>);

export const BrowseIcon = ({ size = 24, className, filled }: IconProps & { filled?: boolean }) =>
  svg(size, className, <><rect x="3.5" y="5" width="17" height="14" rx="2" {...line} fill={filled ? "currentColor" : "none"} /><path d="M3.5 9.5h17M10 13.5h4" {...line} stroke={filled ? "#121212" : "currentColor"} /></>);

export const DownloadIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <><circle cx="8" cy="8" r="7" {...line} strokeWidth={1.3} /><path d="M8 4.5v6M5.5 8.5 8 11l2.5-2.5" {...line} strokeWidth={1.3} /></>, "0 0 16 16");

export const PlusIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <path d="M8 2v12M2 8h12" {...line} strokeWidth={1.5} />, "0 0 16 16");

export const GlobeIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <><circle cx="8" cy="8" r="6.5" {...line} strokeWidth={1.3} /><path d="M1.5 8h13M8 1.5c2 2 2.8 4.2 2.8 6.5S10 12.5 8 14.5C6 12.5 5.2 10.3 5.2 8S6 3.5 8 1.5Z" {...line} strokeWidth={1.3} /></>, "0 0 16 16");

export const ChevronLeft = ({ size = 16, className }: IconProps) =>
  svg(size, className, <path d="m10 3-5 5 5 5" {...line} strokeWidth={1.5} />, "0 0 16 16");

export const PlayIcon = ({ size = 24, className }: IconProps) =>
  svg(size, className, <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />);

export const ShuffleIcon = ({ size = 24, className }: IconProps) =>
  svg(size, className, <path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.6 0 2.8-1.2 3.8-2.8M14 9.8C15 8.2 16.2 7 17.5 7H21M18.5 4.5 21 7l-2.5 2.5M18.5 14.5 21 17l-2.5 2.5" {...line} strokeWidth={1.7} />);

export const AddCircleIcon = ({ size = 24, className }: IconProps) =>
  svg(size, className, <><circle cx="12" cy="12" r="9" {...line} strokeWidth={1.7} /><path d="M12 8v8M8 12h8" {...line} strokeWidth={1.7} /></>);

export const MoreIcon = ({ size = 24, className }: IconProps) =>
  svg(size, className, <><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></>);

export const ListIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <path d="M5 4h9M5 8h9M5 12h9M2 4h.5M2 8h.5M2 12h.5" {...line} strokeWidth={1.3} />, "0 0 16 16");

export const ClockIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <><circle cx="8" cy="8" r="6.5" {...line} strokeWidth={1.3} /><path d="M8 4.5V8l2.5 1.5" {...line} strokeWidth={1.3} /></>, "0 0 16 16");

export const CloseIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" {...line} strokeWidth={1.5} />, "0 0 16 16");

export const PinIcon = ({ size = 16, className }: IconProps) =>
  svg(size, className, <><path d="M8 14.5s-4.5-4.2-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.3-4.5 7.5-4.5 7.5Z" {...line} strokeWidth={1.3} /><circle cx="8" cy="7" r="1.6" {...line} strokeWidth={1.3} /></>, "0 0 16 16");

export const DotIcon = ({ size = 20, className }: IconProps) =>
  svg(size, className, <circle cx="10" cy="10" r="4" fill="currentColor" />, "0 0 20 20");
