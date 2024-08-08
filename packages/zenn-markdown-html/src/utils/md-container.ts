import { escapeHtml } from 'markdown-it/lib/common/utils';
import type Token from 'markdown-it/lib/token';

// containers
// ref: https://github.com/markdown-it/markdown-it-container

// ::: details Detail
//   summary comes here
// :::
export const containerDetailsOptions = {
  validate: function (params: string) {
    return /^details\s+(.*)$/.test(params.trim());
  },
  render: function (tokens: Token[], idx: number) {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    const summary = m?.[1] || '';
    if (tokens[idx].nesting === 1) {
      // opening tag
      return (
        '<details><summary>' +
        escapeHtml(summary) +
        '</summary><div class="details-content">'
      );
    } else {
      // closing tag
      return '</div></details>\n';
    }
  },
};
// ::: message alert
//   text
// :::
const msgClassRegex = /^message\s*(alert)?$/;

export const containerMessageOptions = {
  validate: function (params: string) {
    return msgClassRegex.test(params.trim());
  },
  render: function (tokens: Token[], idx: number) {
    const m = tokens[idx].info.trim().match(msgClassRegex);
    const messageName = m?.[1] === 'alert' ? 'alert' : 'message';

    if (tokens[idx].nesting === 1) {
      // opening tag
      const symbol = `<span class="msg-symbol">!</span>`;
      return `<aside class="msg ${messageName}">${symbol}<div class="msg-content">`;
    } else {
      // closing tag
      return `</div></aside>\n`;
    }
  },
};


// left コンテナの設定
export const containerLeftOptions = {
  validate: function (params: string) {
    return params.trim() === 'left';
  },
  render: function (tokens: Token[], idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="container-left">';
    } else {
      return '</div>\n';
    }
  },
};

// right コンテナの設定
export const containerRightOptions = {
  validate: function (params: string) {
    return params.trim() === 'right';
  },
  render: function (tokens: Token[], idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="container-right">';
    } else {
      return '</div>\n';
    }
  },
};

// parent コンテナの設定
export const containerParentOptions = {
  validate: function (params: string) {
    return params.trim() === 'parent';
  },
  render: function (tokens: Token[], idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="container-parent">';
    } else {
      return '</div>\n';
    }
  },
};
