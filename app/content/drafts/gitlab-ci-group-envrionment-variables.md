
- instead of setting env in CI/CD variables add variables to each stage

```yaml
non_production:deploy:
  stage: deploy_non_production
  environment:
    name: Non-Production
  variables:
    DOCKER_REGISTRY: $NONPRODUCTION_DOCKER_REGISTRY
    DOCKER_REGISTRY_USER: $NONPRODUCTION_DOCKER_REGISTRY_USER
    DOCKER_REGISTRY_PASS: $NONPRODUCTION_DOCKER_REGISTRY_PASS
  extends:
    - .deploy
  needs:
    - image:build
  only:
    - main
    - env/sandbox

production:deploy:
  stage: deploy_production
  when: manual
  environment:
    name: Production
  variables:
    DOCKER_REGISTRY: $PRODUCTION_DOCKER_REGISTRY
    DOCKER_REGISTRY_USER: $PRODUCTION_DOCKER_REGISTRY_USER
    DOCKER_REGISTRY_PASS: $PRODUCTION_DOCKER_REGISTRY_PASS
  extends:
    - .deploy
  needs:
    - image:build
    - non_production:deploy
  only:
    - main
```
