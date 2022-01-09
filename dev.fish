#!/usr/bin/fish
echo "Start DB"
docker-compose up -d mongo
echo "Start API"
fish -c "cd backend && fish ./dev.fish" &
echo "Start Frontend"
fish -c "cd frontend && fish ./dev.fish" &
echo "Done"