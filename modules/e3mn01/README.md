# tema-gida · e3mn01 — Menü E-Ticaret

## Nedir

tema-gida sitesinin matrix modülü. `Menü E-Ticaret` şablonu (header kökü,
sınıf `modulex-site-header`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (12 KB) |
| `index.jpeg` | Önizleme görseli (24 KB) |
| `index.json` | Veri + tema token'ları (3 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `logo` | `logo.png` |
| `color` | `#1e3046` |
| `colorhover` | `#123763` |
| `height` | `50px` |
| `urlsepet` | `sepet` |
| `bgcolor` | `#1e3046` |
| `bgcolorhover` | `#123763` |
| `welcomeText` | `{'tr': 'Hoşgeldiniz!', 'en': 'Welcome!'}` |

- `name`: `Menü E-Ticaret`
- `data`: 7 kayıt. Örnek: `{"name": {"tr": "Kuruyemiş", "en": "Nuts"}, "url": "#", "children": [{"name": {"tr": "Fındık", "en": "Hazelnut"}, "url": "#"}, {"name": {"t…`
- Diğer anahtarlar: `category`, `description`, `version`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **logo**, **color**, **colorhover**, **height**, **urlsepet**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-site-header`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-gida sitesinde `web/matrix/modules/e3mn01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Menü E-Ticaret",
  "desing": {
    "logo": "logo.png",
    "color": "#1e3046",
    "colorhover": "#123763",
    "height": "50px",
    "urlsepet": "sepet",
    "bgcolor": "#1e3046",
    "bgcolorhover": "#123763",
    "welcomeText": {
      "tr": "Hoşgeldiniz!",
      "en": "Welcome!"
    },
    "toplinks": {
      "tr": "Kampanyalar|#|Sipariş Takibi|#|Yardım|#",
      "en": "Campaigns|#|Order Tracking|#|Help|#"
    },
    "searchPlaceholder": {
      "tr": "Ürün ara...",
      "en": "Search products..."
    },
    "searchAria": {
      "tr": "Ürün ara",
      "en": "Search products"
    },
    "searchBtn": {
      "tr": "ARA",
      "en": "SEARCH"
    },
    "favoritesText": {
  
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
