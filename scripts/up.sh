set -e

ENV=${1:-development}
ENV_FILE=".env.$ENV"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE"
  exit 1
fi

export COMPOSE_PROFILES=$ENV

docker compose \
  --env-file "$ENV_FILE" \
  up --build
