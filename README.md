# Manual para actualizar el sitio web

Este manual te guiará en el proceso de actualización de las diferentes secciones de tu sitio web, permitiéndote agregar experiencias laborales, proyectos y personalizar todo el contenido.

## Tabla de contenidos

1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Archivos de traducción](#archivos-de-traducción)
3. [Cómo agregar experiencias laborales](#cómo-agregar-experiencias-laborales)
4. [Cómo agregar proyectos](#cómo-agregar-proyectos)
5. [Cómo modificar habilidades](#cómo-modificar-habilidades)
6. [Gestión de iconos](#gestión-de-iconos)
7. [Ejecutar el proyecto](#ejecutar-el-proyecto)

---

## Estructura del proyecto

El proyecto está construido con Angular y utiliza un sistema de componentes por sección:

- `experience`: Componente para mostrar experiencia laboral
- `projects`: Componente para mostrar proyectos
- `skills`: Componente para mostrar habilidades y tecnologías
- `hero`: Componente para la sección de presentación
- `navbar`: Componente de navegación
- `footer`: Pie de página

Los textos e información se almacenan en archivos de traducción, lo que facilita la modificación de contenidos sin tocar el código.

---

## Archivos de traducción

Todo el contenido textual del sitio se gestiona a través de los archivos de traducción ubicados en:

- `/src/assets/i18n/es.json` - Para el contenido en español
- `/src/assets/i18n/en.json` - Para el contenido en inglés

Para modificar cualquier texto del sitio, debes editar estos archivos siguiendo la estructura JSON existente.

---

## Cómo agregar experiencias laborales

El sistema está diseñado para permitir múltiples experiencias laborales con secciones totalmente personalizables.

### Estructura básica de una experiencia

```json
{
  "jobTitle": "Título del puesto",
  "company": "Nombre de la empresa",
  "period": "Periodo de trabajo",
  "location": "Ubicación · Modalidad",
  "sections": [
    // Aquí van las diferentes secciones
  ]
}
```

### Tipos de secciones disponibles

1. **Sección de proyectos** - Para mostrar proyectos con título y descripciones:

```json
{
  "type": "projects",
  "title": "💻 Desarrollo:",
  "icon": "💻",
  "content": [
    {
      "title": "Nombre del proyecto:",
      "descriptions": [
        "- Primera descripción del proyecto",
        "- Segunda descripción del proyecto"
      ]
    },
    // Más proyectos...
  ]
}
```

2. **Sección de lista simple** - Para mostrar listas con viñetas:

```json
{
  "type": "list",
  "title": "🔧 Título de la sección:",
  "icon": "🔧",
  "content": [
    "Primer elemento de la lista",
    "Segundo elemento de la lista",
    "Tercer elemento de la lista"
  ]
}
```

3. **Sección de tecnologías** - Para mostrar tecnologías con iconos:

```json
{
  "type": "technologies",
  "title": "⚙️ Stack Tecnológico:",
  "icon": "⚙️",
  "content": ["Angular", "TypeScript", "Java", "MySQL"]
}
```

4. **Sección de texto** - Para párrafos simples:

```json
{
  "type": "text",
  "title": "📝 Descripción:",
  "icon": "📝",
  "content": [
    "Primer párrafo de texto.",
    "Segundo párrafo de texto."
  ]
}
```

5. **Sección HTML** - Para contenido HTML personalizado:

```json
{
  "type": "html",
  "title": "📊 Estadísticas:",
  "icon": "📊",
  "content": "<div class='custom-stats'>Contenido HTML personalizado</div>"
}
```

### Agregando una nueva experiencia laboral

Para agregar una nueva experiencia laboral, debes editar los archivos de traducción (`es.json` y `en.json`) y añadir un nuevo objeto al array `experience.items`:

```json
"experience": {
  "title": "Experiencia",
  "items": [
    {
      // Experiencia laboral existente...
    },
    {
      // Nueva experiencia laboral
      "jobTitle": "Desarrollador Frontend",
      "company": "Empresa XYZ",
      "period": "Enero 2022 - Diciembre 2022",
      "location": "Remoto",
      "sections": [
        {
          "type": "text",
          "title": "📝 Descripción:",
          "icon": "📝",
          "content": [
            "Trabajé en el equipo de frontend desarrollando componentes React para una plataforma de e-commerce."
          ]
        },
        {
          "type": "technologies",
          "title": "⚙️ Tecnologías utilizadas:",
          "icon": "⚙️",
          "content": ["React", "JavaScript", "CSS", "HTML"]
        }
      ]
    }
  ]
}
```

> 💡 **Nota importante**: Debes agregar la misma estructura en ambos archivos de traducción (es.json y en.json) para mantener la coherencia del sitio web. La diferencia estará en los textos traducidos.

---

## Cómo agregar proyectos

Los proyectos se gestionan de manera similar, utilizando un array en los archivos de traducción.

### Estructura de un proyecto

```json
{
  "name": "Nombre del Proyecto",
  "description": "Descripción detallada del proyecto.",
  "technologies": ["React", "Next.js", "Tailwind CSS"],
  "demoUrl": "https://ejemplo.com/demo",
  "githubUrl": "https://github.com/usuario/repositorio",
  "docsUrl": "https://ejemplo.com/documentacion" // Opcional
}
```

### Agregando un nuevo proyecto

Para agregar un nuevo proyecto, añade un objeto al array `projects.items` en los archivos de traducción:

```json
"projects": {
  "title": "Mis Proyectos",
  "items": [
    {
      // Proyectos existentes...
    },
    {
      // Nuevo proyecto
      "name": "Nuevo Proyecto",
      "description": "Descripción del nuevo proyecto.",
      "technologies": ["Angular", "TypeScript", "Firebase"],
      "demoUrl": "#",
      "githubUrl": "#"
    }
  ],
  "buttons": {
    // ...
  }
}
```

---

## Cómo modificar habilidades

Las habilidades están organizadas por categorías (frontend, backend, databases, devops).

### Estructura de una habilidad

```json
{
  "name": "Nombre de la Tecnología",
  "icon": "logos:nombre-del-icono"
}
```

### Agregando nuevas habilidades

Para agregar una nueva habilidad, añádela al array correspondiente:

```json
"skills": {
  "title": "Tecnologías y Habilidades",
  "frontend": {
    "title": "Frontend",
    "items": [
      // Habilidades existentes...
      {
        "name": "Nueva Tecnología",
        "icon": "logos:nueva-tecnologia"
      }
    ]
  }
}
```

---

## Gestión de iconos

El proyecto utiliza la librería Iconify para los iconos. Para agregar un nuevo icono a las tecnologías, debes:

1. Buscar el icono en [Iconify](https://icon-sets.iconify.design/)
2. Agregar el nombre del icono en el archivo correspondiente
3. Si es una nueva tecnología, añadirla al objeto `techIcons` en `experience.component.ts`

```typescript
techIcons: Record<string, string> = {
  // Iconos existentes...
  "Nueva Tecnología": "logos:nueva-tecnologia",
}
```

Para emojis, simplemente puedes usarlos directamente en los textos o como valores de la propiedad `icon` en las secciones.

---

## Ejecutar el proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
ng serve
```

Para construir el proyecto para producción:

```bash
ng build --prod
```

---

Este manual te ayudará a mantener y actualizar tu sitio web fácilmente. Recuerda siempre mantener la coherencia entre los archivos de traducción para que la experiencia sea consistente en ambos idiomas.

Si necesitas agregar nuevas funcionalidades o componentes, considera extender este manual con las instrucciones correspondientes.