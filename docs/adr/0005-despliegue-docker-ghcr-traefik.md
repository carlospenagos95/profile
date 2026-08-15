# ADR 0005 — Despliegue como imagen Docker vía GHCR y Traefik

Estado: aceptada · 2026-08-14

## Contexto

El sitio se hospeda en un servidor propio al que se accede por SSH con clave. El requisito era
desplegar una imagen Docker, no una carpeta de archivos estáticos copiada por scp.

## Decisión

- **Imagen multi-stage**: `node:24-alpine` compila; `nginx:alpine` sirve. La imagen final no
  contiene Node, npm ni el código fuente.
- **Registro: GHCR** (`ghcr.io/<owner>/<repo>`). GitHub Actions construye y publica; el servidor
  solo hace `docker compose pull`.
- **Etiquetado por commit** (`:<sha corto>`) además de `:latest`. El despliegue referencia el
  SHA, así que es reproducible y revertir es cambiar una variable.
- **Traefik** enruta `profile.carlos-po.dev` por labels del contenedor y gestiona TLS. El
  contenedor no publica puertos en el host.
- **Despliegue por SSH con `known_hosts` fijado**, sin `StrictHostKeyChecking=no`.

## Alternativas

1. **Copiar `dist/` por scp a un nginx del host.** Más simple, pero el estado del servidor deja
   de ser reproducible y conviven versiones a medio copiar durante el despliegue.
2. **Construir la imagen en el servidor.** Ahorra el registro, pero pone a compilar Angular a la
   máquina que sirve el tráfico y alarga cada despliegue.
3. **Hosting estático gestionado (Pages, Netlify).** Descartado: el requisito es servidor propio.

## Consecuencias

- El servidor solo necesita Docker, Traefik y el `docker-compose.yml`; nada de Node.
- `docker compose pull && up -d` reemplaza el contenedor con la imagen nueva; el anterior se
  detiene solo cuando el nuevo está corriendo.
- Cambiar contenido exige rebuild de la imagen (coherente con el prerender, ADR 0003).
- La caché de assets es agresiva (1 año, `immutable`) porque llevan hash; `index.html` se
  revalida siempre, así que un despliegue se ve al recargar.
- Requiere secrets en GitHub: `SSH_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_KNOWN_HOSTS`,
  `DEPLOY_PATH` (y `SSH_PORT` si no es 22).
