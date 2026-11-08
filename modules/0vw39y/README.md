# tema-gida · 0vw39y — Contact 6

## Nedir

tema-gida sitesinin matrix modülü. `Contact 6` şablonu (section kökü,
sınıf `modulex-contact`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (0 KB) |
| `index.html` | Modül şablonu (render hedefi) (8 KB) |
| `index.jpeg` | Önizleme görseli (58 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `badge` | `{'tr': 'İletişim', 'en': 'Contact'}` |
| `title` | `{'tr': 'Bizimle İletişime Geçin', 'en': 'Get In Touch With Us'}` |
| `description` | `{'tr': 'Projeleriniz için profesyonel destek alın. Size en kısa sürede dönüş yapacağız.', 'en': 'Get professional support for your projects. We will get back to you as soon as possible.'}` |
| `phone` | `0531 679 10 14` |
| `email` | `info@ajansmobil.com` |
| `address` | `{'tr': 'Gaziantep, Türkiye', 'en': 'Gaziantep, Turkey'}` |
| `hours` | `{'tr': 'Pzt-Cum: 09:00 - 18:00', 'en': 'Mon-Fri: 09:00 - 18:00'}` |

- `name`: `Contact 6`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **badge**, **title**, **description**, **phone**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-contact`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-gida sitesinde `web/matrix/modules/0vw39y/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Contact 6",
  "desing": {
    "max": "1200px",
    "badge": {
      "tr": "İletişim",
      "en": "Contact"
    },
    "title": {
      "tr": "Bizimle İletişime Geçin",
      "en": "Get In Touch With Us"
    },
    "description": {
      "tr": "Projeleriniz için profesyonel destek alın. Size en kısa sürede dönüş yapacağız.",
      "en": "Get professional support for your projects. We will get back to you as soon as possible."
    },
    "phone": "0531 679 10 14",
    "email": "info@ajansmobil.com",
    "address": {
      "tr": "Gaziantep, Türkiye",
      "en": "Gaziantep, Turkey"
    },
    "hours": {
      "tr": "Pzt-Cum: 09:00 - 18:00",
      "en": "Mon-Fri: 09:00 - 18:00"
   
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
