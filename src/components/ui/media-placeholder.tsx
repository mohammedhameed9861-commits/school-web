/**
 * Decorative stand-in for real photography/video, used until the school
 * supplies real assets (see the section's actual caption/heading for the
 * real copy — this component never claims to depict anything itself).
 * Drop real media into `public/assets/<section>/` and swap for `next/image`.
 */
export interface MediaPlaceholderProps {
  className?: string;
  icon?: React.ReactNode;
}

export const MediaPlaceholder = ({ className, icon }: MediaPlaceholderProps) => {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center overflow-hidden rounded-card bg-gradient-to-br from-action-primary via-action-primary to-action-primary-hover ${className ?? ""}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-white/10 text-action-accent">
        {icon ?? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
            <path
              d="M4 7a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
};
