import os
from PIL import Image
import numpy as np

path = r"C:\Users\asamuel\Desktop\TBP 2026\TutorDesk\frontend\public\logo.png"

if not os.path.exists(path):
    print(f"Error: {path} not found.")
    exit(1)

img = Image.open(path).convert("L") # grayscale
data = np.array(img)

# Background is white (255), logo is dark. 
# Invert so logo is bright (high alpha) and bg is 0 (low alpha)
alpha = 255 - data

# Normalize alpha so the darkest part of the original image becomes fully opaque (255)
alpha = ((alpha - alpha.min()) / (alpha.max() - alpha.min()) * 255).astype(np.uint8)

# Find the gap to crop out the text at the bottom
row_sums = alpha.sum(axis=1)
non_zero_rows = np.where(row_sums > 0)[0]

if len(non_zero_rows) > 0:
    start_row = non_zero_rows[0]
    end_row = non_zero_rows[-1]
    
    # Search from bottom up for a gap (very low row sum)
    # Start looking a bit above the very bottom to skip the text itself
    for r in range(end_row - 10, start_row, -1):
        if row_sums[r] < row_sums.max() * 0.02: # gap threshold
            alpha[r:] = 0 # Erase everything below the gap
            break

# 1. White logo (for dark backgrounds)
rgba_white = np.zeros((data.shape[0], data.shape[1], 4), dtype=np.uint8)
rgba_white[:, :, 0] = 255
rgba_white[:, :, 1] = 255
rgba_white[:, :, 2] = 255
rgba_white[:, :, 3] = alpha

# 2. Original Green logo (but transparent bg)
# We can actually just take the original RGB and use the computed alpha
img_rgb = np.array(Image.open(path).convert("RGB"))
rgba_color = np.zeros((data.shape[0], data.shape[1], 4), dtype=np.uint8)
rgba_color[:, :, 0:3] = img_rgb
rgba_color[:, :, 3] = alpha

Image.fromarray(rgba_white).save(r"C:\Users\asamuel\Desktop\TBP 2026\TutorDesk\frontend\public\logo_white.png")
Image.fromarray(rgba_color).save(r"C:\Users\asamuel\Desktop\TBP 2026\TutorDesk\frontend\public\logo_transparent.png")
print("Successfully processed logos.")
