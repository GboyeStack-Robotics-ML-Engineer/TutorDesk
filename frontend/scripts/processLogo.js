import { Jimp } from 'jimp';

async function process() {
  try {
    const image = await Jimp.read('./public/logo.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Scan from bottom to top to find the gap between text and icon
    let gapRow = height;
    let foundText = false;
    
    for (let y = height - 1; y >= 0; y--) {
      let rowIsWhite = true;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        if (r < 240 || g < 240 || b < 240) {
          rowIsWhite = false;
          break;
        }
      }
      
      if (!rowIsWhite) {
        foundText = true;
      } else if (foundText && rowIsWhite) {
        // We found the text, and now we hit a white row. This is the gap!
        // Verify it's a real gap
        let gapSize = 1;
        for (let gy = y - 1; gy >= Math.max(0, y - 5); gy--) {
           let gRowWhite = true;
           for (let x = 0; x < width; x++) {
              const idx = (gy * width + x) * 4;
              const r = image.bitmap.data[idx + 0];
              const g = image.bitmap.data[idx + 1];
              const b = image.bitmap.data[idx + 2];
              if (r < 240 || g < 240 || b < 240) {
                gRowWhite = false; break;
              }
           }
           if (gRowWhite) gapSize++;
           else break;
        }
        
        if (gapSize > 3) {
           gapRow = y;
           break;
        }
      }
    }

    // Crop the image to remove text
    if (gapRow < height) {
       // Keep a small margin
       image.crop({ x: 0, y: 0, w: width, h: gapRow - 10 });
    }

    // Now make white transparent and make the logo white
    image.scan((x, y, idx) => {
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];

      const gray = (r + g + b) / 3;
      
      // Calculate new alpha: white (255) -> 0 alpha, dark (50) -> 205 alpha
      let newAlpha = 255 - gray;
      
      // Boost alpha
      newAlpha = Math.min(255, newAlpha * 1.5);

      image.bitmap.data[idx + 0] = 255;
      image.bitmap.data[idx + 1] = 255;
      image.bitmap.data[idx + 2] = 255;
      image.bitmap.data[idx + 3] = newAlpha;
    });

    // Auto-crop empty transparent space around the logo
    // image.autocrop(); // not available in v1 without plugin

    await image.write('./public/logo_white.png');
    console.log("Successfully generated logo_white.png!");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

process();
