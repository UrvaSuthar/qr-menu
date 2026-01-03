'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Check, Copy, Download, Printer, Smartphone } from 'lucide-react';
import '@/styles/app.css';

interface QRCodeGeneratorProps {
    slug: string;
    restaurantName: string;
}

export function QRCodeGenerator({ slug, restaurantName }: QRCodeGeneratorProps) {
    const [size, setSize] = useState(256);
    const [copied, setCopied] = useState(false);

    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_APP_URL || 'https://qr-menu-sigma.vercel.app');

    const publicUrl = slug.startsWith('http')
        ? slug
        : `${baseUrl}/menu/${slug}`;

    const downloadQR = () => {
        const svg = document.getElementById('qr-code-svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${slug}-qr-code.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            });
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const printQR = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (!printWindow) return;

        const svg = document.getElementById('qr-code-svg');
        if (!svg) return;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${restaurantName}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
            }
            h1 { margin: 0 0 20px 0; font-weight: 600; }
            p { margin: 10px 0; color: #666; }
            @media print {
              body { padding: 40px; }
            }
          </style>
        </head>
        <body>
          <h1>${restaurantName}</h1>
          ${svg.outerHTML}
          <p>Scan to view menu</p>
          <p style="font-size: 12px; color: #999;">${publicUrl}</p>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* QR Code Display */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--space-8)',
                background: 'var(--app-bg)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--app-border)'
            }}>
                <QRCodeSVG
                    id="qr-code-svg"
                    value={publicUrl}
                    size={size}
                    level="H"
                    includeMargin
                />
            </div>

            {/* Size Selector */}
            <div className="app-field">
                <label className="app-label">QR Code Size</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {[128, 256, 512].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`app-button app-button--sm ${size === s ? 'app-button--primary' : 'app-button--secondary'}`}
                        >
                            {s}px
                        </button>
                    ))}
                </div>
            </div>

            {/* Public URL */}
            <div className="app-field">
                <label className="app-label">Public Menu URL</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                        type="text"
                        value={publicUrl}
                        readOnly
                        className="app-input"
                        style={{ flex: 1, background: 'var(--app-bg-secondary)' }}
                    />
                    <button
                        onClick={copyUrl}
                        className="app-button app-button--secondary app-button--sm"
                    >
                        {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <button onClick={downloadQR} className="app-button app-button--primary">
                    <Download size={18} />
                    Download PNG
                </button>
                <button onClick={printQR} className="app-button app-button--secondary">
                    <Printer size={18} />
                    Print
                </button>
            </div>

            {/* Usage Instructions */}
            <div style={{
                background: 'var(--app-bg-secondary)',
                border: '1px solid var(--app-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-4)'
            }}>
                <h3 style={{
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-base)'
                }}>
                    <Smartphone size={18} />
                    How to use:
                </h3>
                <ul style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--app-text-muted)',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-1)'
                }}>
                    <li>1. Download or print the QR code</li>
                    <li>2. Place it on tables, menus, or storefront</li>
                    <li>3. Customers scan with their phone camera</li>
                    <li>4. Menu opens instantly - no app needed!</li>
                </ul>
            </div>
        </div>
    );
}
