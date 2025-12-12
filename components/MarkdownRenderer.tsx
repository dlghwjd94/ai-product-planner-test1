import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-pink-700 prose-h2:text-slate-800 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2 prose-h3:text-slate-800 prose-h3:text-lg prose-h3:mt-6 prose-strong:text-slate-900 prose-a:text-pink-600 hover:prose-a:text-pink-800 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;