"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "markdownToSimpleHtml", {
  enumerable: true,
  get: function () {
    return _markdownToSimpleHtml.markdownToSimpleHtml;
  }
});
var _markdownIt = _interopRequireDefault(require("markdown-it"));
var _embed = require("./embed");
var _markdownItImsize = _interopRequireDefault(require("@steelydylan/markdown-it-imsize"));
var _markdownItAnchor = _interopRequireDefault(require("markdown-it-anchor"));
var _mdBr = require("./utils/md-br");
var _mdKatex = require("./utils/md-katex");
var _mdCustomBlock = require("./utils/md-custom-block");
var _mdLinkAttributes = require("./utils/md-link-attributes");
var _mdLinkifyToCard = require("./utils/md-linkify-to-card");
var _mdRendererFence = require("./utils/md-renderer-fence");
var _mdContainer = require("./utils/md-container");
var _markdownToSimpleHtml = require("./markdown-to-simple-html");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// plugis

const mdContainer = require('markdown-it-container');
const mdFootnote = require('markdown-it-footnote');
const mdTaskLists = require('markdown-it-task-lists');
const mdInlineComments = require('markdown-it-inline-comments');
function getFootnoteContent(env, id) {
  var _env$footnotes, _env$footnotes$refs;
  const ref = (_env$footnotes = env.footnotes) === null || _env$footnotes === void 0 ? void 0 : (_env$footnotes$refs = _env$footnotes.refs) === null || _env$footnotes$refs === void 0 ? void 0 : _env$footnotes$refs[id];
  return ref ? ref.content : '';
}
const markdownToHtml = (text, options) => {
  if (!(text && text.length)) return '';
  const markdownOptions = {
    ...options,
    customEmbed: {
      ..._embed.embedGenerators,
      ...(options === null || options === void 0 ? void 0 : options.customEmbed)
    }
  };
  const md = (0, _markdownIt.default)({
    breaks: true,
    linkify: true
  });
  md.linkify.set({
    fuzzyLink: false
  });
  md.use(_mdBr.mdBr).use(_mdKatex.mdKatex).use(mdFootnote).use(mdInlineComments).use(_markdownItImsize.default).use(_mdLinkAttributes.mdLinkAttributes).use(_mdCustomBlock.mdCustomBlock, markdownOptions).use(_mdRendererFence.mdRendererFence, markdownOptions).use(_mdLinkifyToCard.mdLinkifyToCard, markdownOptions).use(mdTaskLists, {
    enabled: true
  }).use(mdContainer, 'details', _mdContainer.containerDetailsOptions).use(mdContainer, 'message', _mdContainer.containerMessageOptions).use(mdContainer, 'left', _mdContainer.containerLeftOptions).use(mdContainer, 'right', _mdContainer.containerRightOptions).use(_markdownItAnchor.default, {
    level: [1, 2, 3, 4],
    permalink: _markdownItAnchor.default.permalink.ariaHidden({
      placement: 'before',
      class: 'header-anchor-link',
      symbol: ''
    }),
    tabIndex: false
  });
  const footnoteIndexMap = {};
  let footnoteCounter = 0;

  // custom footnote
  md.renderer.rules.footnote_block_open = () => '<section class="footnotes">\n' + '<h1 class="footnotes-title">Reference</h1>\n' + '<ol class="footnotes-list">\n';
  md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
    const id = tokens[idx].meta.id;
    const footnoteContent = getFootnoteContent(env, id);
    if (footnoteIndexMap[footnoteContent] === undefined) {
      footnoteCounter++;
      footnoteIndexMap[footnoteContent] = footnoteCounter;
    }
    const footnoteId = footnoteIndexMap[footnoteContent];
    return `<sup class="footnote-ref"><a href="#fn${footnoteId}" id="fnref${footnoteId}">${footnoteId}</a></sup>`;
  };
  md.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
    const id = tokens[idx].meta.id;
    const footnoteContent = getFootnoteContent(env, id);
    const footnoteId = footnoteIndexMap[footnoteContent];
    return `<li id="fn${footnoteId}" class="footnote-item">`;
  };

  // docIdは複数のコメントが1ページに指定されたときに脚注のリンク先が重複しないように指定する
  // 1ページの中で重複しなければ問題ないため、ごく短いランダムな文字列とする
  // - https://github.com/zenn-dev/zenn-community/issues/356
  // - https://github.com/markdown-it/markdown-it-footnote/pull/8
  // const docId = crypto.randomBytes(2).toString('hex');
  return md.render(text);
};
console.log('markdownToHtml');
let text = 
  `This is a test for footnote[^1]. 
  [^1]: This is a sample footnote.`;
console.log(markdownToHtml(text))
var _default = markdownToHtml;
exports.default = _default;