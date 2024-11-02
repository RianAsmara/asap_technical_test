.PHONY: dev build seed

dev:
	npm run dev

build:
	npm run build

seed:
	npm run seed

infra:
	@echo "🚢 Starting service..."
	@docker-compose -f docker-compose.yml down -v || true
	@docker-compose -f docker-compose.yml up -d --force-recreate db
	@sleep 2
