# Generador de CV - Centro de Estudiantes (Expo Empleo)

Web interactiva para que los estudiantes de la universidad completen sus datos y descarguen su Curriculum Vitae en formato PDF bajo el modelo oficial a dos columnas requerido por el Centro de Estudiantes para postularse en la **Expo Empleo**.

---

## 🚀 Características Principales

- **Diseño Oficial a Dos Columnas (A4):**
  - **Barra lateral izquierda:** Foto de perfil (opcional), información de contacto con iconos nítidos, habilidades técnicas, competencias blandas, idiomas y sello institucional del Centro de Estudiantes.
  - **Columna principal derecha:** Nombre y titular profesional, perfil/objetivo profesional, formación académica universitaria (UNLaM), experiencia laboral (con opción para primer empleo/sin experiencia previa), cursos/certificaciones y proyectos destacados.
- **Vista Previa en Tiempo Real (Live Preview):**
  - Actualización instantánea en vivo a medida que el alumno escribe.
  - Control de zoom interactivo (50% a 130%) para visualización cómoda en cualquier pantalla.
  - Diseño responsivo adaptado tanto a computadoras como a teléfonos móviles.
- **Generación y Descarga de PDF:**
  - Botón de **Descarga directa en PDF** optimizado para hoja A4.
  - Opción de **Impresión / Guardar como PDF** con tipografía vectorial de máxima fidelidad para reclutadores.
- **Auto-Guardado Local (LocalStorage):**
  - Los alumnos nunca pierden el progreso si recargan la página o cierran el navegador por error.
- **Copia de Seguridad (Exportar / Importar JSON):**
  - Permite descargar los datos en formato `.json` para reutilizarlos o actualizarlos en futuras ediciones de la Expo Empleo.
- **Personalización de Estilos y Colores:**
  - Paletas institucionales: Azul UNLaM / Marino, Grafito Ejecutivo, Borgoña, Verde Esmeralda y Azul Francia.
  - Selector de foto (visible u oculta).
  - Espacio listo para incorporar el logo oficial del Centro de Estudiantes.

---

## 🛠️ Tecnologías Utilizadas

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (Iconografía moderna)
- **html2pdf.js** + **CSS Print Engine** (Exportación A4)

---

## 💻 Ejecución Local

1. Instalar las dependencias (si aún no se instalaron):
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador:
   ```
   http://localhost:5173
   ```

4. Para compilar la versión de producción estática:
   ```bash
   npm run build
   ```
   Los archivos estáticos listos para subir quedarán generados en la carpeta `dist/`.

---

## 🌐 Configuración para GitHub Pages y Dominio Propio

El proyecto ya incluye el workflow de **GitHub Actions** en `.github/workflows/deploy.yml` para desplegar automáticamente en GitHub Pages cada vez que hagas `git push` a la rama `main`.

### Pasos para publicar en GitHub:

1. **Crear el repositorio en GitHub** (por ejemplo: `cv-expo-empleo`).
2. **Vincular y subir tu código local**:
   ```bash
   git add .
   git commit -m "Initial commit: Generador de CV Expo Empleo Centro de Estudiantes"
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
3. **Activar GitHub Pages en el repositorio**:
   - Ingresá a tu repositorio en GitHub -> **Settings** -> **Pages**.
   - En **Source**, seleccioná: **GitHub Actions**.
   - En **Custom domain**, ingresá tu dominio (ejemplo: `cv.tudominio.com` o `expo.tudominio.com`).

4. **Dominio Propio (CNAME en el proyecto)**:
   - Editá el archivo `public/CNAME` y colocá en la primera línea tu dominio exacto (ej: `cv.tudominio.com`). Al compilar, se copiará automáticamente en la raíz de `dist/`.

### Configuración con Cloudflare:

- **Si usas Cloudflare DNS con GitHub Pages**:
  - Creá un registro **CNAME** en tu zona de Cloudflare:
    - **Nombre**: `cv` (o el subdominio que elijas)
    - **Destino**: `TU_USUARIO.github.io`
    - **Proxy status**: Activado (Naranja) o Solo DNS (Gris). Si usas Proxy, asegurate de que en SSL/TLS esté configurado en **Full** o **Full (Strict)**.
- **Si usas Cloudflare Tunnel (cloudflared)**:
  - Podés apuntar tu túnel al puerto donde corre la aplicación o mapearlo al dominio público configurado.

---

## 🎨 Cómo incorporar el Logo Oficial del Centro de Estudiantes

Cuando dispongas del archivo oficial del logo del Centro de Estudiantes (en formato PNG o SVG con fondo transparente):

1. **Opción directa en la web**: Cualquier alumno o administrador puede hacer clic en la sección **"Diseño, Colores y Logo"** y subir el archivo con el botón **"Subir archivo de logo"**.
2. **Opción predeterminada para todos los usuarios**:
   - Guardá la imagen en la carpeta `public/` con el nombre `logo-centro.png` (o `logo-centro.svg`).
   - El generador la tomará automáticamente como escudo oficial para todos los estudiantes que ingresen al sitio.
