/* galeri-masonry-2 — Galeri — Hizalı Satırlar (1 Kas 2026, T1-B varyant).
   Yer tutucular: gj2head gj2items gj2empty. Veri: json.data[] = [{img, thumb?, title{}, alt{}, w, h}]; oran = w/h → --gj2-r.
   Ortak yardımcılar: esc t guvenliHref gorselYol evet sayi metinleriYaz (desing metinleri kaçışlı). */
var D = json.desing || {};
var L = json.lang || "tr";

/* HTML kaçışı — html'e giden her değer bundan geçer */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* Dil seçimi: aktif dil → tr → en → ilk anahtar (motorun wmPickLang'i) */
function t(v) { return wmPickLang(v, L); }
/* Bağlantı: dış/mailto/tel/# aynen; iç sayfa adı → dil önekli yol; javascript: vb. reddedilir */
function guvenliHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}
/* Görsel yolu: "/" ve http(s) aynen; yalın ad → /img/<ad>; tehlikeli şema → "" */
function gorselYol(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function evet(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
function sayi(v, d, mn, mx) {
  var n = parseInt(v, 10);
  if (!isFinite(n)) { n = d; }
  return Math.min(mx, Math.max(mn, n));
}
/* desing'deki düz metin / {tr,en,ar} değerlerini {{anahtar}} yerine KAÇIŞLI yazar.
   Motor aynı yer tutucuyu ham yazardı; back.js önce davrandığı için kaçışsız değer html'e ulaşmaz. */
function metinleriYaz() {
  var k;
  for (k in D) {
    if (!Object.prototype.hasOwnProperty.call(D, k)) { continue; }
    var v = D[k];
    if (v == null) { continue; }
    var dilli = typeof v === "object" && !Array.isArray(v) && (typeof v.tr === "string" || typeof v.en === "string");
    if (typeof v === "object" && !dilli) { continue; }
    var deger = esc(t(v));
    var desen = new RegExp("\\{\\{" + String(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\}\\}", "g");
    html = html.replace(desen, function () { return deger; });
  }
}

var gj2Items = Array.isArray(json.data) ? json.data : [];
var gj2Open = t(D.openLabel);
function gj2Dim(v, d) { var n = parseInt(v, 10); return isFinite(n) && n > 0 && n < 20000 ? n : d; }

var gj2Html = "";
var gj2i;
for (gj2i = 0; gj2i < gj2Items.length; gj2i++) {
  var it = gj2Items[gj2i] || {};
  var w = gj2Dim(it.w, 1200);
  var h = gj2Dim(it.h, 800);
  var oran = Math.round((w / h) * 1000) / 1000;
  var title = t(it.title);
  var alt = t(it.alt) || title;
  var full = gorselYol(it.img);
  var thumb = gorselYol(it.thumb) || full;
  var ic;
  if (thumb) {
    ic = '<img class="modulex-gj2-img" src="' + esc(thumb) + '" alt="' + esc(alt) + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async" />';
  } else {
    ic = '<span class="modulex-gj2-ph" role="img" aria-label="' + esc(alt) + '"><span class="material-symbols-outlined" aria-hidden="true">image</span></span>';
  }
  var govde = full
    ? '<a class="modulex-gj2-link" href="' + esc(full) + '" data-gj2-src="' + esc(full) + '" data-gj2-alt="' + esc(alt) + '" data-gj2-title="' + esc(title) +
      '" aria-haspopup="dialog" aria-label="' + esc((gj2Open ? gj2Open + ": " : "") + alt) + '">' + ic + "</a>"
    : '<div class="modulex-gj2-link">' + ic + "</div>";
  gj2Html += '<li class="modulex-gj2-item" style="--gj2-r:' + oran + '">' + govde + "</li>";
}
var gj2Empty = gj2Items.length ? "" : '<p class="modulex-gj2-bos">' + esc(t(D.emptyText)) + "</p>";
var gj2Head = (t(D.title) || t(D.description))
  ? '<header class="modulex-gj2-head">' + (t(D.title) ? '<h2 class="modulex-gj2-title">' + esc(t(D.title)) + "</h2>" : "") +
    (t(D.description) ? '<p class="modulex-gj2-desc">' + esc(t(D.description)) + "</p>" : "") + "</header>"
  : "";

html = html.replace(/\{\{gj2head\}\}/g, function () { return gj2Head; });
html = html.replace(/\{\{gj2items\}\}/g, function () { return gj2Html; });
html = html.replace(/\{\{gj2empty\}\}/g, function () { return gj2Empty; });
metinleriYaz();
