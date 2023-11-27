import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import cookieParser from "cookie-parser";
import { fileURLToPath, URL } from "url";
const app = express();

// Get the current folder diectory ex.(system:/project/managers)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the api folder directory ex.(system:/project/api)
const apiDirectory = path.join(__dirname, "../api");
const buildDirectory = path.join(__dirname, "../client/build");

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
      res.status(500).send("Something went wrong!");
    });
    // app.use((req, res, next) => {
    //   res.status(404).send("Route not found. Please check api folder");
    // });
  };

  const setRoutes = () => {
    // Stores all the folders in the /api directory
    const routeFolders = fs.readdirSync(apiDirectory, { withFileTypes: true });

    // Loops through all the routes then sets folder name (api route) & route.js (middleware)
    routeFolders.forEach((routeName) => {
      if (routeName.isDirectory()) {
        const routeFolder = routeName.name;
        const routePath = path.join(apiDirectory, routeFolder, "route.js"); // /api/{routeFolder}/route.js
        const routeStats = fs.statSync(routePath); // Used to make sure the route leads to an exisiting file
        const fileURL = new URL(`file://${path.resolve(routePath)}`); // Create fileURl for import the middleware (route.js)

        if (routeStats.isFile() && routePath.endsWith(".js")) {
          import(fileURL)
            .then((module) => {
              const route = module.default;
              app.use(`/api/${routeFolder}`, route);
              console.log(`/api/${routeFolder} route created.`);
            })
            .catch((err) => {
              // handle errors while setting up routes
              console.error(
                `Error setting up route for ${routeFolder}: ${err}`
              );
            });
        }
      }
    });
  };

  const setBuildRoutes = () => {
    // Serve the built React app
    app.use(express.static(buildDirectory));

    // Handle React Router routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(buildDirectory, "index.html"));
    });
  };

  // The start method is ran in the main file of the server to the run the server
  const start = (startPort) => {
    setMiddlewares();
    handleBadRoutes();
    setBuildRoutes();
    setRoutes();
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
