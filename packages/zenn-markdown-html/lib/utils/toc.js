"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToc = parseToc;
var cheerio = _interopRequireWildcard(require("cheerio"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function parseToc(html) {
  const $ = cheerio.load(html);
  const headings = $('body > h1, body > h2, body > h3').toArray();
  const headingsToc = headings.map(heading => ({
    level: parseInt(heading.name.slice(1), 10),
    // eslint-disable-next-line no-control-regex
    text: $(heading).text().replace(/\x08/g, '').trim(),
    id: heading.attribs.id,
    children: []
  }));

  // 先頭に出現したHeadingタグは最上位の階層とする
  // 以降に出現したHeadingタグは、最上位の階層の最後のHeadingタグのレベルと比較して同じか大きければ末尾に追加、
  // 小さい場合は一つ下の階層で同様の判定を行う。最下位の階層の最後のHeadingタグのレベルよりも低い場合は、さらに下の階層に追加する。
  return headingsToc.reduce((acc, current) => {
    let array = acc; // current TOC を投入するターゲットとなる配列。トップレベルから初めて条件を満たすたびにネストする
    do {
      if (array.length === 0 || array[array.length - 1].level >= current.level) {
        // ターゲット配列が空（最初のheadings）のときはcurrentを先頭に追加
        // ターゲット配列の末尾レベルがcurrentと比べて同じか大きければarrayの末尾に追加
        break;
      }

      // それ以外の場合は走査するarrayを末尾のchildrenにする
      array = array[array.length - 1].children;

      // eslint-disable-next-line no-constant-condition
    } while (true);
    array.push(current);
    return acc;
  }, []);
}