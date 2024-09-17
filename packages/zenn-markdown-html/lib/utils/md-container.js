"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerRightOptions = exports.containerMessageOptions = exports.containerLeftOptions = exports.containerDetailsOptions = void 0;
exports.footNoteFooker = footNoteFooker;
var _utils = require("markdown-it/lib/common/utils");
// containers
// ref: https://github.com/markdown-it/markdown-it-container

// ::: details Detail
//   summary comes here
// :::
const containerDetailsOptions = {
  validate: function (params) {
    return /^details\s+(.*)$/.test(params.trim());
  },
  render: function (tokens, idx) {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    const summary = (m === null || m === void 0 ? void 0 : m[1]) || '';
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + (0, _utils.escapeHtml)(summary) + '</summary><div class="details-content">';
    } else {
      // closing tag
      return '</div></details>\n';
    }
  }
};
// ::: message alert
//   text
// :::
exports.containerDetailsOptions = containerDetailsOptions;
const msgClassRegex = /^message\s*(alert)?$/;
const containerMessageOptions = {
  validate: function (params) {
    return msgClassRegex.test(params.trim());
  },
  render: function (tokens, idx) {
    const m = tokens[idx].info.trim().match(msgClassRegex);
    const messageName = (m === null || m === void 0 ? void 0 : m[1]) === 'alert' ? 'alert' : 'message';
    if (tokens[idx].nesting === 1) {
      // opening tag
      const symbol = `<span class="msg-symbol">!</span>`;
      return `<aside class="msg ${messageName}">${symbol}<div class="msg-content">`;
    } else {
      // closing tag
      return `</div></aside>\n`;
    }
  }
};

// left コンテナの設定
exports.containerMessageOptions = containerMessageOptions;
const containerLeftOptions = {
  validate: function (params) {
    return params.trim() === 'left';
  },
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return '<div class="container-left">';
    } else {
      return '</div>\n';
    }
  }
};

// right コンテナの設定
exports.containerLeftOptions = containerLeftOptions;
const containerRightOptions = {
  validate: function (params) {
    return params.trim() === 'right';
  },
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return '<div class="container-right">';
    } else {
      return '</div>\n';
    }
  }
};
exports.containerRightOptions = containerRightOptions;
function footNoteFooker(md) {
  const footnoteRefsCount = {};
  md.renderer.rules.footnote_ref = function (tokens, idx, options, env, self) {
    const id = tokens[idx].meta.id;
    if (!footnoteRefsCount[id]) {
      footnoteRefsCount[id] = 1;
    } else {
      footnoteRefsCount[id]++;
    }
    const token = tokens[idx];
    const footnoteId = id + 1;
    const refId = `fnref${footnoteId}:${footnoteRefsCount[id]}`;
    const footnoteHref = `#fn${footnoteId}`;
    token.attrs = [['href', footnoteHref], ['id', refId], ['class', 'footnote-ref']];
    return `<sup class="footnote-ref"><a href="${footnoteHref}" id="${refId}">${footnoteId}</a></sup>`;
  };
  const originalFootnoteBlock = md.renderer.rules.footnote_block;
  md.renderer.rules.footnote_block = function (tokens, idx, options, env, self) {
    return originalFootnoteBlock(tokens, idx, options, env, self);
  };
}