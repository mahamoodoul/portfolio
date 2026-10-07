// Re-mounts on every navigation, giving each route a short fade-in (disabled for reduced motion in globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
