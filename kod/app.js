const Koa = require("koa");
const cors = require("@koa/cors"); // Koristi @koa/cors paket
const bodyParser = require("koa-bodyparser");
const swagger = require("swagger-generator-koa");
const options = require("./config/swagger");

const app = new Koa();

// Konfiguracija CORS-a
const corsOptions = {
  origin: "*", // Ako želiš dopustiti sve izvore, ili možeš navesti specifične URL-ove
  methods: ["GET", "POST", "PUT", "DELETE"], // Dozvoljene metode
  allowedHeaders: ["Content-Type", "Authorization"], // Dozvoljena zaglavlja
  preflightContinue: false,
  optionsSuccessStatus: 204, // Neki stariji preglednici ne prepoznaju 200 kao odgovor za preflight
};

// Omogućavanje CORS-a
app.use(cors(corsOptions));

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

// Rute za tvoje API-endpointe
app.use(require("./route/user").routes());
app.use(require("./route/post").routes());
app.use(require("./route/like").routes());

// Swagger dokumentacija
swagger.serveSwagger(app, "/swagger", options, {
  routePath: "./route",
  requestModelPath: "./requestModel",
});

module.exports = app;
