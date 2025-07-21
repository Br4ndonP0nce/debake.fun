// src/lib/xlsx-global.ts
// Add this to your layout or load it globally for the sample download feature

declare global {
  interface Window {
    XLSX: any;
  }
}

// Load XLSX library dynamically for client-side usage
export const loadXLSX = async () => {
  if (typeof window !== 'undefined' && !window.XLSX) {
    // For production, you might want to host this locally or use a CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.async = true;
    
    return new Promise((resolve) => {
      script.onload = () => {
        resolve(window.XLSX);
      };
      document.head.appendChild(script);
    });
  }
  return window.XLSX;
};

// Call this in your app initialization or when needed
if (typeof window !== 'undefined') {
  loadXLSX();
}