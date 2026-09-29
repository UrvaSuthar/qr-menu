'use client';

import { useState, useSyncExternalStore } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';

const noopSubscribe = () => () => {};

/** The public menu URL for a slug path, with copy and open buttons. */
export function PublicLink({ path }: { path: string }) {
    const [copied, setCopied] = useState(false);
    const origin = useSyncExternalStore(noopSubscribe, () => window.location.origin, () => '');
    const url = `${origin}${path}`;

    const copy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="app-publink">
            <span className="app-publink__url" title={url}>{url.replace(/^https?:\/\//, '')}</span>
            <button type="button" onClick={copy} className="app-button app-button--secondary app-button--sm" aria-label="Copy public link">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
            </button>
            <a href={path} target="_blank" rel="noopener noreferrer" className="app-button app-button--ghost app-button--sm" aria-label="Open public page">
                <ExternalLink size={16} />
            </a>
        </div>
    );
}
