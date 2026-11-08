// Contact 6 back.js
// badge/title/description: moduleRender desing dongusunde dil cozumlemesiyle otomatik yerlestirilir.

/* servicesHtml: desing.services pipe listesi "deger|Etiket|deger|Etiket" -> <option> listesi.
   Ilk secenek desing.servicePlaceholder ile bos value olarak eklenir. */
var contact6Services = "";
var contact6Placeholder = (json.desing.servicePlaceholder && json.desing.servicePlaceholder[json.lang]) || json.desing.servicePlaceholder || "";
contact6Services += '<option value="">' + contact6Placeholder + "</option>";
var contact6Raw = (json.desing.services && json.desing.services[json.lang]) || json.desing.services || "";
var contact6Parts = String(contact6Raw).split("|");
for (var c6i = 0; c6i + 1 < contact6Parts.length; c6i += 2) {
  contact6Services += '<option value="' + contact6Parts[c6i] + '">' + contact6Parts[c6i + 1] + "</option>";
}
html = html.replace(new RegExp("{{servicesHtml}}", "g"), contact6Services);

/* formAttrs: desing.formAction (gercek uc) varsa POST; yoksa statik mailto kipi (index.html betigi). Metin kacisli. */
var contact6Esc = function (t) {
  return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
};
var contact6Action = String((json.desing && json.desing.formAction) || "").trim();
var contact6Attrs = "";
if (contact6Action) {
  contact6Attrs = ' action="' + contact6Esc(contact6Action) + '" method="POST"';
} else {
  contact6Attrs = ' data-c6-mailto="' + contact6Esc(json.desing.email || "") + '" data-c6-subject="' + contact6Esc((json.desing.title && json.desing.title[json.lang]) || json.desing.title || "") + '"';
}
html = html.replace(/\{\{formAttrs\}\}/g, function () { return contact6Attrs; });
