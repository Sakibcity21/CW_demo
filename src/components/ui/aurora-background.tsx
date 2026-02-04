import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  "aria-hidden"?: boolean;
};

/**
 * Decorative aurora background used by Hero and other sections.
 * - CSS-only visuals (no runtime deps)
 * - Respects prefers-reduced-motion
 * - Pointer-events are disabled by default
 */
const AuroraBackground: React.FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none -z-10 ${className}`}
      {...(rest as any)}
    >
      <div className="aurora-bg" aria-hidden />
      {/* optional decorative layer in front of the aurora for extra depth */}
      <div className="aurora-fg" aria-hidden />
      {/* children are rendered in normal document flow (if provided) */}
      {children ? <div className="relative z-10 pointer-events-auto">{children}</div> : null}
    </div>
  );
};

export default AuroraBackground;
