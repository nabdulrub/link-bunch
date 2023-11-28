import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath, URL } from "url";
const app = express();

// Get the current folder diectory ex.(system:/project/managers)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the api folder directory ex.(system:/project/api)
const apiDirectory = path.join(__dirname, "../api");
const buildDirectory = path.join(__dirname, "../client/dist");

export const ServerManager = () => {
  const setMiddlewares = () => {
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    dotenv.config();
  };

  const handleBadRoutes = () => {
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Internal Server Error" });
    });

    // Route not found middleware
    app.use((req, res, next) => {
      res
        .status(404)
        .json({ error: "Route not found. Please check api folder" });
    });
  };

  const setRoutes = async () => {
    const routeFolders = fs.readdirSync(apiDirectory, { withFileTypes: true });

    // Use map to create an array of promises
    const routePromises = routeFolders.map(async (routeName) => {
      if (routeName.isDirectory()) {
        const routeFolder = routeName.name;
        const routePath = path.join(apiDirectory, routeFolder, "route.js");
        const routeStats = fs.statSync(routePath);

        if (routeStats.isFile() && routePath.endsWith(".js")) {
          const fileURL = new URL(`file://${path.resolve(routePath)}`);
          try {
            const module = await import(fileURL);
            const route = module.default;
            const routePath = `/api/${routeFolder}`;
            app.use(routePath, route);
            console.log(`${routePath} route created.`);
          } catch (err) {
            console.error(`Error setting up route for ${routeFolder}: ${err}`);
          }
        }
      }
    });

    // Use Promise.all to wait for all dynamic imports to resolve
    await Promise.all(routePromises);
  };

  const setBuildRoutes = () => {
    // Serve the built React app
    app.use(express.static(buildDirectory));

    // Handle React Router routes
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(buildDirectory, "index.html"));
    });
  };

  // The start method is ran in the main file of the server to the run the server
  const start = async (startPort) => {
    setMiddlewares();
    await setRoutes();
    await setBuildRoutes();
    handleBadRoutes();
    const port = startPort;
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    });
  };

  // For external use for things such as middlewares
  const use = (args) => {
    app.use(args);
  };

  return { start, use };
};
