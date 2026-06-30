// React's createContext lets us share state across the whole app
// without passing props down through every single component.
// Think of it like a global variable that React tracks and re-renders on.
import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the context — an empty container for our theme data.
const ThemeContext = createContext();

// Step 2: Create the Provider — wraps our app and "provides"
// isDark and toggleTheme to every component inside it.
export function ThemeProvider({ children }) {
  // useState's initializer function runs ONCE on first render only.
  // It checks localStorage (saved in the browser) first — if the user
  // chose a theme before, remember it. Otherwise, fall back to their OS setting.
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // useEffect runs after render, whenever 'isDark' changes.
  // It toggles the 'dark' class on <html> — this is what our
  // @custom-variant dark (&:where(.dark, .dark *)) in index.css watches for.
  useEffect(() => {
    const root = document.documentElement; // This is the <html> tag
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]); // Dependency array: only re-runs when isDark changes

  // Flips true to false, false to true
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Custom hook — instead of writing useContext(ThemeContext)
// everywhere, components just call useTheme(). Cleaner and safer.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
}