.PHONY: lint build analyze

lint:
	@npm run lint

build:
	@npm run build

analyze: build
	@npm run analyze
