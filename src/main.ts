import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from "dotenv";
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptors';
// import { join } from "path";

dotenv.config({
  path: `${process.cwd()}/.env`,
});

const { NODE_ENV = "development", PORT = 3000 } = process.env;
async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: true,
  });
  // app.useStaticAssets(join(__dirname, "..", "output"), {
  //   index: false,
  //   prefix: "/output",
  // });


  // Cors
  const options = {
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);

  // Body Parser
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix("/api");

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription(" API description")
    .setVersion("1.0")
    .addTag("Document")
    .addBearerAuth()
    .build();

  // show swagger only development
  if (["development", "build"].includes(NODE_ENV)) {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("document", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // firebase.initializeApp({
  //   credential: firebase.credential.cert(
  //     join(__dirname, '..', 'service-account.json'),
  //   ),
  // });

  // Multi Languages
  // i18n.configure({
  //   locales: LANGUAGES,
  //   directory: path.resolve("./src/locales"),
  //   updateFiles: false,
  //   autoReload: true,
  //   defaultLocale: configService.get("BASE_LANGUAGE") || "en",
  // });
  // app.use(i18n.init);
  // app.use((req, res, next) => {
  //   const language = req.header("Accept-Language");
  //   req.lang = language || configService.get("BASE_LANGUAGE") || "en";
  //   next();
  // });

  // const successbot = app.get(getBotToken("success"));
  // app.use(successbot.webhookCallback("/secret-path-success"));

  // const failurebot = app.get(getBotToken("failure"));
  // app.use(failurebot.webhookCallback("/secret-path-error"));

  // console.log("[process.env]-bootstrap", process.env.PORT);
  // app.useLogger(new AppService(configService, failurebot));

  await app.startAllMicroservices();

  console.table([
    {
      title: "App Start".toUpperCase(),
      body: `${`http://localhost:${PORT}/api`}`,
    },
    {
      title: "Swagger Documentation".toUpperCase(),
      body: `${`http://localhost:${PORT}/document`}`,
    },
  ]);

  await app.listen(PORT ?? 3000);

}
bootstrap();
