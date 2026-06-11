export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.32A10 10 0 1 0 12 2zm5.46 14.12c-.23.65-1.35 1.27-1.86 1.3-.5.04-.97.23-3.27-.68-2.77-1.09-4.53-3.92-4.67-4.1-.13-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.28c.25-.27.54-.34.72-.34l.52.01c.17.01.39-.06.61.47.23.54.78 1.87.85 2 .07.14.11.3.02.48-.09.18-.13.29-.27.45l-.41.48c-.13.13-.27.28-.12.54.16.27.7 1.16 1.5 1.88 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.06.11.06.65-.16 1.34z" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#hero">
      <span className="brand-mark">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 13c2.5-1.8 5-1.8 7.5 0s5 1.8 7.5 0M3 17c2.5-1.8 5-1.8 7.5 0s5 1.8 7.5 0M12 4l3.5 6h-7L12 4z"
            stroke="#fff"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="brand-text">
        <span className="en">TOHATSU</span>
        <small>توهاتسو أرابيا</small>
      </span>
    </a>
  );
}
