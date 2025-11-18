"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          h1: ({ ...props }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xl font-bold mt-4 mb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
          ),
          p: ({ ...props }) => <p className="my-2" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 pl-4 my-4 italic" {...props} />
          ),
          code: ({ ...props }) => (
            <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
          ),
          pre: ({ ...props }) => (
            <pre
              className="bg-gray-800 text-white rounded p-4 my-4 overflow-x-auto"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
