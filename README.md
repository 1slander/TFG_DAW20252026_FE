# 📊 Sistema de Gestión de Restaurante - Frontend (TFG)

Este proyecto constituye el núcleo visual de una plataforma de gestión integral para restaurantes, desarrollada con **Angular 19** y **Angular Material 3**. La arquitectura está diseñada bajo principios de escalabilidad, modularidad y diseño responsivo.

---

## 📂 Estructura del Proyecto

La organización de carpetas sigue una jerarquía clara por responsabilidades, facilitando el mantenimiento y el crecimiento del software:

### 📁 `src/app/`
* **`pages/`**: Alberga los componentes que representan vistas completas o pantallas principales (ej: `dashboard`, `home`). Cada página gestiona su propia lógica de presentación y layout.
* **`components/`**: Contiene piezas de UI reutilizables y atómicas (ej: `admin`, `article`, `drawer`, `user`). Estos componentes se inyectan dentro de las páginas para fomentar la reutilización de código.
* **`shared/`**: Recursos transversales y configuraciones de navegación global.
    * `drawer-menu/`: Implementación del menú lateral compartido entre vistas.
    * `dashboard.routes.ts`: Definición de las **rutas hijas** (*Child Routes*) que permiten la navegación dinámica dentro del panel principal.
* **`services/`**: Centraliza la lógica de negocio y el manejo de estados globales.
    * `screen-size.ts`: Servicio reactivo basado en *Signals* que gestiona el diseño responsivo mediante `MediaMatcher`.
    * `theme-manager.ts`: Controla la persistencia y el cambio del tema visual.
* **`interfaces/`**: Define los contratos de datos y tipos de TypeScript (ej: `theme.ts`), garantizando un desarrollo robusto y tipado.
* **`ui/`**: 
    * `material-modules.ts`: Punto único de importación para todos los módulos de **Angular Material**, optimizando la organización del código.

---

## 🛠️ Guía de Comandos (Angular CLI)

Comandos esenciales para el flujo de trabajo diario:
* **Instalar Material**: `ng add @angular/material`
* **Instalar CDK**: `npm install @angular/cdk`
* **Iniciar servidor local**: `ng serve -o` (Levanta la app y abre el navegador automáticamente).
* **Crear una nueva página**: `ng generate component pages/nombre-pagina`.
* **Crear componente reutilizable**: `ng generate component components/nombre-componente`.
* **Crear un servicio**: `ng generate service services/nombre-servicio`.
* **Generar Build de producción**: `ng build`.

---

## 🎨 Identidad Visual y Diseño

El proyecto utiliza un sistema de tematización avanzado que integra la última especificación de **Material 3** con variables de **CSS3** personalizadas:

| Variable | Función | Valor Hex |
| :--- | :--- | :--- |
| `--principal-color` | Color de marca (Cyan) para Toolbars y botones | `#00a896` |
| `--principal-text` | Color base para tipografía y títulos | `#00332e` |
| `--status-color_disponible` | Indicador visual de éxito o disponibilidad | `#4caf50` |
| `--status-color_pendiente` | Indicador de alerta o procesos en espera | `#ff9800` |
| `--font-principal` | Familia tipográfica primaria | `'Inter'` |


---

## 📱 Funcionalidades Destacadas

1.  **Enrutamiento Inteligente**: Implementación de *Lazy Loading* y rutas hijas para una carga eficiente de componentes sin recargas totales de página.
2.  **Layout Adaptativo**: Gracias al servicio `ScreenSize`, el menú lateral (`mat-sidenav`) ajusta su comportamiento automáticamente entre escritorio y dispositivos móviles.
3.  **Modularidad Extrema**: Desacoplamiento de la biblioteca de UI mediante el archivo centralizado `material-modules.ts`, facilitando futuras actualizaciones.

---

---

## 🔄 Metodología de Trabajo (Gitflow)

Para el desarrollo de este proyecto se utiliza el modelo de ramificación **Gitflow**, lo que garantiza un historial limpio y un despliegue controlado.

### 🌿 Ramas Principales
* **`main`**: Contiene el código de producción, siempre estable y listo para desplegar. Cada commit en esta rama corresponde a una versión (tag) del sistema.
* **`develop`**: Es la rama de integración. Aquí se fusionan todas las nuevas funcionalidades una vez terminadas y probadas.

### 🌿 Ramas de Soporte
* **`feature/`**: Ramas temporales creadas a partir de `develop`. Se utilizan para desarrollar nuevas funcionalidades o componentes (ej: `feature/dashboard-charts`). Una vez finalizadas, se reintegran en `develop` mediante un Pull Request.
* **`hotfix/`**: Ramas críticas que parten de `main` para corregir errores urgentes en producción. Al finalizar, se fusionan tanto en `main` como en `develop`.
* **`release/`**: Ramas de preparación para una nueva entrega. Se utilizan para pruebas finales y corrección de pequeños bugs antes de pasar a `main`.

### 🚀 Flujo de Trabajo Diario
1.  **Iniciar tarea**: Crear una rama desde develop: `git checkout -b feature/nombre-tarea develop`.
2.  **Sincronizar**: Realizar commits frecuentes con mensajes descriptivos.
3.  **Finalizar**: Fusionar la funcionalidad de vuelta a develop:
    ```bash
    git checkout develop
    git merge feature/nombre-tarea
    git branch -d feature/nombre-tarea
    ```
4.  **Subir cambios**: `git push origin develop`.

---
