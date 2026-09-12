# ParkiGo — Landing Page MVP

Proyecto estático listo para alojarse en GitHub Pages. Corresponde al **ACA — Plan de Negocio 2026** y valida la idea de ParkiGo mediante una landing page y el Método Mago de Oz.

## Qué incluye

- Hero con propuesta de valor y CTA.
- Formulario funcional para buscar parqueadero.
- Resultados de parqueaderos de **demostración** y solicitud simulada de reserva.
- Tres beneficios principales.
- Incentivo de registro/prueba.
- Formulario con las 4 preguntas de validación.
- Métricas automáticas.
- 10 respuestas **simuladas de demostración** precargadas.
- Almacenamiento de nuevas respuestas en `localStorage`.
- Exportación de resultados a CSV.
- Wireframe en `docs/wireframe.svg`.
- Diseño responsive para computador y celular.

## Importante sobre la validación

Las 10 respuestas incluidas en `data/validacion_demo.json` son una **muestra simulada creada para mostrar cómo se vería la validación**. No deben presentarse como entrevistas reales. Si el docente exige validación real, usa la landing con 10 personas y reemplaza los registros de demostración por sus respuestas efectivas.

## Abrir en tu computador

No necesita instalar nada. Abre `index.html` con tu navegador.

Para evitar restricciones locales, también puedes ejecutar:

```bash
python -m http.server 8000
```

y abrir `http://localhost:8000`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `parkigo-mvp`).
2. Descomprime este ZIP y sube **el contenido de la carpeta**, incluyendo `index.html`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda. GitHub mostrará la URL pública después del despliegue.

## Estructura

```text
ParkiGo_Landing_Page_GitHub/
├── index.html
├── styles.css
├── app.js
├── README.md
├── RESULTADOS_VALIDACION.md
├── assets/
│   ├── logo.svg
│   ├── logo-white.svg
│   └── favicon.svg
├── data/
│   └── validacion_demo.json
└── docs/
    └── wireframe.svg
```

## Tecnologías

HTML5, CSS3 y JavaScript puro. No necesita API, backend ni base de datos para la demostración.

## Hipótesis de valor

> Creemos que los conductores urbanos pagarán una tarifa de servicio de $2.000 COP por reservar un parqueadero desde ParkiGo porque podrán ahorrar tiempo, evitar recorridos innecesarios y asegurar un espacio antes de llegar.

## Alcance del MVP

Este proyecto es académico. No procesa pagos, no consulta parqueaderos reales y no genera reservas comerciales. La búsqueda y reserva ilustran el flujo del Método Mago de Oz.
