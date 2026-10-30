
'use client';

import { useState } from 'react';
import hljs from 'highlight.js/lib/common';

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

export default function CodeBlock({
  code,
  language = 'javascript',
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const safeLanguage = hljs.getLanguage(language)
    ? language
    : 'plaintext';

  const highlightedCode = hljs.highlight(code, {
    language: safeLanguage,
  }).value;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="article-code-shell">
      <div className="article-code-toolbar">
        <div className="article-code-label">
          <span className="article-code-dot" />
          <span>{title || safeLanguage}</span>
        </div>

        <button
          type="button"
          className="article-copy-button"
          onClick={copyCode}
          aria-label="Copy code to clipboard"
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>

      <pre className="article-code">
        <code
          className={`hljs language-${safeLanguage}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
