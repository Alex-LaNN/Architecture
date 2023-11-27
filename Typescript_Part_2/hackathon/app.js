"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Enum для кнопок.
var ButtonEnum;
(function (ButtonEnum) {
    ButtonEnum["Plus"] = "Plus";
    ButtonEnum["Minus"] = "Minus";
})(ButtonEnum || (ButtonEnum = {}));
;
// Инициализация счетчиков для отображения количества нажатий кнопок.
let clickCounts = {
    [ButtonEnum.Plus]: 0,
    [ButtonEnum.Minus]: 0,
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('front'));
// Роут для обработки нажатий кнопок.
app.post("/", (req, res) => {
    const buttonType = req.body.buttonType;
    console.log(`27 buttonType: < ${buttonType} >`);
    if (Object.values(ButtonEnum).includes(buttonType)) {
        clickCounts[buttonType]++;
        console.log(`31 clickCounts: ${JSON.stringify(clickCounts)}`);
        res.json({
            plus: clickCounts[ButtonEnum.Plus],
            minus: clickCounts[ButtonEnum.Minus],
        });
    }
    else {
        res.status(400).json({ error: "Invalid button type" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
