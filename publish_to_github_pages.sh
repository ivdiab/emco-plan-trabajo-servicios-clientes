#!/usr/bin/env bash
# publish_to_github_pages.sh
# -------------------------------------------------
# Este script asume que tienes git y una cuenta de GitHub.
# 1. Cambia las variables USER, REPO y EMAIL a tus datos.
# 2. Ejecuta el script desde la carpeta del proyecto:
#    ./publish_to_github_pages.sh
# -------------------------------------------------
set -e

# ----- CONFIGURACIÓN -----
# TODO: reemplaza estos valores antes de ejecutar
GITHUB_USER="ivdiab"
GITHUB_REPO="emco-plan-trabajo-servicios-clientes"
GITHUB_EMAIL="YOUR_EMAIL@example.com"
# Si tienes un token de acceso personal, descomenta la siguiente línea
# export GITHUB_TOKEN="YOUR_PERSONAL_ACCESS_TOKEN"
# -------------------------------------------------
# No modificar a partir de aquí

# Comprueba que estamos en la carpeta del proyecto (buscamos index.html)
if [[ ! -f "index.html" ]]; then
  echo "Error: No se encontró index.html en el directorio actual. Ejecuta este script dentro de la carpeta del proyecto." >&2
  exit 1
fi

# Inicializa git si no está inicializado
if [[ ! -d ".git" ]]; then
  git init
  git config user.name "$GITHUB_USER"
  git config user.email "$GITHUB_EMAIL"
fi

# Añade todos los archivos y hace commit
git add .
# Usa una fecha de commit legible
git commit -m "Deploy EMCO Plan de Trabajo - GitHub Pages" || true

# Crea el repositorio remoto usando la API de GitHub (requiere GITHUB_TOKEN)
if [[ -z "$GITHUB_TOKEN" ]]; then
  echo "⚠️ No se ha definido GITHUB_TOKEN. Se intentará crear el repo vía git remote add (requiere que ya exista el repo en GitHub)."
  git remote add origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git" || true
else
  echo "Creando repositorio en GitHub usando la API..."
  curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -d "{\"name\": \"$GITHUB_REPO\", \"private\": false}" \
    https://api.github.com/user/repos
  git remote add origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git"
fi

# Push a la rama principal (main)
# Crea la rama si no existe todavía
if ! git rev-parse --verify main >/dev/null 2>&1; then
  git branch -M main
fi

git push -u origin main --force

# Habilitar GitHub Pages (usando la API) – publica la rama main en raíz (/)
if [[ -n "$GITHUB_TOKEN" ]]; then
  echo "Activando GitHub Pages vía API..."
  curl -s -X POST -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -d "{\"source\":{\"branch\":\"main\",\"path\":\"/\"}}" \
    https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO/pages
  echo "✅ GitHub Pages está habilitado. La URL será: https://$GITHUB_USER.github.io/$GITHUB_REPO/"
else
  echo "⚠️ No se pudo activar GitHub Pages automáticamente porque no se definió GITHUB_TOKEN."
  echo "Abre la página del repositorio en GitHub, ve a Settings → Pages y selecciona la rama 'main' → / (root) para publicarla manualmente."
fi

echo "--- FIN ---"
