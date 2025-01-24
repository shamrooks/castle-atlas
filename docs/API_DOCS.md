# API Documentation

## Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

## Skills
GET /api/skills
POST /api/skills/{id}/progress
GET /api/skills/{id}/details

## User Progress
GET /api/progress
POST /api/progress/update
GET /api/progress/stats

## Learning Paths
GET /api/paths
GET /api/paths/{id}
PUT /api/paths/{id}/progress