# 🤖 Manual de Agentes IA Locales

Manual web profesional sobre la implementación de agentes de inteligencia artificial locales para desarrollo de código.

**🌐 Demo en vivo:** [Ver página web](https://TU_USUARIO.github.io/agentes-ia-manual/)

## 📋 Descripción

Este proyecto documenta la práctica realizada el 15 de enero de 2026 sobre configuración y uso de agentes de IA con modelos ejecutándose localmente en GPU. Incluye:

- ⚙️ Guía completa de instalación y configuración
- ❌ Problemas encontrados y soluciones aplicadas
- 📊 Análisis de rendimiento y comparativas
- 💡 Aprendizajes técnicos y mejores prácticas
- 🔗 Referencias y recursos adicionales

## 🛠️ Tecnologías utilizadas

### Agentes IA
- **OpenCode** - Agente de código abierto (terminal + VS Code)
- **Kilo Code** - Extensión de VS Code para asistencia de código

### Backends de modelos
- **Ollama** - Plataforma ligera para ejecutar LLMs localmente
- **LM Studio** - Interfaz gráfica para gestionar modelos locales

### Modelos LLM
- **deepseek-coder-v2-lite-instruct** (11.45 GB Q4_K_M)
- **gpt-oss:20b** (20 mil millones de parámetros)

### Hardware
- GPU: NVIDIA GeForce RTX 3060 Ti
- VRAM: 16 GB
- Utilización: 99-100% durante inferencia

## 🚀 Características de la web

- ✨ Diseño moderno y responsive
- 🎨 Gradientes y animaciones sutiles
- 📱 Compatible con móviles y tablets
- 🌈 Syntax highlighting para código
- 🔗 Navegación fluida entre secciones
- 📊 Tablas comparativas profesionales
- ⚡ Carga rápida y optimizada

## 📂 Estructura del proyecto

```
agentes-ia-manual/
├── index.html          # Página principal con todo el contenido
├── styles.css          # Estilos profesionales y responsive
└── README.md           # Este archivo
```

## 🌐 Desplegar en GitHub Pages

### Paso 1: Crear repositorio

```bash
# Inicializar repositorio local
git init

# Añadir archivos
git add index.html styles.css README.md
git commit -m "Initial commit: Manual agentes IA locales"
```

### Paso 2: Conectar con GitHub

```bash
# Crear repositorio en GitHub (web)
# Luego conectar:
git remote add origin https://github.com/TU_USUARIO/agentes-ia-manual.git
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona **main** branch
5. Click en **Save**

¡Listo! Tu página estará disponible en:
```
https://TU_USUARIO.github.io/agentes-ia-manual/
```

## 📖 Contenido del manual

### 1. Introducción
- Definición de agentes IA
- Herramientas evaluadas (OpenCode, Kilo Code, Ollama, LM Studio)

### 2. Configuración
- Especificaciones de hardware
- Instalación paso a paso
- Archivos de configuración JSON
- Modelos utilizados

### 3. Problemas y soluciones
- Error en URL base de Ollama
- Alta utilización de VRAM
- Contexto de proyecto vacío
- Configuración multi-modelo
- Rendimiento variable

### 4. Resultados
- Capturas de pantalla explicadas
- Comparativa OpenCode vs Kilo Code
- Ejemplos de código generado

### 5. Aprendizajes
- Técnicos (API, recursos, cuantización)
- De proceso (documentación, monitorización)
- Para futuros proyectos
- Mejores prácticas

### 6. Conclusiones
- Ventajas IA local vs cloud
- Limitaciones encontradas
- Recomendaciones finales

### 7. Recursos
- Documentación oficial
- Modelos recomendados
- Herramientas complementarias

## 🎯 Objetivo académico

Este manual fue desarrollado como parte de las prácticas del programa ASIR (Administración de Sistemas Informáticos en Red) - 2º año.

**Competencias trabajadas:**
- Despliegue de infraestructura de IA
- Configuración de servicios locales
- Optimización de recursos hardware
- Documentación técnica profesional
- Control de versiones con Git/GitHub
- Publicación web con GitHub Pages

## 📄 Licencia

Este proyecto está bajo licencia MIT. Siéntete libre de usar, modificar y compartir.

## 👤 Autor

**Luis**  
Estudiante ASIR 2º año  
Jerez de la Frontera, Andalucía

---

## 🔧 Personalización

Para adaptar esta web a tu proyecto:

1. **Edita `index.html`:**
   - Cambia el nombre del autor
   - Actualiza fechas y especificaciones
   - Añade tus propias capturas

2. **Personaliza `styles.css`:**
   - Modifica las variables CSS en `:root` para cambiar colores
   - Ajusta tamaños de fuente si lo necesitas

3. **Actualiza este README.md:**
   - Cambia `TU_USUARIO` por tu usuario de GitHub
   - Actualiza la URL de GitHub Pages

## 💻 Visualización local

Para ver la página antes de subirla a GitHub:

1. Abre `index.html` directamente en tu navegador
2. O usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 🐛 Problemas conocidos

- El syntax highlighting de código requiere conexión a internet (CDN de highlight.js)
- Algunos emojis pueden no renderizar correctamente en navegadores antiguos

## 🤝 Contribuciones

Si encuentras errores o mejoras, ¡siéntete libre de crear un issue o pull request!

---

**⭐ Si este manual te fue útil, dale una estrella al repositorio!**
