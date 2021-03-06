import { DevicesRoute } from './api/devices';
import * as bodyParser from "body-parser";
// import * as cookieParser from "cookie-parser";
import * as express from "express";
// import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
// import methodOverride = require("method-override");
import { IndexRoute } from "./routes/index";
import * as cors from "cors";

export class Server
{

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  public api() {
    let router: express.Router;
    router = express.Router();

    // use cors middleware
    router.use(cors());

    // Routes
    DevicesRoute.create(router);

    this.app.use('/api', router);
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));

    // this.app.engine('html', require('ejs').renderFile);
    // this.app.set('view engine', 'html');
    // this.app.set("view engine", "pug");

    //use logger middlware
    // this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //use cookie parser middleware
    // this.app.use(cookieParser("SECRET_GOES_HERE"));

    //use override middlware
    // this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}
