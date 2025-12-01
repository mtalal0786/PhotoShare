export function sanitizeImage(src: string) {
  if (!src) return ''
  return src.replace(/sourceMappingURL=.*$/g, '')
}
