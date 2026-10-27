'use client';

import { useEffect, useState } from 'react';

// "be a fish" adds a koi you steer (see KoiPond). The two talk over a `koi:player` window
// event, so Esc inside the pond can switch it off here too.
export default function FishToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    window.addEventListener('koi:player', sync);
    return () => window.removeEventListener('koi:player', sync);
  }, []);

  const toggle = () => window.dispatchEvent(new CustomEvent('koi:player', { detail: !on }));

  return (
    <span className="fish-toggle">
      <button
        type="button"
        onClick={toggle}
        title={on ? 'Esc also works' : 'Steer with the arrow keys or WASD'}
      >
        {on ? 'stop being a fish' : 'be a fish'}
      </button>
    </span>
  );
}
