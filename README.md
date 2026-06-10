# C&D Studio — Portafolio de Servicios

Proyecto Integrador — Programación y Plataformas Web  
Universidad Politécnica Salesiana | Período Marzo – Agosto 2026  
Docente: Ing. Pablo Torres

---

## Integrantes

| Nombre | Rol | GitHub |
|---|---|---|
| Cristina Loja | Frontend / UI | [@cristinaelilo](https://github.com/cristinaelilo) |
| Denisse Paredes | Backend / Firebase | [@Pestefania](https://github.com/Pestefania) |

---

## Descripción del Proyecto

Aplicación web tipo portafolio profesional multiusuario desarrollada con **Angular** como framework frontend, **Firebase** para autenticación y gestión de solicitudes, y **Strapi CMS** como gestor de contenido dinámico headless.

La aplicación permite:
- Presentar los perfiles de las programadoras y sus proyectos
- Mostrar servicios y proyectos destacados
- Permitir que usuarios externos autenticados envíen solicitudes de contacto
- Gestionar y responder dichas solicitudes desde un panel de administración

---

## Arquitectura del Sistema

```
Cliente / Navegador
       |
       v
+------------------+
|  Angular (SPA)   |  <- Frontend
|  Firebase Auth   |  <- Autenticación
|  Cloud Firestore |  <- Solicitudes
+--------+---------+
         | REST API
         v
+------------------+
|   Strapi CMS     |  <- Contenido dinámico
|  Strapi Cloud    |     Programadoras, Proyectos,
|  PostgreSQL      |     Servicios, Tecnologías
+------------------+
```

- **Angular** — Interfaz de usuario, routing, consumo de APIs
- **Firebase Authentication** — Registro e inicio de sesión (email/contraseña + Google)
- **Cloud Firestore** — Almacenamiento de solicitudes de contacto
- **Strapi CMS** — Administración del contenido dinámico sin panel propio

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 19+ | Framework frontend |
| TypeScript | 5+ | Lenguaje principal |
| Tailwind CSS | 4 | Estilos y diseño responsive |
| Firebase Auth | 11+ | Autenticación de usuarios |
| Cloud Firestore | 11+ | Base de datos NoSQL |
| Strapi CMS | 5+ | CMS Headless |
| Node.js | 18+ | Entorno de ejecución Strapi |

---

## Funcionalidades Implementadas

### Vista Pública (sin sesión)
- Página Home con hero, equipo, tecnologías, servicios, proyectos destacados y CTA
- Página de Programadoras con cards de perfil
- Perfil individual de cada programadora con sus proyectos
- Página de Proyectos
- Página de Servicios
- Página de Contacto con información y enlaces

### Autenticación
- Registro de usuarios externos (email + contraseña)
- Inicio de sesión (email + contraseña)
- Inicio de sesión con Google
- Cierre de sesión reactivo (sin recargar página)
- Diferenciación de roles: Usuario externo / Programadora

### Usuario Externo Autenticado
- Envío de solicitudes de contacto con: nombre, correo, tipo de servicio, programadora, descripción
- Vista de sus propias solicitudes enviadas
- Ver estado y respuesta de cada solicitud

### Programadora (Admin)
- Panel de administración con todas las solicitudes recibidas
- Cambiar estado de solicitud (Pendiente / Respondida)
- Registrar observación o respuesta
- Guardado en Firestore en tiempo real

### Contenido Dinámico (Strapi)
- Programadoras gestionadas desde Strapi CMS
- Proyectos con campo `destacado` para página principal
- Relación many-to-many Proyectos — Programadoras
- Servicios gestionados desde Strapi
- Fallback automático a datos locales si Strapi no responde

---

## Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- Angular CLI 19+
- Cuenta en Firebase
- Cuenta en Strapi Cloud

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

Copia la configuración de tu proyecto Firebase en `src/app/firebase.config.ts`:

```typescript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

export const appFirebase = initializeApp(firebaseConfig);
```

Activa en Firebase Console:
- Authentication — Email/Contraseña y Google
- Firestore Database — Crear base de datos en modo producción

### 3. Configurar correos de administradoras

En `src/app/services/auth.service.ts`:

```typescript
const PROGRAMMER_EMAILS: string[] = [
  'cristinaeliloja12@gmail.com',
  'pestefania968@gmail.com'
];
```

### 4. Configurar URL de Strapi

En `src/app/services/strapi.service.ts`:

```typescript
const STRAPI_URL = 'https://cloud.strapi.io/projects/strapi-backend-9ad9d38714/production/deployments';
```

### 5. Correr en desarrollo

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

---

## Configuración de Strapi CMS

### Content Types requeridos

**Programador**

| Campo | Tipo |
|---|---|
| nombre | Text |
| especialidad | Text |
| descripcion_breve | Text |
| descripcion_completa | Rich Text |
| slug | UID |
| foto | Media |
| github | Text |
| linkedin | Text |
| correo | Email |
| activo | Boolean |

**Proyecto**

| Campo | Tipo |
|---|---|
| nombre | Text |
| slug | UID |
| descripcion_breve | Text |
| imagen | Media |
| tipo | Enumeration (académico, personal, laboral, simulado) |
| tecnologias | Text |
| repositorio | Text |
| demo | Text |
| destacado | Boolean |
| programadores | Relation (many-to-many — Programador) |

**Servicio**

| Campo | Tipo |
|---|---|
| titulo | Text |
| descripcion | Text |
| icono | Text |

### Permisos públicos en Strapi
Settings — Roles — Public — activar `find` y `findOne` para los 3 content types.

---

## Despliegue

### Firebase Hosting (Angular)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar (seleccionar Hosting)
firebase init

# Build de producción
ng build

# Deploy
firebase deploy
```

### Strapi Cloud

1. Subir proyecto Strapi a GitHub
2. Ir a [cloud.strapi.io](https://cloud.strapi.io)
3. Conectar repositorio de GitHub
4. Seleccionar plan Free
5. Deploy automático

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── programmer-card/
│   │   ├── project-card/
│   │   └── service-card/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── pages/
│   │   ├── home/
│   │   ├── perfil/
│   │   ├── programadoras/
│   │   ├── proyectos/
│   │   ├── servicios/
│   │   ├── contacto/
│   │   ├── solicitud/
│   │   ├── mis-solicitudes/
│   │   ├── admin/
│   │   ├── login/
│   │   └── register/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── firestore.service.ts
│   │   └── strapi.service.ts
│   ├── data/
│   │   └── data.ts
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── firebase.config.ts
└── styles.css
```

---

## Roles y Permisos

| Acción | Sin sesión | Usuario externo | Programadora |
|---|---|---|---|
| Ver Home | Si | Si | Si |
| Ver perfiles | Si | Si | Si |
| Ver proyectos | Si | Si | Si |
| Enviar solicitud | No | Si | Si |
| Ver mis solicitudes | No | Si | Si |
| Panel admin | No | No | Si |
| Responder solicitudes | No | No | Si |

---

## URL de Despliegue

- Aplicación desplegada: https://cd-studio-7bbcf.web.app/
- Strapi CMS: https://cloud.strapi.io/projects/strapi-backend-9ad9d38714/production/deployments
- Repositorio Strapi: https://github.com/cristinaelilo/strapi-backend
- Repositorio Angular: https://github.com/cristinaelilo/proyecto-portafolio