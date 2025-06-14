const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simulated insurance prediction function
function predictInsurancePrice({ age, gender, bmi, children, smoker, region }) {
    const genderMap = { male: 0, female: 1 };
    const smokerMap = { no: 0, yes: 1 };
    const regionMap = { southwest: 0, southeast: 1, northwest: 2, northeast: 3 };

    const genderVal = genderMap[gender];
    const smokerVal = smokerMap[smoker];
    const regionVal = regionMap[region];

    const prediction =
        250 + age * 250 +
        bmi * 300 +
        children * 500 +
        smokerVal * 24000 -
        genderVal * 300 +
        regionVal * 100;

    return prediction.toFixed(2);
}

app.post('/predict', (req, res) => {
    const input = req.body;
    const predicted_price = predictInsurancePrice(input);
    res.json({ predicted_price });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
