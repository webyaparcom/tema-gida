# Ürün Etiket Kartı (Gıda · TGK) — `yqxop9` (tema-gida)

## Amaç
Gıda ürününün TGK etiket kartı (net miktar, içindekiler, alerjen, SKT, saklama, üretici, kayıt no).

## Kaynak
Standart webmaker modülü: `mcp/webmaker/webmodules/body/urun-etiket` (salt okunur; bu klasör onun site örneğidir — `site-module-add` ile açıldı, `site-module-patch` ile ayarlandı).

## Bu sitede
Kullanıldığı yer: products/yoresel-kahvalti-paketi.
Kurulum kaynağı: `projeler/webyapar/data/tema/tema-set/icerik/gida/spec.js` → `projeler/webyapar/web/tema-set/araclar/demo-kur.js` (elle düzenlenmez; değişiklik spec'te yapılıp yeniden kurulur).

## Dosyalar
- `index.html` — şablon
- `back.js` — sunucu tarafı çizim
- `index.json` — ayar (`desing`) ve veri (`data`)
- `README.md` — bu belge
