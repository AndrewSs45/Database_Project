# Database Tables Viewer

A Node.js web server built with Clean Architecture principles that displays MySQL database tables in a beautiful, formatted landing page for my students.

## 🏗️ Architecture

This project follows Clean Architecture principles with clear separation of concerns:

```
src/
├── domain/                 # Enterprise Business Rules
│   ├── entities/          # Domain entities
│   └── repositories/      # Repository interfaces
├── application/           # Application Business Rules
│   └── use-cases/        # Use case implementations
├── infrastructure/        # Frameworks & Drivers
│   ├── database/         # Database connection
│   ├── repositories/     # Repository implementations
│   └── server.js         # Express server setup
└── interface/            # Interface Adapters
    ├── controllers/      # HTTP controllers
    ├── routes/          # Route definitions
    └── views/           # EJS templates
```

## 🚀 Features

- ✅ Clean Architecture implementation
- ✅ MySQL database integration
- ✅ Beautiful, responsive landing page
- ✅ Displays all tables with data
- ✅ Modern gradient design
- ✅ Error handling
- ✅ Environment variable configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Open `.env` file
   - Replace placeholders with your MySQL credentials:
     - `DB_HOST`: Your MySQL host (e.g., localhost)
     - `DB_USER`: Your MySQL username
     - `DB_PASSWORD`: Your MySQL password
     - `DB_NAME`: Your database name
     - `DB_PORT`: MySQL port (default: 3306)
     - `PORT`: Server port (default: 3000)

  3. (Optional) If you plan to use the frontend bundling with Webpack, install dev dependencies and build once:

  ```bash
  npm run build
  ```

  During development you can run Webpack in watch mode in a separate terminal:

  ```bash
  npm run dev:webpack
  ```

## 🏃 Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

If you're also developing front-end assets, in another terminal run:

```bash
npm run dev:webpack
```

### Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000`

## 🌐 Deployment

### Deploy to Heroku:

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Add MySQL addon (ClearDB):
```bash
heroku addons:create cleardb:ignite
```

4. Get database credentials:
```bash
heroku config | grep CLEARDB_DATABASE_URL
```

5. Set environment variables:
```bash
heroku config:set DB_HOST=your_host
heroku config:set DB_USER=your_user
heroku config:set DB_PASSWORD=your_password
heroku config:set DB_NAME=your_database
heroku config:set DB_PORT=3306
```

6. Deploy:
```bash
git add .
git commit -m "Initial commit"
git push heroku main
```

Before deploying, make sure to build the frontend assets and include them in the release. Heroku's build environment will run `npm install` but not `npm run build` automatically unless you configure it. To ensure assets are built, add a `heroku-postbuild` script in `package.json` or build locally and push `dist/` to the repo.

Example `package.json` scripts you may add:

```json
"scripts": {
  "heroku-postbuild": "npm run build"
}
```

### Deploy to Railway:

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add MySQL plugin in Railway dashboard

4. Deploy:
```bash
railway up
```

Railway runs build steps detected from `package.json`. Ensure `npm run build` is available if you want assets built during deployment.

### Deploy to Render:

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Add MySQL database service
4. Set environment variables in Render dashboard
5. Deploy automatically on push

Render and similar hosts also run the build step; ensure `npm run build` is present in the build command or add it to `package.json` as shown above.

## 📝 Environment Variables

Required variables in `.env`:

- `DB_HOST`: MySQL server host
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: Database name
- `DB_PORT`: MySQL port (default: 3306)
- `PORT`: Application port (default: 3000)

Extra (optional):

- `BANK_TABLE_NAME`: name of the table displayed by `/bank`
- `CUSTOM_SQL_QUERY`: SQL string executed by the `/query` page


## 🎨 Features

- **Clean Architecture**: Separation of concerns with domain, application, infrastructure, and interface layers
- **Dependency Injection**: Loose coupling between layers
- **Repository Pattern**: Abstract data access
- **Use Cases**: Encapsulated business logic
- **Beautiful UI**: Modern gradient design with animations
- **Responsive**: Works on all screen sizes
- **Error Handling**: Graceful error display

## 🛠️ Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MySQL2**: MySQL client
- **EJS**: Template engine
- **dotenv**: Environment variable management
 - **Webpack**: Bundles front-end assets (JS/CSS)
 - **Babel**: Transpiles modern JS for browser compatibility


## 📄 License

ISC

## 👤 Author

Your Name

---

Made with ❤️ using Clean Architecture

## Webpack: How it works here

- Entry: `src/frontend/index.js` imports `src/frontend/styles.css`.
- Build output: `dist/main.bundle.js` and `dist/main.css`.
- Views include these assets when `NODE_ENV=production` so the server will serve the built files from `/dist`.

Commands:

```bash
# build production assets
npm run build

# watch and rebuild during development
npm run dev:webpack
```

Serving locally with built assets:

1. Build assets: `npm run build`
2. Start the server: `npm start`
3. Open `http://localhost:3000`

If you prefer live reload for frontend changes, run `npm run dev:webpack` in a separate terminal while running `npm run dev` for the backend.
