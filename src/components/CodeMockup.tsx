import React, { useState, useEffect } from "react";

type Props = {
  code?: string;
  language?: string;
  ariaLabel?: string;
};

export const CodeMockup: React.FC<Props> = ({ code, ariaLabel = "Code example" }) => {
  const fullCode =
    code ?? `import { CodeWizardsAI } from "@codewizards/core";

const cw = new CodeWizardsAI({
  community: "student-developers",
  focus: ["AI", "Web", "Cloud", "Open Source"]
});

const future = await cw.build({
  mission: "Empower Coders of Tomorrow",
  mindset: "Learn • Build • Grow"
});

console.log(future.status);
// Output: Innovation Initialized 🚀`;

  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedCode((prev) => {
        if (index >= fullCode.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          return fullCode;
        }
        const nextChar = fullCode.charAt(index);
        index++;
        return fullCode.slice(0, index);
      });
    }, 30); // Typing speed

    return () => clearInterval(intervalId);
  }, [fullCode]);

  // Simple syntax highlighting regex
  const highlightLine = (line: string) => {
    // Split by common tokens
    const parts = line.split(/(\b(?:const|import|from|new|await|return|if|else|console)\b|"[^"]*"|'[^']*'|\/\/.*|\{|\}|\(|\)|\[|\]|\.|:|;)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (['const', 'import', 'from', 'new', 'await', 'return', 'if', 'else'].includes(part)) return <span key={i} className="text-purple-400">{part}</span>;
      if (part === 'console') return <span key={i} className="text-yellow-300">{part}</span>;
      if (part.startsWith('"') || part.startsWith("'")) return <span key={i} className="text-green-400">{part}</span>;
      if (part.startsWith('//')) return <span key={i} className="text-gray-500 italic">{part}</span>;
      if (['{', '}', '(', ')', '[', ']', '.', ':', ';'].includes(part)) return <span key={i} className="text-cyan-200">{part}</span>;
      return <span key={i} className="text-[#a5b4fc]">{part}</span>; // default light indigo
    });
  };

  return (
    <div className="relative w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0">
      <div className="rounded-2xl bg-[#09090b]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md transform-gpu transition-all duration-500 hover:shadow-cyan-500/10 hover:border-white/20">
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-sm" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-sm" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-sm" />
            <span className="ml-3 text-xs text-muted-foreground/70 font-mono tracking-wide">innovation.ts</span>
          </div>
        </div>

        <pre
          className="m-0 p-6 text-sm md:text-[15px] leading-relaxed overflow-auto bg-transparent font-mono code-mockup min-h-[300px]"
          role="region"
          aria-label={ariaLabel}
        >
          <code>
            {displayedCode.split('\n').map((line, i) => (
              <div key={i} className="whitespace-pre min-h-[1.5em] block">
                {highlightLine(line)}
                {/* Cursor only on last line being typed */}
                {isTyping && i === displayedCode.split('\n').length - 1 && (
                  <span className="inline-block w-2 h-4 ml-1 align-middle bg-cyan-400 animate-pulse rounded-[1px]" />
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeMockup;
