# typescript-service

The starting point template repository for developing TypeScript microservices. It provides a well-defined structure for building TypeScript-based applications and integrates into the organisations CI/CD workflows.

[![Maintainability](https://api.codeclimate.com/v1/badges/7f1efd504c8530d6d5b7/maintainability)](https://codeclimate.com/github/TogetherCrew/typescript-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f1efd504c8530d6d5b7/test_coverage)](https://codeclimate.com/github/TogetherCrew/typescript-service/test_coverage)

## Features

### Linter

The CI Pipeline uses [super-linter](https://github.com/super-linter/super-linter). You can run it locally with the following command:

```bash
docker run -e RUN_LOCAL=true -e TYPESCRIPT_DEFAULT_STYLE=prettier -e VALIDATE_DOCKERFILE_HADOLINT=false -v $(pwd):/tmp/lint github/super-linter:slim-latest
```

Note: We have disabled HADOLINT for now as we are getting an error: `qemu: uncaught target signal 11 (Segmentation fault) - core dumped`.

### Tests

The CI Pipeline uses the `test` target from the Dockerfile to run the tests. You can run it locally with the following command:

```bash
docker compose -f docker-compose.test.yml up --exit-code-from app
```

Note: This will create a /coverage folder where you can review the coverage details.

### Development Environment

You can run all the integration services using the following command:

```bash
docker compose -f docker-compose.dev.yml up
```

#### Supported Services

- MongoDB
- Redis
