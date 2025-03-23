"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("../config/database"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./Routes/thoughtRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/thoughts', thoughtRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
