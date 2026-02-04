/**
 * highlightBrand
 * - Finds occurrences of a phrase (default: "code wizards") in text nodes and wraps them
 *   in a <span class="brand-tektur"> to apply the Tektur font.
 * - Safe: skips SCRIPT/STYLE/CODE/PRE/INPUT/TEXTAREA/SVG and already-wrapped nodes.
 * - Optional: can observe mutations and highlight newly added content (returns observer).
 */

type Options = {
  phrase?: string;
  observe?: boolean;
  root?: Element | Document;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightBrand(options: Options = {}) {
  if (typeof document === "undefined") return;
  const phrase = options.phrase ?? "code wizards";
  const root: Element | Document = options.root ?? document.body;
  const regex = new RegExp(`\\b(${escapeRegExp(phrase)})\\b`, "gi");

  const IGNORED_TAGS = new Set([
    "SCRIPT",
    "STYLE",
    "CODE",
    "PRE",
    "TEXTAREA",
    "INPUT",
    "NOSCRIPT",
    "SVG",
  ]);

  function nodeIsIgnored(node: Node) {
    const el = (node.parentElement || (node as any).parentNode?.host) as Element | null;
    if (!el || !(el instanceof Element)) return false;
    if (IGNORED_TAGS.has(el.tagName)) return true;
    if (el.closest && el.closest('.brand-tektur')) return true; // already wrapped
    const possibleHTMLElement = el as HTMLElement;
    if ("isContentEditable" in possibleHTMLElement && possibleHTMLElement.isContentEditable) return true;
    return false;
  }

  function highlightTextNode(textNode: Text) {
    const text = textNode.nodeValue;
    if (!text) return;
    if (!regex.test(text)) return;
    // Reset lastIndex in case of global regex reuse
    regex.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    text.replace(regex, (match, _p1, offset) => {
      // append text before match
      const before = text.slice(lastIndex, offset);
      if (before) frag.appendChild(document.createTextNode(before));
      // matched span
      const span = document.createElement("span");
      span.className = "brand-tektur";
      span.textContent = match;
      frag.appendChild(span);
      lastIndex = offset + match.length;
      return match;
    });

    const remainder = text.slice(lastIndex);
    if (remainder) frag.appendChild(document.createTextNode(remainder));

    textNode.parentNode?.replaceChild(frag, textNode);
  }

  function walkAndHighlight(container: Element | Document) {
    const walker = document.createTreeWalker(
      container as Node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (nodeIsIgnored(node)) return NodeFilter.FILTER_REJECT;
          if (!regex.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodesToProcess: Text[] = [];
    let cur: Node | null = walker.nextNode();
    while (cur) {
      nodesToProcess.push(cur as Text);
      cur = walker.nextNode();
    }

    for (const tn of nodesToProcess) highlightTextNode(tn);
  }

  walkAndHighlight(root);

  if (options.observe) {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            if (!nodeIsIgnored(node)) highlightTextNode(node as Text);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (!IGNORED_TAGS.has(el.tagName)) walkAndHighlight(el);
          }
        }
      }
    });
    observer.observe(root instanceof Document ? root.documentElement : root, {
      childList: true,
      subtree: true,
    });
    return observer;
  }
  return undefined;
}

export default highlightBrand;
