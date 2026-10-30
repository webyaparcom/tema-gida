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
