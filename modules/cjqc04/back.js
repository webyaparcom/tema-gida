/* eticaret-urun-vitrin-2 — tema3 Journal grid vitrin (Paket 615).
   Veri: webmakerdata.products (canli katalog) > json.data.products (demo).
   tabMode: desing.tabs[] ile coklu sekme; layout grid (4 kolon desktop). */

function v2Lang(val) {
  if (val == null) {
    return "";
  }
  if (typeof val === "object") {
    if (val[json.lang] != null) {
      return val[json.lang];
    }
    if (val.tr != null) {
      return val.tr;
    }
    var v2Keys = Object.keys(val);
    return v2Keys.length ? (val[v2Keys[0]] || "") : "";
  }
  return String(val);
}

function v2Enrich(p) {
  if (!p || !p.id || p.price != null) {
    return p;
  }
  try {
    var detailPath = "/public/data/proje/" + projePath + "/web/page/" + p.id + "/index.json";
    if (fsSync.existsSync(detailPath)) {
      var detail = JSON.parse(fsSync.readFileSync(detailPath, "utf8"));
      var merged = {};
      for (var k in p) { merged[k] = p[k]; }
      var fields = ["price", "oldPrice", "image", "stock_status", "badges", "url", "rating", "reviewCount"];
      for (var fi = 0; fi < fields.length; fi++) {
        if (merged[fields[fi]] == null && detail[fields[fi]] != null) {
          merged[fields[fi]] = detail[fields[fi]];
        }
      }
      return merged;
    }
  } catch (e) {}
  return p;
}

function v2Money(value) {
  return (Number(value) || 0).toFixed(2);
}

function v2RatingStars(rating) {
  var r = Number(rating);
  if (!isFinite(r) || r <= 0) {
    r = 4.5;
  }
  if (r > 5) {
    r = 5;
  }
  var full = Math.round(r);
  if (full < 1) {
    full = 1;
  }
  var stars = "";
  var si;
  for (si = 0; si < 5; si++) {
    if (si < full) {
      stars += '<span class="material-symbols-outlined" aria-hidden="true">star</span>';
    } else {
      stars += '<span class="material-symbols-outlined" aria-hidden="true" style="font-variation-settings:\'FILL\' 0;opacity:0.35">star</span>';
    }
  }
  return stars;
}

function v2FilterProducts(list, filterKey) {
  var out = [];
  var i;
  for (i = 0; i < list.length; i++) {
    var p = list[i];
    if (!p || p.status === "stop") {
      continue;
    }
    var badges = p.badges || [];
    if (filterKey === "new" && badges.indexOf("new") === -1) {
      continue;
    }
    if (filterKey === "sale" && badges.indexOf("sale") === -1) {
      continue;
    }
    if (filterKey === "loved" && badges.indexOf("new") > -1) {
      continue;
    }
    out.push(p);
  }
  if (out.length === 0) {
    return list.slice();
  }
  return out;
}

function v2BuildCard(p, shownIndex, desing) {
  var pName = v2Lang(p.name);
  if (!pName) {
    return "";
  }
  var badges = p.badges || [];
  var isSoldOut = p.stock_status === "out_of_stock";
  var priceNum = Number(p.price);
  var hasPrice = isFinite(priceNum) && priceNum > 0;
  var oldPriceNum = Number(p.oldPrice);
  var hasOldPrice = hasPrice && isFinite(oldPriceNum) && oldPriceNum > priceNum;
  var pImg = p.image || "";
  var pUrl = p.url || wxLangInternalHref(p.pathnext || p.path || "");
  /* G3 bulgusu (30 Eki 2026): puani olmayan urune uydurma 4,5 yildiz basiliyordu (sahte degerlendirme). Artik yildiz satiri
     yalniz urunun GERCEK rating (>0) degeri varsa cizilir. */
  var ratingVal = Number(p.rating);
  var showRating = desing.showRating !== false && isFinite(ratingVal) && ratingVal > 0;
  var reviewCount = p.reviewCount != null ? p.reviewCount : "";

  var mxAttrs = ' data-mx-id="' + p.id + '"' +
    ' data-mx-name="' + String(pName).replace(/"/g, "&quot;") + '"' +
    ' data-mx-price="' + (hasPrice ? priceNum : 0) + '"' +
    ' data-mx-img="' + pImg + '"' +
    ' data-mx-url="' + pUrl + '"';

  var card = "";
  card += '<article class="modulexVitrin2Card" style="animation-delay:' + (shownIndex * 0.04) + 's" data-category="' + (p.category || "") + '"' + mxAttrs + '>';
  card += '<div class="modulexVitrin2ImgWrap">';
  card += '<a href="' + pUrl + '" class="modulexVitrin2ImgLink" aria-label="' + String(pName).replace(/"/g, "&quot;") + '">';
  if (pImg) {
    card += '<img src="' + pImg + '" alt="' + pName + '" width="400" height="400" loading="lazy" decoding="async" />';
  } else {
    card += '<span class="material-symbols-outlined" aria-hidden="true" style="font-size:48px;opacity:0.4">image</span>';
  }
  card += '<div class="modulexVitrin2Badges">';
  if (badges.indexOf("new") > -1) {
    card += '<span class="modulexVitrin2Badge modulexVitrin2BadgeNew">{{newText}}</span>';
  } else if (badges.indexOf("sale") > -1 && hasOldPrice) {
    card += '<span class="modulexVitrin2Badge modulexVitrin2BadgeSale">{{saleText}}</span>';
  }
  card += "</div></a></div>";
  card += '<div class="modulexVitrin2Body">';
  if (showRating) {
    card += '<div class="modulexVitrin2Rating"><span class="modulexVitrin2Stars">' + v2RatingStars(ratingVal) + "</span>";
    if (reviewCount !== "") {
      card += "<span>(" + reviewCount + ")</span>";
    }
    card += "</div>";
  }
  card += '<a href="' + pUrl + '" class="modulexVitrin2Name">' + pName + "</a>";
  if (hasPrice) {
    card += '<div class="modulexVitrin2PriceRow">';
    if (hasOldPrice) {
      card += '<span class="modulexVitrin2Old">' + v2Money(oldPriceNum) + " &#8378;</span>";
    }
    card += '<span class="modulexVitrin2Price">' + v2Money(priceNum) + " &#8378;</span></div>";
  }
  card += '<button class="modulexVitrin2Cart" onclick="addToCart(\'' + p.id + '\')"' + (isSoldOut ? " disabled" : "") + mxAttrs + ">";
  card += '<span class="material-symbols-outlined" aria-hidden="true">add_shopping_cart</span>';
  card += isSoldOut ? "{{soldOutText}}" : "{{addToCart}}";
  card += "</button></div></article>";
  return card;
}

function v2BuildPanel(products, filterKey, panelIndex, desing) {
  var filtered = v2FilterProducts(products, filterKey);
  var v2Max = parseInt(desing.showCount, 10) || 8;
  var panelHtml = "";
  var shown = 0;
  var i;
  for (i = 0; i < filtered.length && shown < v2Max; i++) {
    var p = v2Enrich(filtered[i]);
    if (!p || p.status === "stop") {
      continue;
    }
    panelHtml += v2BuildCard(p, shown, desing);
    shown++;
  }
  var activeClass = panelIndex === 0 ? " modulexVitrin2PanelActive" : "";
  return '<div class="modulexVitrin2Panel' + activeClass + '" data-vitrin-panel="' + panelIndex + '">' + panelHtml + "</div>";
}

var products = [];
try {
  if (webmakerdata["products"] && Array.isArray(webmakerdata["products"].data) && webmakerdata["products"].data.length > 0) {
    products = webmakerdata["products"].data;
  } else if (json.data && json.data.products) {
    products = json.data.products;
  }
} catch (e) {
  products = [];
}

var desing = json.desing || {};
var tabMode = desing.tabMode === true;
var tabs = Array.isArray(desing.tabs) ? desing.tabs : [];
var tabsHtml = "";
var backhtml = "";

if (tabMode && tabs.length > 0) {
  tabsHtml = '<div class="modulexVitrin2Tabs modulexVitrin2TabsOn" id="vitrin2TabsWrap">';
  var ti;
  for (ti = 0; ti < tabs.length; ti++) {
    var tabLabel = v2Lang(tabs[ti].title || tabs[ti].label || tabs[ti]);
    var tabActive = ti === 0 ? " modulexVitrin2TabActive" : "";
    tabsHtml += '<button type="button" class="modulexVitrin2Tab' + tabActive + '" data-vitrin-tab="' + ti + '">' + tabLabel + "</button>";
  }
  tabsHtml += "</div>";
  for (ti = 0; ti < tabs.length; ti++) {
    var filterKey = tabs[ti].filter || "all";
    backhtml += v2BuildPanel(products, filterKey, ti, desing);
  }
} else {
  var v2MaxSingle = parseInt(desing.showCount, 10) || 20;
  var shownSingle = 0;
  var si;
  for (si = 0; si < products.length && shownSingle < v2MaxSingle; si++) {
    var sp = v2Enrich(products[si]);
    if (!sp || sp.status === "stop") {
      continue;
    }
    backhtml += v2BuildCard(sp, shownSingle, desing);
    shownSingle++;
  }
}

html = html.replace(/\{\{tabsHtml\}\}/g, tabsHtml);
html = html.replace(/\{\{html\}\}/g, backhtml);
