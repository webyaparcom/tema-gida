# tema-gida · cm5ohn — Kategori Filtre

## Nedir

tema-gida sitesinin matrix modülü. `Kategori Filtre` şablonu (div kökü,
sınıf `modulex`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (13 KB) |
| `index.jpeg` | Önizleme görseli (22 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `color` | `#333333` |
| `bgcolor` | `#ffffff` |
| `bordercolor` | `#e0e0e0` |
| `activecolor` | `#2196f3` |
| `activebg` | `#e3f2fd` |
| `title` | `{'tr': 'Filtreler', 'en': 'Filters'}` |
| `categoryTitle` | `{'tr': 'Kategoriler', 'en': 'Categories'}` |
| `priceTitle` | `{'tr': 'Fiyat Araligi', 'en': 'Price Range'}` |

- `name`: `Kategori Filtre`
- `data`: 2 kayıt. Örnek: `{"categories": [{"slug": "kuruyemis", "name": {"tr": "Kuruyemis", "en": "Nuts"}, "count": 12}, {"slug": "kuru-meyve", "name": {"tr": "Kuru …`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **color**, **bgcolor**, **bordercolor**, **activecolor**, **activebg**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-gida sitesinde `web/matrix/modules/cm5ohn/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Kategori Filtre",
  "desing": {
    "color": "#333333",
    "bgcolor": "#ffffff",
    "bordercolor": "#e0e0e0",
    "activecolor": "#2196f3",
    "activebg": "#e3f2fd",
    "title": {
      "tr": "Filtreler",
      "en": "Filters"
    },
    "categoryTitle": {
      "tr": "Kategoriler",
      "en": "Categories"
    },
    "priceTitle": {
      "tr": "Fiyat Araligi",
      "en": "Price Range"
    },
    "stockTitle": {
      "tr": "Stok Durumu",
      "en": "Stock Status"
    },
    "inStockText": {
      "tr": "Stokta Var",
      "en": "In Stock"
    },
    "outOfStockText": {
      "tr": "Tukenmis",
      "en": "Out of Stock"
    },
    "allCategories": {
      "tr": "Tum Kateg
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
