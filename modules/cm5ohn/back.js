var categoryHtml = "";
var categories = [];
try {
  /* Oncelik canli katalog: proje products.json varsa kategoriler oradan turetilir;
     yoksa modul demo verisi (json.data.categories) kullanilir. */
  if (webmakerdata.products && Array.isArray(webmakerdata.products.data) && webmakerdata.products.data.length > 0) {
    /* Kategorileri urun katalogundan otomatik turet (slug + adet) */
    var mxCatMap = {};
    var mxCatOrder = [];
    for (var pi = 0; pi < webmakerdata.products.data.length; pi++) {
      var mxProd = webmakerdata.products.data[pi];
      if (!mxProd || mxProd.status !== "play" || !mxProd.category) {
        continue;
      }
      if (!mxCatMap[mxProd.category]) {
        mxCatMap[mxProd.category] = 0;
        mxCatOrder.push(mxProd.category);
      }
      mxCatMap[mxProd.category]++;
    }
    /* Etiket: kategori sayfasi varsa adi, yoksa slug bas harfi buyuk */
    for (var ci = 0; ci < mxCatOrder.length; ci++) {
      var mxSlug = mxCatOrder[ci];
      var mxLabel = mxSlug.charAt(0).toUpperCase() + mxSlug.slice(1);
      var mxLabelObj = {};
      mxLabelObj[json.lang] = mxLabel;
      categories.push({ slug: mxSlug, name: mxLabelObj, count: mxCatMap[mxSlug] });
    }
  }
  if (categories.length === 0 && json.data && json.data.categories) {
    categories = json.data.categories;
  }
} catch(e) { categories = []; }

categoryHtml += '<label class="modulexFilterItem">';
categoryHtml += '<input type="checkbox" name="category" value="all" onchange="applyFilters()" checked />';
categoryHtml += '<span>{{allCategories}}</span>';
categoryHtml += '</label>';

for (var i = 0; i < categories.length; i++) {
  var c = categories[i];
  var cName = (c.name && c.name[json.lang]) ? c.name[json.lang] : "";
  categoryHtml += '<label class="modulexFilterItem">';
  categoryHtml += '<input type="checkbox" name="category" value="' + c.slug + '" onchange="applyFilters()" />';
  categoryHtml += '<span>' + cName + ' (' + (c.count || 0) + ')</span>';
  categoryHtml += '</label>';
}

html = html.replace(new RegExp("\\{\\{categoryHtml\\}\\}", "g"), categoryHtml);

var priceHtml = "";
var priceRanges = [];
try {
  if (json.data && json.data.priceRanges) {
    priceRanges = json.data.priceRanges;
  }
} catch(e) { priceRanges = []; }

priceHtml += '<label class="modulexFilterItem">';
priceHtml += '<input type="radio" name="price" value="all" onchange="applyFilters()" checked />';
priceHtml += '<span>{{allCategories}}</span>';
priceHtml += '</label>';

for (var i = 0; i < priceRanges.length; i++) {
  var r = priceRanges[i];
  var rLabel = (r.label && r.label[json.lang]) ? r.label[json.lang] : "";
  var rValue = r.min + "-" + (r.max === null ? "null" : r.max);
  priceHtml += '<label class="modulexFilterItem">';
  priceHtml += '<input type="radio" name="price" value="' + rValue + '" onchange="applyFilters()" />';
  priceHtml += '<span>' + rLabel + '</span>';
  priceHtml += '</label>';
}

html = html.replace(new RegExp("\\{\\{priceHtml\\}\\}", "g"), priceHtml);

/* ---- Opt-in arama + siralama + ?q=&cat=&sort= URL durumu (desing.search / desing.sort / desing.urlState; varsayilan KAPALI) ----
   Acikken: eski satir ici applyFilters/clearAllFilters baglari kaldirilir (eski kod yalniz kendi .modulexCard'ini suzer ve
   sayfadaki vitrin kartlarini zaten gormez — modulex soneki modul basina farklidir), suzmeyi istemci betigi
   ham mx-filtre.js ile vitrin kartlarinin data-* niteliklerinden ([data-mx-id][data-category]) yapar. */
function kfTrue(v) { return v === true || String(v).toLowerCase() === "true"; }
var kfD = json.desing || {};
var kfSearch = kfTrue(kfD.search);
var kfSort = kfTrue(kfD.sort);
var kfEnh = kfSearch || kfSort || kfTrue(kfD.urlState);
var kfRoot = "";
var kfSearchHtml = "";
var kfSortHtml = "";
if (kfEnh) {
  html = html.replace(/ onchange="applyFilters\(\)"/g, "")
    .replace(/ onclick="clearAllFilters\(\)"/g, " data-kf-reset")
    .replace(/value="in_stock"( \/>| checked \/>)/g, 'value="in_stock" />')
    .replace(/value="out_of_stock"( \/>| checked \/>)/g, 'value="out_of_stock" />');
  kfRoot = ' id="modulex-kf-{{id}}" data-kf-enh="1" data-kf-rc="' + String(wmPickLang(kfD.resultCount, json.lang)).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;") + '"';
  if (kfSearch) {
    kfSearchHtml = '<div class="modulexFilterSection"><label class="modulexKfSearch"><span class="modulexKfVh">{{searchLabel}}</span>' +
      '<span class="material-symbols-outlined" aria-hidden="true">search</span>' +
      '<input type="search" data-kf-q placeholder="{{searchPlaceholder}}" autocomplete="off" /></label></div>';
  }
  if (kfSort) {
    kfSortHtml = '<div class="modulexFilterSection"><label class="modulexKfSortBox"><span class="modulexKfSortLabel">{{sortLabel}}</span>' +
      '<select class="modulexKfSortSel" data-kf-sort><option value="">{{sortDefault}}</option>' +
      '<option value="priceAsc">{{sortPriceAsc}}</option><option value="priceDesc">{{sortPriceDesc}}</option>' +
      '<option value="new">{{sortNew}}</option></select></label></div>';
  }
}
html = html.replace(/\{\{kfRoot\}\}/g, function () { return kfRoot; });
html = html.replace(/\{\{kfSearch\}\}/g, function () { return kfSearchHtml; });
html = html.replace(/\{\{kfSort\}\}/g, function () { return kfSortHtml; });
