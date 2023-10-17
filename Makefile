build:
	docker compose up -d --build --remove-orphans

up:
	docker compose up -d

down:
	docker compose down

down-v:
	docker compose down -v

show-logs:
	docker compose logs