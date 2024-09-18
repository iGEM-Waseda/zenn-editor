"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerRightOptions = exports.containerLeftOptions = exports.containerColumnsOptions = exports.containerCOptions = exports.containerMessageOptions = exports.containerDetailsOptions = void 0;
var utils_1 = require("markdown-it/lib/common/utils");
// containers
// ref: https://github.com/markdown-it/markdown-it-container
// ::: details Detail
//   summary comes here
// :::
exports.containerDetailsOptions = {
    validate: function (params) {
        return /^details\s+(.*)$/.test(params.trim());
    },
    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
        var summary = (m === null || m === void 0 ? void 0 : m[1]) || '';
        if (tokens[idx].nesting === 1) {
            // opening tag
            return ('<details><summary>' +
                (0, utils_1.escapeHtml)(summary) +
                '</summary><div class="details-content">');
        }
        else {
            // closing tag
            return '</div></details>\n';
        }
    },
};
// ::: message alert
//   text
// :::
var msgClassRegex = /^message\s*(alert)?$/;
exports.containerMessageOptions = {
    validate: function (params) {
        return msgClassRegex.test(params.trim());
    },
    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(msgClassRegex);
        var messageName = (m === null || m === void 0 ? void 0 : m[1]) === 'alert' ? 'alert' : 'message';
        if (tokens[idx].nesting === 1) {
            // opening tag
            var symbol = "<span class=\"msg-symbol\">!</span>";
            return "<aside class=\"msg ".concat(messageName, "\">").concat(symbol, "<div class=\"msg-content\">");
        }
        else {
            // closing tag
            return "</div></aside>\n";
        }
    },
};
// ::: c 
//   content goes here
// :::
exports.containerCOptions = {
    validate: function (params) {
        return /^c\s*$/.test(params.trim());
    },
    render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
            // opening tag
            return "<div class=\"fig-table-caption\">";
        }
        else {
            // closing tag
            return "</div>\n";
        }
    },
};
// ::: columns
//   ::: left
//     Content on the left side.
//   :::
//   ::: right
//     Content on the right side.
//   :::
// :::
// columns コンテナの設定
exports.containerColumnsOptions = {
    validate: function (params) {
        return params.trim() === 'columns';
    },
    render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<div class="container-columns">';
        }
        else {
            // closing tag
            return '</div>\n';
        }
    },
};
// left コンテナの設定
exports.containerLeftOptions = {
    validate: function (params) {
        return params.trim() === 'left';
    },
    render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
            return '<div class="container-left">';
        }
        else {
            return '</div>\n';
        }
    },
};
// right コンテナの設定
exports.containerRightOptions = {
    validate: function (params) {
        return params.trim() === 'right';
    },
    render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
            return '<div class="container-right">';
        }
        else {
            return '</div>\n';
        }
    },
};
