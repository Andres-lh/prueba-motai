# Prueba Técnica - NestJS Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Este proyecto es una aplicación backend construida con el framework [NestJS](https://github.com/nestjs/nest) y TypeScript. Proporciona una API RESTful modular para la gestión de usuarios, productos y autenticación segura.

## Arquitectura

El proyecto sigue la arquitectura estándar de NestJS, organizada en **Módulos**, **Controladores** y **Servicios**, utilizando inyección de dependencias para mantener el código desacoplado y testearble.

### Tecnologías Principales
*   **Framework**: NestJS (Node.js)
*   **Lenguaje**: TypeScript
*   **Base de Datos**: PostgreSQL
*   **ORM**: TypeORM
*   **Autenticación**: Passport (JWT Strategy & Local Strategy)
*   **Validación**: class-validator & class-transformer

### Flujo de Datos
1.  **Request**: El cliente envía una petición HTTP.
2.  **Controller**: Recibe la petición, valida los DTOs y llama al servicio correspondiente.
3.  **Service**: Ejecuta la lógica de negocio.
4.  **Repository/TypeORM**: Interactúa con la base de datos PostgreSQL.
5.  **Response**: Retorna la respuesta formateada al cliente.

## Estructura del Proyecto

La estructura principal del código fuente (`src/`) es la siguiente:

```
src/
├── module/          # Nombre del módulo
│   ├── controllers/ # Controladores
│   ├── services/    # Servicios
│   ├── strategies/  # Estrategias Passport (JWT, Local)
│   └── guards/      # Guardias para proteger rutas
│   └── dtos/        # Data Transfer Objects
│   └── entities/    # Entidades TypeORM
│   └── helpers/     # Funciones auxiliares
│   └── module.ts    # Archivo principal del módulo
└── main.ts          # Punto de entrada de la aplicación
```

## Requisitos Previos

*   Node.js (versión LTS recomendada)
*   Docker y Docker Compose (para base de datos y ejecución en contenedores)
*   NPM

## Instalación y Ejecución



### 1. Configurar Variables de Entorno

El proyecto incluye archivos de configuración por defecto para distintos entornos (ej. `.env.development`, `.env.test`, `.env.production`). Asegúrate de revisar estos archivos si necesitas credenciales personalizadas.

### Variables de Entorno

#### Development (`.env.development`)
| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `APP_ENV` | Entorno de la aplicación | `development` |
| `NODE_ENV` | Entorno de Node.js | `development` |
| `DB_HOST` | Host de la base de datos | `db` |
| `DB_PORT` | Puerto de la base de datos | `5432` |
| `DB_NAME` | Nombre de la base de datos | `mydb` |
| `DB_USER` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contraseña de la base de datos | `postgres` |
| `TYPEORM_SYNCHRONIZE` | Sincronización automática de TypeORM | `true` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `secret` |

#### Test (`.env.test`)
| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de Node.js | `test` |
| `DB_HOST` | Host de la base de datos | `db` |
| `DB_PORT` | Puerto de la base de datos | `5434` |
| `DB_NAME` | Nombre de la base de datos | `test_db` |
| `DB_USER` | Usuario de la base de datos | `test_user` |
| `DB_PASSWORD` | Contraseña de la base de datos | `test_password` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `secret` |

### 2. Ejecutar con Docker (Recomendado)

Para levantar la aplicación y la base de datos PostgreSQL automáticamente:

```bash
# Levanta el entorno de desarrollo
npm run docker:dev

# Para detener el entorno
npm run docker:down
```

## Pruebas (Testing)

El proyecto cuenta con pruebas unitarias y de integración (e2e).

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e (End-to-End)
npm run test:e2e

# Ver cobertura de pruebas
npm run test:cov
```

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
