document.getElementById('predict-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    age: parseInt(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    bmi: parseFloat(document.getElementById('bmi').value),
    children: parseInt(document.getElementById('children').value),
    smoker: document.getElementById('smoker').value,
    region: document.getElementById('region').value
  };

  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('show');
  resultDiv.textContent = 'Predicting...';

  try {
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const resData = await res.json();
    resultDiv.textContent = `Estimated Insurance Price: ₹ ${resData.predicted_price.toFixed(2)}`;
    resultDiv.classList.add('show');
  } catch (err) {
    resultDiv.textContent = 'Error fetching prediction.';
    resultDiv.classList.add('show');
    console.error(err);
  }
});
