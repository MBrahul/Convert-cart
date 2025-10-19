import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My App API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for the backend.",
    },
    servers: [
      {
        url: "https://backend-biq4.onrender.com", 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at /api-docs");
}

export default swaggerDocs;
