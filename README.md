# pricing-api

REST provider repository for the OpenAPI demo.

Contract: `specs/pricing.yaml`

## Run the service

```bash
docker compose up --build
```

Service listens on `http://localhost:9000`.

## Run contract tests

```bash
docker run --rm -it \
  -v "$(pwd):/usr/src/app" \
  -v ~/.specmatic:/root/.specmatic \
  --network=host \
  specmatic/enterprise \
  test
```

Reports are written under `build/reports/specmatic`.
