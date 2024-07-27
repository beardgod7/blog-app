"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pgconnect_1 = require("./middleware/pgconnect");
const body_parser_1 = __importDefault(require("body-parser"));
const userroute_1 = __importDefault(require("./routes/userroute"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const interactionroute_1 = __importDefault(require("./routes/interactionroute"));
const sort_filterRoute_1 = __importDefault(require("./routes/sort-filterRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
dotenv_1.default.config({
    path: "/privacy/.env",
});
;
app.use('/api', sort_filterRoute_1.default);
app.use('/api', userroute_1.default);
app.use('/api', interactionroute_1.default);
(0, pgconnect_1.syncDatabase)();
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});
