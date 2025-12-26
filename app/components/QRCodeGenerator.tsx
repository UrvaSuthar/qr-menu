'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Check, Copy, Download, Printer, Smartphone } from 'lucide-react';

interface QRCodeGeneratorProps {
    slug: string;
    restaurantName: string;
}

export function QRCodeGenerator({ slug, restaurantName }: QRCodeGeneratorProps) {
    const [size, setSize] = useState(256);
    const [copied, setCopied] = useState(false);

    // Handle both partial slug (e.g. "pizza-place") and full URL (e.g. "http://...")
    const publicUrl = typeof window !== 'undefined'
        ? (slug.startsWith('http') ? slug : `${window.location.origin}/menu/${slug}`)
        : '';

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
              font-family: system-ui, -apple-system, sans-serif;
            }
            h1 { margin: 0 0 20px 0; }
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
          <p style="font-size: 12px;">${publicUrl}</p>
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
        <div className="space-y-6">
            {/* QR Code Display */}
            <div className="flex justify-center p-8 bg-white rounded-lg border-2 border-gray-200">
                <QRCodeSVG
                    id="qr-code-svg"
                    value={publicUrl}
                    size={size}
                    level="H"
                    includeMargin
                />
            </div>

            {/* Size Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    QR Code Size
                </label>
                <div className="flex gap-2">
                    {[128, 256, 512].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`
                px-4 py-2 rounded-lg font-medium transition
                ${size === s
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
              `}
                        >
                            {s}px
                        </button>
                    ))}
                </div>
            </div>

            {/* Public URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Menu URL
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={publicUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <button
                        onClick={copyUrl}
                        className="px-4 py-2 border border-gray-300 hover:border-black rounded-lg transition flex items-center gap-2"
                    >
                        {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={downloadQR}
                    className="px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                    <Download size={18} /> Download PNG
                </button>
                <button
                    onClick={printQR}
                    className="px-4 py-3 border border-gray-300 hover:border-black text-black rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                    <Printer size={18} /> Print
                </button>
            </div>

            {/* Usage Instructions */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2"><Smartphone size={18} /> How to use:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>1. Download or print the QR code</li>
                    <li>2. Place it on tables, menus, or storefront</li>
                    <li>3. Customers scan with their phone camera</li>
                    <li>4. Menu opens instantly - no app needed!</li>
                </ul>
            </div>
        </div>
    );
}
