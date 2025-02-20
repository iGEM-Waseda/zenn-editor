"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = void 0;
var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const tags = ['a', 'aside', 'blockquote', 'br', 'circle', 'code', 'details', 'div', 'em', 'embed-katex', 'eq', 'eqn', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'iframe', 'img', 'input', 'li', 'ol', 'p', 'pre', 's', 'section', 'span', 'strong', 'summary', 'sup', 'table', 'tbody', 'td', 'text', 'th', 'thead', 'tr', 'ul'];
const attributes = {
  a: ['aria-hidden', 'class', 'href', 'id', 'rel', 'style', 'target', 'title'],
  aside: ['class'],
  blockquote: [],
  br: ['style'],
  circle: ['cx', 'cy', 'fill', 'r'],
  code: ['class'],
  details: [],
  div: ['class'],
  em: [],
  'embed-katex': ['display-mode'],
  eq: ['class'],
  eqn: [],
  h1: ['id'],
  h2: ['id'],
  h3: ['id'],
  h4: ['id'],
  h5: [],
  h6: [],
  hr: [],
  iframe: ['allow', 'allowfullscreen', 'allowtransparency', 'data-content', 'frameborder', 'id', 'loading', 'sandbox', 'scrolling', 'src', 'style', 'width'],
  img: ['alt', 'class', 'height', 'loading', 'src', 'title', 'width'],
  input: ['checked', 'class', 'type'],
  li: ['class', 'id'],
  ol: ['class', 'start'],
  p: [],
  pre: ['class'],
  s: [],
  section: ['class'],
  span: ['class', 'title'],
  strong: [],
  summary: [],
  sup: ['class'],
  table: [],
  tbody: [],
  td: ['style'],
  text: ['dominant-baseline', 'fill', 'font-size', 'font-weight', 'text-anchor', 'x', 'y'],
  th: ['style'],
  thead: [],
  tr: [],
  ul: ['class']
};
const sanitize = html => (0, _sanitizeHtml.default)(html, {
  allowedTags: tags,
  allowedAttributes: attributes,
  disallowedTagsMode: 'discard',
  // from: default value https://github.com/apostrophecms/sanitize-html#default-options
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta']
});
exports.sanitize = sanitize;