/** The site's only icon: a drawn outbound arrow that inherits text colour. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-[0.7em] shrink-0"}
    >
      <path d="M3.5 2.5h6v6M9.5 2.5l-7 7" />
    </svg>
  );
}
