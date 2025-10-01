# Poolder Beefy LP Table
## Run with docker
Simply run this command in the root folder:
```
docker compose up
```

This will start:
- Redis on port 6379
- Backend API on port 5266
- Frontend on port 3000
## Run locally
**Prerequisite:**
You need a running instance of Redis:
```
docker run --name my-redis -p 6379:6379 -d redis
```

**Backend:**
```
cd Poolder.Beefy.API
dotnet run
```
**Frontend:**
```
cd poolder-beefy-frontend
npm i
npm run dev
```

## Tech stack

Backend
- .NET Web API
- Redis for caching
- Swagger/OpenAPI API documentation

Frontend
- Next.js
- React
- TypeScript
- Tailwind
- shadcn/ui components