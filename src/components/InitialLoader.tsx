import React, { useEffect, useState } from 'react';

const InitialLoader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // skip long loader for reduced-motion
      setTimeout(() => setVisible(false), 300);
      return;
    }
    const onLoad = () => {
      setTimeout(() => setVisible(false), 380);
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    const t = setTimeout(() => setVisible(false), 1200);
    return () => { clearTimeout(t); window.removeEventListener('load', onLoad as any); };
  }, []);

  if (!visible) return null;
  return (
    <div className="initial-loader" role="status" aria-label="Loading">
      <div className="flex flex-col items-center">
        <div className="loader-logo" aria-hidden>
          <img src="/favicon.png" alt="" className="h-8 w-12 rounded-md object-contain" />
        </div>
        <div className="loader-line" />
      </div>
    </div>
  );
};

export default InitialLoader;
