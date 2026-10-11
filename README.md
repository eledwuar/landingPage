# Landing BG Binova Group (maqueta)

Página estática de presentación: HTML, CSS y JS puros, sin dependencias ni compilación. Todo vive en esta carpeta.

## Ver la página

Abrir `index.html` en el navegador o servir la carpeta:

```bash
python -m http.server 5510 --directory landing
```

Luego entrar a http://localhost:5510.

## Contenido

| Sección | Fuente |
|---|---|
| Quiénes somos, Qué hacemos, Por qué confiar, Misión, Visión, Contacto | `docs/insumos/PORTAFOLIO SUPER RICAS.BG BINNOVA 2026…pdf` (páginas 2–6 y 11) |
| Catálogo (7 piezas) | Fotos y renders de las páginas 7–10 del portafolio |
| Clientes y aliados | Logos recortados de la página 6 |

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: estilos. La paleta (negro y azul eléctrico) está en las variables de `:root`.
- `main.js`: menú móvil, filtros y visor del catálogo, y el formulario de contacto.
- `assets/`: logo e isotipo en blanco con fondo transparente, foto del taller, `catalogo/` y `clientes/`.

## Pendiente para pasar de maqueta a sitio real

- El formulario solo abre el cliente de correo (`mailto:`). Falta conectarlo a un backend o servicio de formularios.
- Tres logos de clientes no traen nombre en el portafolio (`cliente-g`, `cliente-im`, `cliente-toro`), así que su texto alternativo es genérico.
- Las fuentes (Barlow Condensed e Inter) se cargan desde Google Fonts. Si no hay conexión, se usan las fuentes del sistema.
- Para agregar piezas al catálogo, copia un `<figure class="item">` en `index.html` y asígnale `data-cat` (`piso`, `mobiliario` o `gondola`).
