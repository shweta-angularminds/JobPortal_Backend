import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Skillset API",
      version: "1.0.0",
      description: "API documentation for the Skillset job portal.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
  },
  // Only scan the docs folder now -- routers stay free of JSDoc comments.
  // `schemas/*.ts` define reusable `components.schemas`,
  // the top-level `*.docs.ts` files define the actual paths.
  apis: ["./src/docs/schemas/*.ts", "./src/docs/*.docs.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
