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
        <div className="flex flex-col gap-6">
            <div className="app-qr">
                <QRCodeSVG
                    id="qr-code-svg"
                    value={publicUrl}
                    size={size}
                    level="H"
                    includeMargin
                    className="app-qr__svg"
                />
            </div>

            <div className="app-field">
                <span className="app-label" id="qr-size-label">QR Code Size</span>
                <div className="flex gap-2" role="group" aria-labelledby="qr-size-label">
                    {[128, 256, 512].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            aria-pressed={size === s}
                            className={`app-button app-button--sm ${size === s ? 'app-button--primary' : 'app-button--secondary'}`}
                        >
                            {s}px
                        </button>
                    ))}
                </div>
            </div>

            <div className="app-field">
                <label className="app-label" htmlFor="qr-public-url">Public Menu URL</label>
                <div className="flex gap-2">
                    <input
                        id="qr-public-url"
                        type="text"
                        value={publicUrl}
                        readOnly
                        className="app-input min-w-0 flex-1 bg-paper-2"
                    />
                    <button
                        onClick={copyUrl}
                        className="app-button app-button--secondary app-button--sm self-center"
                    >
                        {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button onClick={downloadQR} className="app-button app-button--primary">
                    <Download size={18} />
                    Download PNG
                </button>
                <button onClick={printQR} className="app-button app-button--secondary">
                    <Printer size={18} />
                    Print
                </button>
            </div>

            <div className="app-banner p-5">
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                    <Smartphone size={18} aria-hidden="true" />
                    How to use:
                </h3>
                <ol className="flex flex-col gap-1 text-sm text-muted">
                    <li>1. Download or print the QR code</li>
                    <li>2. Place it on tables, menus, or storefront</li>
                    <li>3. Customers scan with their phone camera</li>
                    <li>4. Menu opens instantly - no app needed!</li>
                </ol>
            </div>
        </div>
    );
}
