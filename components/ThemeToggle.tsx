'use client';

type Theme = 'light' | 'dark';

// The initial theme is set before paint by the inline script in app/layout.tsx,
// so the active option is styled from the <html data-theme> attribute in CSS.
function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}

export default function ThemeToggle() {
  return (
    <>
      <button type="button" className="light" onClick={() => setTheme('light')}>
        light
      </button>
      {' · '}
      <button type="button" className="dark" onClick={() => setTheme('dark')}>
        dark
      </button>
    </>
  );
}
