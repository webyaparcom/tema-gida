// Find the page with `modulestatus.page` set to true
var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var modulexmenulistactive = true;
var backhtml = "";
if (pagesettingjson) {
  // Iterate over the relevant data to create HTML content
  for (var iterator of webmakerdata[pagesettingjson.path].data) {
    if (iterator.status == "play" && iterator.category == "") {
      if (page.path == iterator.path) {
        backhtml += `<a class="modulex-menulistactive" href="${wxLangInternalHref(
          iterator.path,
        )}">${iterator.name[json.lang]}</a>`;
        modulexmenulistactive = false;
      } else {
        backhtml += `<a href="${wxLangInternalHref(iterator.pathnext || iterator.path)}">${
          iterator.name[json.lang]
        }</a>`;
      }
    }
  }
  if (modulexmenulistactive == true) {
    backhtml =
      `<a class="modulex-menulistactive" href="${wxLangInternalHref('')}">@home@ </a>` +
      backhtml;
  } else {
    backhtml = `<a href="${wxLangInternalHref('')}">@home@ </a>` + backhtml;
  }
  html = html.replace(new RegExp("{{html}}", "g"), backhtml);
}
/* G3 bulgusu (30 Eki 2026): "/slug" ile baslayan IC baglanti dil onekiyle cozulur ("/tr/slug/");
   dis baglanti, "#", "//" ve zaten "/tr/..." ile baslayan yollar aynen kalir. "#kesit" ve "?sorgu" korunur. */
function menuEt3Href(url) {
  var u = url == null ? "" : String(url).trim();
  if (!/^\/(?!\/)/.test(u) || /^\/(tr|en|ar|de|fr|ru|es|it|nl)(\/|$|[?#])/.test(u)) {
    return u || "#";
  }
  var tail = "";
  var cut = u.search(/[?#]/);
  if (cut > -1) {
    tail = u.slice(cut);
    u = u.slice(0, cut);
  }
  return wxLangInternalHref(u.replace(/^\/+/, "").replace(/\/+$/, "")) + tail;
}
/* toplinks: desing pipe listesi "Ad|url|Ad|url" -> <a> listesi */
function menuEt3BuildTopLinks(raw, lang) {
  var out = "";
  if (!raw) {
    return out;
  }
  var value = (raw != null && typeof raw === "object" && raw[lang] !== undefined) ? raw[lang] : raw;
  var parts = String(value).split("|");
  for (var ti = 0; ti + 1 < parts.length; ti += 2) {
    out += '<a href="' + menuEt3Href(parts[ti + 1]) + '">' + parts[ti] + "</a>";
  }
  return out;
}
html = html.replace(new RegExp("{{toplinks}}", "g"), menuEt3BuildTopLinks(json.desing.toplinks, json.lang));

/* categoryhtml: data[] kategori agaci -> dropdown <li> listesi
   item: { name: {tr,en}, url, children: [{ name, url }] } */
var categoryhtml = "";
if (json.data && json.data.length) {
  for (var ci = 0; ci < json.data.length; ci++) {
    var cat = json.data[ci];
    var catName = (cat.name && cat.name[json.lang]) || "";
    var catUrl = menuEt3Href(cat.url);
    if (cat.children && cat.children.length) {
      categoryhtml += '<li class="modulex-has-submenu"><a href="' + catUrl + '">' + catName + '</a><ul class="modulex-submenu">';
      for (var si = 0; si < cat.children.length; si++) {
        var sub = cat.children[si];
        var subName = (sub.name && sub.name[json.lang]) || "";
        categoryhtml += '<li><a href="' + menuEt3Href(sub.url) + '">' + subName + "</a></li>";
      }
      categoryhtml += "</ul></li>";
    } else {
      categoryhtml += '<li><a href="' + catUrl + '">' + catName + "</a></li>";
    }
  }
}
html = html.replace(new RegExp("{{categoryhtml}}", "g"), categoryhtml);

// Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
langhtml = "";
var currentPagePath = (page && typeof page === "object" && page.path !== undefined) ? page.path : "";
for (var key in webmakerdata.setting.langs) {
  if (webmakerdata.setting.langs[key] == true) {
    var langUrl = wxLangHref(key, currentPagePath || "");
    langhtml += `<li><a href="${langUrl}"><img height="25" src="/src/lang/${key}.png" alt="${key}" loading="lazy"></a></li>`;
  }
}
html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
/* G3: statik demo — desing.uyelik === false ise üye giriş / hesap / çıkış öğeleri çizilmez (API yok, üyelik sayfaları kapalı). */
if (json.desing && json.desing.uyelik === false) {
  html = html.replace(/<a [^>]*data-mx-uye-goster[\s\S]*?<\/a>/g, "").replace(/<button [^>]*data-mx-uye-goster[\s\S]*?<\/button>/g, "");
}
