# Portfolio (static)

This is a small, accessible, and responsive static portfolio site scaffold for Piyush N Chandre. It is intentionally simple so you can host it on any static host or open locally.

Files created:

How to run locally (recommended):
Open `index.html` directly in your browser, or serve with a simple static server for correct behavior of some browsers (recommended):

PowerShell (Windows):

```powershell
# Serve current folder on port 8000 (requires Python 3 installed)
Set-Location 'c:\Users\piyus\OneDrive\Desktop\portfolio'
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Notes and next steps:
 
 Image optimization tips
 - If `assets/piyush.jpg` is large, create a web-friendly, resized version and a 2x variant for HiDPI screens. Example with ImageMagick:
 
 ```powershell
 # Resize to 1200px wide and create a 2x version
 magick convert assets/piyush.jpg -resize 1200x assets/piyush.jpg
 magick convert assets/piyush.jpg -resize 2400x assets/piyush@2x.jpg
 ```
 
 - You can also create a WebP version for smaller downloads (modern browsers):
 
 ```powershell
 magick convert assets/piyush.jpg -quality 80 assets/piyush.webp
 ```
 
 - After creating the optimized images, the hero will automatically use `assets/piyush.jpg` if present. I added `loading="lazy"` and sizing attributes to reduce initial load.
