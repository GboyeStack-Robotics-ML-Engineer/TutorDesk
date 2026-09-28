// Extract a primary + secondary colour from an uploaded logo image.
//
// This is REAL: it draws the image to an offscreen canvas, samples the pixels,
// buckets them by colour, ignores near-white/near-transparent background, and
// returns the two most dominant vivid colours. Used on onboarding so invoices
// pick up the tutor's brand automatically.

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

// crude "vividness" so we prefer brand colours over greys
function score(r, g, b, count) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // downweight near-white and near-black
  const midness = 1 - Math.abs(lum - 0.5) * 1.2;
  return count * (0.4 + sat) * Math.max(0.15, midness);
}

export function extractColorsFromImage(imgEl) {
  const w = 80, h = 80; // small sample is plenty
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgEl, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const buckets = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 128) continue;                 // skip transparent
    if (r > 240 && g > 240 && b > 240) continue; // skip near-white bg
    // quantise to reduce noise
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const cur = buckets.get(key) || { r: 0, g: 0, b: 0, count: 0 };
    cur.r += r; cur.g += g; cur.b += b; cur.count += 1;
    buckets.set(key, cur);
  }

  const ranked = [...buckets.values()]
    .map((c) => {
      const r = Math.round(c.r / c.count), g = Math.round(c.g / c.count), b = Math.round(c.b / c.count);
      return { r, g, b, count: c.count, s: score(r, g, b, c.count) };
    })
    .sort((a, b) => b.s - a.s);

  if (ranked.length === 0) {
    return { primary: '#005248', secondary: '#C48037' };
  }
  const primary = rgbToHex(ranked[0].r, ranked[0].g, ranked[0].b);
  // pick a secondary that differs enough from primary
  let secondary = primary;
  for (let i = 1; i < ranked.length; i++) {
    const d = Math.abs(ranked[i].r - ranked[0].r) + Math.abs(ranked[i].g - ranked[0].g) + Math.abs(ranked[i].b - ranked[0].b);
    if (d > 90) { secondary = rgbToHex(ranked[i].r, ranked[i].g, ranked[i].b); break; }
  }
  if (secondary === primary) secondary = '#C48037';
  return { primary, secondary };
}

// read a File into a data URL (for storing the logo in localStorage)
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
