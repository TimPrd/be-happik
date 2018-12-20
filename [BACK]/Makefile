##---
##Salut
##---

db-migrations: ## Execute migrations
	docker exec -i -t bh_postgres psql admin admin -f sql/migrations.sql

db-seeds: ## Import seeds
	docker exec -it bh_postgres psql admin admin -f sql/seeds.sql

db-install: ## Drop seeds
	docker exec -it bh_node node_modules/.bin/sequelize db:migrate
	docker exec -it bh_node node_modules/.bin/sequelize db:seed:all


# DEFAULT
.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help

## ---