# Travel-Planner
Website to planning trips

# Setup
- Start NodeJS Backend: npm start (Create DB if empty)
- Run Seeders: sequelize db:seed:all
- Start frontend: npm start

### Obs

- React have problem with webpack package. To solve this, create .env file in react-src with this content:
SKIP_PREFLIGHT_CHECK=true