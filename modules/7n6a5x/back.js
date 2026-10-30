/* urun-etiket — gida urun etiketi karti (TGK; Webyapar tema seti G2, 30 Eki 2026).
   Veri json.data (tek urun nesnesi). Tum metin SUNUCUDA render dilinde cozulur; istemci yalniz «yazdir» dugmesini baglar.
   Alerjenler icindekiler metninde dile ozgu terim eslesmesiyle <strong> yapilir (escape SONRASI → XSS guvenli). */
var ueLang = json.lang || "tr";
var ueD = json.desing || {};
var ueData = json.data && typeof json.data === "object" && !Array.isArray(json.data) ? json.data : {};

function ueEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/\{\{/g, "&#123;&#123;");
}
function uePick(v) { return wmPickLang(v, ueLang); }
function ueL(key) { return uePick(ueD[key]); }
function ueCogul(tablo, n) {
  var f = tablo && (tablo[ueLang] || tablo.tr || tablo.en);
  if (!f) { return String(n); }
  var kat = "other";
  try { kat = new Intl.PluralRules(ueLang).select(n); } catch (e) { kat = n === 1 ? "one" : "other"; }
  if (n === 0 && f.zero !== undefined) { kat = "zero"; }
  var m = f[kat] !== undefined ? f[kat] : f.other;
  return String(m === undefined ? "" : m).replace(/\{n\}/g, String(n));
}
function ueRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

var ueNum = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
var ueDate = null;
try { ueDate = new Intl.DateTimeFormat(ueLang + "-u-nu-latn-ca-gregory", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }); } catch (e) { ueDate = null; }

/* Alerjen terimleri (render dilinde) → icindekilerde kalin */
var ueAllergens = [];
var ueRaw = Array.isArray(ueData.allergens) ? ueData.allergens : [];
for (var ai = 0; ai < ueRaw.length; ai++) {
  var at = uePick(ueRaw[ai]).trim();
  if (at && ueAllergens.indexOf(at) === -1) { ueAllergens.push(at); }
}

var ueIngr = ueEsc(uePick(ueData.ingredients));
if (ueAllergens.length && ueIngr) {
  var ueTerms = ueAllergens.slice().sort(function (a, b) { return b.length - a.length; }).map(function (t) { return ueRe(ueEsc(t)); });
  ueIngr = ueIngr.replace(new RegExp("(" + ueTerms.join("|") + ")", "gi"), function (m) { return "<strong>" + m + "</strong>"; });
}

function ueRow(labelKey, valueHtml) {
  return valueHtml ? '<div class="modulex-ue-row"><dt>' + ueEsc(ueL(labelKey)) + "</dt><dd>" + valueHtml + "</dd></div>" : "";
}

/* Genel bilgi satirlari */
var ueInfo = "";
ueInfo += ueRow("ingredientsLabel", ueIngr);
var ueExpiry = "";
if (ueData.expiry) {
  var ued = new Date(String(ueData.expiry));
  ueExpiry = !isNaN(ued.getTime()) && ueDate ? '<bdi>' + ueEsc(ueDate.format(ued)) + "</bdi>" : ueEsc(ueData.expiry);
} else if (ueData.bestBefore) {
  ueExpiry = ueEsc(uePick(ueData.bestBefore));
}
ueInfo += ueRow("expiryLabel", ueExpiry);
ueInfo += ueRow("storageLabel", ueEsc(uePick(ueData.storage)));
ueInfo += ueRow("producerLabel", ueEsc(uePick(ueData.producer)));
ueInfo += ueRow("regLabel", ueData.registrationNo ? '<bdi dir="ltr" class="modulex-ue-code">' + ueEsc(ueData.registrationNo) + "</bdi>" : "");

/* Alerjen uyari kutusu: sayi cogul formuyla; liste kalin */
var ueAllergenHtml;
if (ueAllergens.length) {
  ueAllergenHtml = '<div class="modulex-ue-warn" role="note"><span class="material-symbols-outlined" aria-hidden="true">warning</span><div><p class="modulex-ue-warnt">' +
    ueEsc(ueCogul(ueD.allergenCount, ueAllergens.length)) + '</p><p class="modulex-ue-warnl">';
  for (var wi = 0; wi < ueAllergens.length; wi++) {
    ueAllergenHtml += '<strong class="modulex-ue-chip">' + ueEsc(ueAllergens[wi]) + "</strong>";
  }
  ueAllergenHtml += "</p></div></div>";
} else {
  ueAllergenHtml = '<p class="modulex-ue-ok"><span class="material-symbols-outlined" aria-hidden="true">check_circle</span>' + ueEsc(ueL("noAllergen")) + "</p>";
}

/* Besin tablosu */
var ueNut = Array.isArray(ueData.nutrition) ? ueData.nutrition : [];
var ueTable = "";
if (ueNut.length) {
  ueTable = '<table class="modulex-ue-table"><caption class="modulex-ue-vh">' + ueEsc(ueL("tableCaption")) + "</caption>" +
    '<thead><tr><th scope="col">' + ueEsc(ueL("nutrientCol")) + '</th><th scope="col" class="modulex-ue-num">' + ueEsc(ueL("per100Col")) + "</th></tr></thead><tbody>";
  for (var ni = 0; ni < ueNut.length; ni++) {
    var nr = ueNut[ni] || {};
    var nv = Number(nr.per100);
    ueTable += '<tr' + (nr.sub ? ' class="modulex-ue-sub"' : "") + '><th scope="row">' + ueEsc(uePick(nr.k)) + '</th><td class="modulex-ue-num"><bdi dir="ltr">' +
      (isFinite(nv) ? ueEsc(ueNum.format(nv)) : ueEsc(nr.per100)) + (nr.unit ? " " + ueEsc(nr.unit) : "") + "</bdi></td></tr>";
  }
  ueTable += "</tbody></table>";
}
var ueServ = Number(ueData.servings);
var ueServHtml = isFinite(ueServ) && ueServ > 0 ? '<p class="modulex-ue-serv">' + ueEsc(ueCogul(ueD.servings, ueServ)) + "</p>" : "";

var ueShowPrint = !(ueD.showPrint === false || String(ueD.showPrint).toLowerCase() === "false");
var ueNote = ueData.note ? '<p class="modulex-ue-note">' + ueEsc(uePick(ueData.note)) + "</p>" : "";

function ueSet(re, val) { html = html.replace(re, function () { return val; }); }
ueSet(/\{\{ueName\}\}/g, ueEsc(uePick(ueData.name)));
ueSet(/\{\{ueNet\}\}/g, ueData.netAmount ? '<span class="modulex-ue-net"><span>' + ueEsc(ueL("netLabel")) + ':</span> <bdi dir="ltr">' + ueEsc(ueData.netAmount) + "</bdi></span>" : "");
ueSet(/\{\{ueInfo\}\}/g, ueInfo);
ueSet(/\{\{ueAllergen\}\}/g, ueAllergenHtml);
ueSet(/\{\{ueTable\}\}/g, ueTable);
ueSet(/\{\{ueServ\}\}/g, ueServHtml);
ueSet(/\{\{ueNote\}\}/g, ueNote);
ueSet(/\{\{uePrint\}\}/g, ueShowPrint ? '<button type="button" class="modulex-ue-print" data-ue-print><span class="material-symbols-outlined" aria-hidden="true">print</span>' + ueEsc(ueL("printLabel")) + "</button>" : "");
