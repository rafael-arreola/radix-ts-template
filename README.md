# Template con Radix UI y Radix UI Themed

Este template tiene la capacidad de usar componentes de Radix UI y Radix UI Themed.

- [Radix UI Primitives Docs](https://www.radix-ui.com/primitives/docs/overview/introduction): son componentes básicos sin estilos pero funcionales, pueden anexar tailwindcss(4 instalado) para ajustarlos
- [Radix UI Themed Docs](https://www.radix-ui.com/themes/docs/overview/getting-started): son componentes básicos con estilos predefinidos, pueden anexar tailwindcss(4 instalado) para ajustarlos
- [Tailwind CSS Docs](https://tailwindcss.com/): Libreria de estilos para aplicaciones web

## Estructura del template

```
.
├── public
└── src
    ├── components
    │   ├── layouts
    │   │   └── dashboard
    │   └── providers
    │       ├── app
    │       │   └── dependencies
    │       ├── auth
    │       └── http
    │           └── rest
    ├── domain
    ├── hooks
    ├── pages
    │   └── welcome
    ├── styles
    └── utils
```

- `public`: contiene recursos públicos como imágenes, etc..
- `src/components`: contiene componentes reutilizables
  - `src/components/layouts`: contiene los layouts disponibles para diferentes presentaciones de la aplicación
  - `src/components/providers`: contiene componentes de proveedores
    - `src/components/providers/app`: contiene componentes de proveedores para la aplicación
    - `src/components/providers/auth`: contiene componentes de proveedores para la autenticación
    - `src/components/providers/http`: contiene componentes de proveedores para la comunicación HTTP
- `src/domain`: contiene dominios de negocio, interfaces y tipos preferentemente
- `src/hooks`: contiene hooks personalizados
- `src/pages`: contiene páginas de la aplicación
- `src/styles`: contiene estilos personalizados
- `src/utils`: contiene utilidades personalizadas

## Inicialización del template

1. Una vez creado el repositorio desde github con base a este template, debera copiar el archivo .env.example como .env.local
2. Llene las variables de entorno en el archivo .env.local
3. Ejecute el comando `pnpm install` para instalar las dependencias del proyecto
4. Ejecute el comando `pnpm run prepare`, este comando solo debe ejecutarse una vez al clonar el repositorio, posteriormente no es necesario
5. Ejecute el comando `pnpm run dev` para iniciar el servidor de desarrollo

## src/components/custom-actions

Este componente permite renderizar elementos en la barra de título junto al logotipo
