run-dev:
	npm run dev

run:
	run-dev

install: 
	npm ci

.PHONY: build
build:
	npm run build

.PHONY: test
test-ci:
	npm run test:ci

