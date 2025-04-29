
import React from 'react';
import { LucideProps } from 'lucide-react';
import { 
  Upload as UploadIcon, 
  Video as VideoIcon,
  Play as PlayIcon,
  Scissors as ScissorsIcon,
  Crop as CropIcon,
  Download as DownloadIcon
} from 'lucide-react';

export const Upload = (props: LucideProps) => <UploadIcon {...props} />;
export const Record = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const InsertToken = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14h8" />
    <path d="M12 10v8" />
  </svg>
);

export const ConnectCrm = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 16h4v4h-4z" />
    <path d="M10 10h4v4h-4z" />
    <path d="M4 4h4v4H4z" />
    <path d="m14 14-4-4" />
    <path d="m20 8-6 6" />
    <path d="m8 6-4 4" />
  </svg>
);

export const ConnectSalesforce = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 8h14" />
    <path d="M5 12h14" />
    <path d="M5 16h14" />
    <path d="M3 8h.01" />
    <path d="M3 12h.01" />
    <path d="M3 16h.01" />
  </svg>
);

export { PlayIcon as Play, VideoIcon as Video, ScissorsIcon as Scissors, CropIcon as Crop, DownloadIcon as Download };
