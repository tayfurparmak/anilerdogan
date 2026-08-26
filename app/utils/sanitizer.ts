export function sanitizeHtml(html: string): string {
  // If running on server side, return a basic regex-cleaned version or standard string
  // DOMParser is only available in browser context.
  if (typeof window === 'undefined') {
    // Basic server-side backup sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '')
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'span', 'div']
  const allowedAttrs: Record<string, string[]> = {
    'a': ['href', 'target', 'rel', 'class'],
    'img': ['src', 'alt', 'class'],
    'p': ['class'],
    'h2': ['class'],
    'h3': ['class'],
    'span': ['class'],
    'div': ['class']
  }

  const cleanNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      const tagName = el.tagName.toLowerCase()

      if (!allowedTags.includes(tagName)) {
        // Strip tag but keep children
        const parent = el.parentNode
        if (parent) {
          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el)
          }
          parent.removeChild(el)
        }
        return
      }

      // Filter attributes
      const attrs = Array.from(el.attributes)
      const allowed = allowedAttrs[tagName] || []

      for (const attr of attrs) {
        if (!allowed.includes(attr.name)) {
          el.removeAttribute(attr.name)
        } else if (attr.name === 'href' || attr.name === 'src') {
          const val = attr.value.trim().toLowerCase()
          if (val.startsWith('javascript:') || val.startsWith('data:text/html')) {
            el.removeAttribute(attr.name)
          }
        }
      }

      // Recursively clean children
      const children = Array.from(el.childNodes)
      for (const child of children) {
        cleanNode(child)
      }
    }
  }

  // Clean all elements under body
  const bodyChildren = Array.from(doc.body.childNodes)
  for (const child of bodyChildren) {
    cleanNode(child)
  }

  return doc.body.innerHTML
}
