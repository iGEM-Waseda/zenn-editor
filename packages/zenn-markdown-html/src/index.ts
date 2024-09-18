import markdownIt from 'markdown-it';
import { embedGenerators } from './embed';
import { MarkdownOptions } from './types';

// plugis
import markdownItImSize from '@steelydylan/markdown-it-imsize';
import markdownItAnchor from 'markdown-it-anchor';
import { mdBr } from './utils/md-br';
import { mdKatex } from './utils/md-katex';
import { mdCustomBlock } from './utils/md-custom-block';
import { mdLinkAttributes } from './utils/md-link-attributes';
import { mdLinkifyToCard } from './utils/md-linkify-to-card';
import { mdRendererFence } from './utils/md-renderer-fence';
import {
  containerDetailsOptions,
  containerMessageOptions,
  containerLeftOptions,
  containerRightOptions,
} from './utils/md-container';

const mdContainer = require('markdown-it-container');
const mdFootnote = require('markdown-it-footnote');
const mdTaskLists = require('markdown-it-task-lists');
const mdInlineComments = require('markdown-it-inline-comments');

interface FootnoteEnv {
  footnotes?: {
    refs?: { [key: string]: any };
    list?: any[];
  };
}

function getFootnoteContent(env: FootnoteEnv, id: number): string {
  const ref = env.footnotes?.refs?.[id];
  return ref ? ref.content : '';
}

const markdownToHtml = (text: string, options?: MarkdownOptions): string => {
  if (!(text && text.length)) return '';

  const markdownOptions: MarkdownOptions = {
    ...options,
    customEmbed: {
      ...embedGenerators,
      ...options?.customEmbed,
    },
  };

  const md = markdownIt({ breaks: true, linkify: true });

  md.linkify.set({ fuzzyLink: false });
  
  md.use(mdBr)
    .use(mdKatex)
    .use(mdFootnote)
    .use(mdInlineComments)
    .use(markdownItImSize)
    .use(mdLinkAttributes)
    .use(mdCustomBlock, markdownOptions)
    .use(mdRendererFence, markdownOptions)
    .use(mdLinkifyToCard, markdownOptions)
    .use(mdTaskLists, { enabled: true })
    .use(mdContainer, 'details', containerDetailsOptions)
    .use(mdContainer, 'message', containerMessageOptions)
    .use(mdContainer, 'left', containerLeftOptions)
    .use(mdContainer, 'right', containerRightOptions)
    .use(markdownItAnchor, {
      level: [1, 2, 3, 4],
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'before',
        class: 'header-anchor-link',
        symbol: '',
      }),
      tabIndex: false,
    });
  
  const footnoteIndexMap: { [content: string]: number } = {};
  let footnoteCounter = 0;

  // custom footnote
  md.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' +
    '<H1 class="footnotes-title">Reference</H1>\n' +
    '<ol class="footnotes-list">\n';
  
  md.renderer.rules.footnote_ref = (tokens, idx, options, env: FootnoteEnv, slf) => {
    const id = tokens[idx].meta.id;
    const footnoteContent = getFootnoteContent(env, id);
    if (footnoteIndexMap[footnoteContent] === undefined) {
      footnoteCounter++;
      footnoteIndexMap[footnoteContent] = footnoteCounter;
    }
  
    const footnoteId = footnoteIndexMap[footnoteContent];
  
    return `<sup class="footnote-ref"><a href="#fn${footnoteId}" id="fnref${footnoteId}">${footnoteId}</a></sup>`;
  };

  md.renderer.rules.footnote_open = (tokens, idx, options, env: FootnoteEnv, slf) => {
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

export default markdownToHtml;
export { markdownToSimpleHtml } from './markdown-to-simple-html';
