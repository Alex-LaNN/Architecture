import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const port = 3000;

// Enum для кнопок.
enum ButtonEnum {
  Plus = "Plus",
  Minus = "Minus",
};

// Инициализация счетчиков для отображения количества нажатий кнопок.
let clickCounts = {
  [ButtonEnum.Plus]: 0,
  [ButtonEnum.Minus]: 0,
};

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('front'))

// Роут для обработки нажатий кнопок.
app.post("/", (req, res) => {
  const buttonType: ButtonEnum = req.body.buttonType;
  console.log(`27 buttonType: < ${buttonType} >`);

  if (Object.values(ButtonEnum).includes(buttonType)) {
    clickCounts[buttonType]++;
    console.log(`31 clickCounts: ${JSON.stringify(clickCounts)}`);
    res.json({
      plus: clickCounts[ButtonEnum.Plus],
      minus: clickCounts[ButtonEnum.Minus],
    });
  } else {
    res.status(400).json({ error: "Invalid button type" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

