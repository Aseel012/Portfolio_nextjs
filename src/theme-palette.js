// Single source of truth for both themes. index.css mirrors these values as
// CSS variables; contrast.test.js verifies every text/surface pair in both.
export const themes = {
  dark: {
    bg: '#0d0d0d',
    frame: '#181818',
    ink: '#f4f4f4',
    body: '#a8a8a8',
    dim: '#8e8e8e',
    hand: '#e6dcc8',
    overlay: '#ffffff',
  },
  light: {
    bg: '#fafafa',
    frame: '#f0efed',
    ink: '#171717',
    body: '#4a4a4a',
    dim: '#5f5f5f',
    hand: '#7a4f20',
    overlay: '#000000',
  },
}

// Contribution graph greens, matched to GitHub's own dark and light ramps.
export const graphLevels = {
  dark: ['rgba(255,255,255,0.07)', '#0e4429', '#006d32', '#26a641', '#39d353'],
  light: ['rgba(0,0,0,0.07)', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
}
