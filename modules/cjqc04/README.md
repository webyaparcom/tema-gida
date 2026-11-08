# tema-gida · cjqc04 — Ürün Vitrini 2 (Liste)

## Nedir

tema-gida sitesinin matrix modülü. `Ürün Vitrini 2 (Liste)` şablonu (section kökü,
sınıf `modulexVitrin2`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (7 KB) |
| `index.html` | Modül şablonu (render hedefi) (7 KB) |
| `index.jpeg` | Önizleme görseli (25 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1100px` |
| `bgcolor` | `#f8fafc` |
| `cardbg` | `#ffffff` |
| `bordercolor` | `#e2e8f0` |
| `color` | `#1e293b` |
| `pricecolor` | `#DE6D26` |
| `oldpricecolor` | `#94a3b8` |
| `badgecolor` | `#ffffff` |

- `name`: `Ürün Vitrini 2 (Liste)`
- `data`: 1 kayıt. Örnek: `{"products": [{"id": "demo-1", "name": {"tr": "Örnek Ürün 1", "en": "Sample Product 1"}, "description": {"tr": "Kısa ürün açıklaması buraya…`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **cardbg**, **bordercolor**, **color**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulexVitrin2`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-gida sitesinde `web/matrix/modules/cjqc04/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Ürün Vitrini 2 (Liste)",
  "desing": {
    "max": "1100px",
    "bgcolor": "#f8fafc",
    "cardbg": "#ffffff",
    "bordercolor": "#e2e8f0",
    "color": "#1e293b",
    "pricecolor": "#DE6D26",
    "oldpricecolor": "#94a3b8",
    "badgecolor": "#ffffff",
    "badgebg-new": "#16a34a",
    "badgebg-sale": "#ea580c",
    "buttonbg": "#DE6D26",
    "buttoncolor": "#ffffff",
    "showCount": 20,
    "title": {
      "tr": "Ürünlerimiz",
      "en": "Our Products"
    },
    "addToCart": {
      "tr": "Sepete Ekle",
      "en": "Add to Cart"
    },
    "soldOutText": {
      "tr": "Tükendi",
      "en": "Sold Out"
    },
    "newText": {
      "tr": "YENİ",
      "en": "NEW"
    },
  
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
