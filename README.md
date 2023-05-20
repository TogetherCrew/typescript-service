# typescript-service

The starting point template repository for developing TypeScript microservices. It provides a well-defined structure for building TypeScript-based applications and integrates into the organisations CI/CD workflows.

[![Maintainability](https://api.codeclimate.com/v1/badges/7f1efd504c8530d6d5b7/maintainability)](https://codeclimate.com/github/TogetherCrew/typescript-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f1efd504c8530d6d5b7/test_coverage)](https://codeclimate.com/github/TogetherCrew/typescript-service/test_coverage)

## Features

### Linter

The CI Pipeline uses [super-linter](https://github.com/super-linter/super-linter). You can run it locally with the following command:

```bash
docker run -e RUN_LOCAL=true -e TYPESCRIPT_DEFAULT_STYLE=prettier -v $(pwd):/tmp/lint github/super-linter:slim-latest
```