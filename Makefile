.PHONY: lint build analyze

default:
	@npm start

lint:
	@npm run lint

build:
	@npm run build

analyze: build
	@npm run analyze
