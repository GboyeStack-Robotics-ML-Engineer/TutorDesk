import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../lib/store';
import { extractColorsFromImage, fileToDataUrl } from '../../lib/colors';

// Branding setup (part of onboarding).
// Path A: upload a logo -> we extract a primary + secondary colour automatically.
// Path B: no logo -> tutor picks the two colours and types the invoice name.
// Saved to the brand in localStorage; the invoice maker uses it live.

export const BrandSetup = () => {
  const navigate = useNavigate();
  const existing = store.getBrand();
  const fileRef = useRef(null);

  const [logoDataUrl, setLogoDataUrl] = useState(existing.logoDataUrl);
  const [primary, setPrimary] = useState(existing.primaryColor);
  const [secondary, setSecondary] = useState(existing.secondaryColor);
  const [invoiceName, setInvoiceName] = useState(existing.invoiceName);
  const [extracting, setExtracting] = useState(false);
  const [saved, setSaved] = useState(false);

  const onPickLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtracting(true);
    const dataUrl = await fileToDataUrl(file);
    setLogoDataUrl(dataUrl);
    // extract colours once the image is decoded
    const img = new Image();
    img.onload = () => {
      try {
        const { primary: p, secondary: s } = extractColorsFromImage(img);
        setPrimary(p);
        setSecondary(s);
      } catch { /* keep current colours */ }
      setExtracting(false);
    };
    img.onerror = () => setExtracting(false);
    img.src = dataUrl;
  };

  const removeLogo = () => {
    setLogoDataUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const save = () => {
    store.setBrand({ logoDataUrl, primaryColor: primary, secondaryColor: secondary, invoiceName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-space-5">
      <div>
        <h1 className="font-heading text-title-md text-ink-900">Brand your invoices</h1>
        <p className="font-caption text-caption text-ink-500">
          Add your logo and we'll pick your colours automatically — or set them yourself.
        </p>
      </div>

      {/* Logo */}
      <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
        <h2 className="font-label text-label text-ink-700">Your logo</h2>
        <div className="flex items-center gap-space-5">
          <div className="w-24 h-24 rounded-xl border-2 border-dashed border-paper-300 flex items-center justify-center overflow-hidden bg-surface-container-lowest shrink-0">
            {logoDataUrl ? (
              <img src={logoDataUrl} alt="logo preview" className="w-full h-full object-contain" />
            ) : (
              <span className="material-symbols-outlined text-ink-500 text-[32px]">image</span>
            )}
          </div>
          <div className="flex-1">
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickLogo} className="hidden" id="logo-input" />
            <div className="flex gap-space-3">
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 bg-primary text-on-primary px-space-4 py-2 rounded-lg font-label text-label">
                <span className="material-symbols-outlined text-[18px]">upload</span>
                {logoDataUrl ? 'Replace logo' : 'Upload logo'}
              </button>
              {logoDataUrl && (
                <button onClick={removeLogo}
                  className="flex items-center gap-2 border border-paper-300 px-space-4 py-2 rounded-lg font-label text-label text-ink-700">
                  Remove
                </button>
              )}
            </div>
            <p className="font-caption text-caption text-ink-500 mt-2">
              {extracting ? 'Extracting your colours…' : 'PNG or JPG. We read your brand colours from it.'}
            </p>
          </div>
        </div>
      </div>

      {/* Colours + name */}
      <div className="bg-paper-0 border border-paper-200 rounded-xl p-space-5 flex flex-col gap-space-4">
        <h2 className="font-label text-label text-ink-700">
          {logoDataUrl ? 'Colours (auto-detected — adjust if needed)' : 'Colours & name'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-4">
          <div>
            <label className="font-caption text-caption text-ink-500 uppercase">Primary</label>
            <div className="flex items-center gap-space-3 mt-1">
              <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)}
                className="w-12 h-12 rounded-lg border border-paper-300 cursor-pointer" />
              <input type="text" value={primary} onChange={(e) => setPrimary(e.target.value)}
                className="flex-1 border border-paper-300 rounded-lg px-space-3 py-2 font-mono text-body focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="font-caption text-caption text-ink-500 uppercase">Secondary</label>
            <div className="flex items-center gap-space-3 mt-1">
              <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)}
                className="w-12 h-12 rounded-lg border border-paper-300 cursor-pointer" />
              <input type="text" value={secondary} onChange={(e) => setSecondary(e.target.value)}
                className="flex-1 border border-paper-300 rounded-lg px-space-3 py-2 font-mono text-body focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        <div>
          <label className="font-caption text-caption text-ink-500 uppercase">Name on invoice</label>
          <input type="text" value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)}
            placeholder="e.g. Aisha Bello Tutorials"
            className="w-full mt-1 border border-paper-300 rounded-lg px-space-3 py-2 font-body text-body focus:outline-none focus:border-primary" />
        </div>

        {/* Swatch preview */}
        <div className="flex items-center gap-space-3 mt-space-2">
          <span className="font-caption text-caption text-ink-500">Preview:</span>
          <div className="flex items-center rounded-lg overflow-hidden border border-paper-200">
            <span className="w-16 h-8" style={{ background: primary }} />
            <span className="w-16 h-8" style={{ background: secondary }} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-3">
        <button onClick={save}
          className="flex items-center gap-2 bg-primary text-on-primary px-space-5 py-2.5 rounded-lg font-label text-label">
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save branding
        </button>
        <button onClick={() => navigate('/portal/view/invoice-maker')}
          className="flex items-center gap-2 border border-paper-300 px-space-5 py-2.5 rounded-lg font-label text-label text-ink-700">
          Go to invoice maker
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-success-solid font-label text-label">
            <span className="material-symbols-outlined text-[18px]">check_circle</span> Saved
          </span>
        )}
      </div>
    </div>
  );
};

// Also export as the onboarding branding step alias
export const BrandingSettingsPage = BrandSetup;
