import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";
import { UserRoute } from "./routes/user.route";
import { ReportRoute } from "./routes/report.route";


const app = new App(
    [
        new AuthRoute(),
        new UserRoute(),
        new ReportRoute()
    ]
);