document.getElementById("batteryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const min = parseFloat(document.getElementById("minVolts").value);
  const max = parseFloat(document.getElementById("maxVolts").value);
  const current = parseFloat(document.getElementById("currentVolts").value);
  const resultDiv = document.getElementById("result");

  if (current < min || current > max) {
    resultDiv.style.display = "block";
    resultDiv.className = "text-center mt-4 fw-semibold shadow-sm";
    resultDiv.style.backgroundColor = "#f9f9f9"; // off-white background
    resultDiv.style.border = "1px solid #00000022"; // thin soft black border
    resultDiv.style.color = "#000000"; // black text
    resultDiv.style.borderRadius = "8px"; // gentle rounding
    resultDiv.style.padding = "1.5rem"; // comfortable padding
    resultDiv.innerHTML = `<span style="color: red;">Voltage must be between ${min}V and ${max}V.</span>`;
    return;
  }

  const percent = ((current - min) / (max - min)) * 100;
  const roundedPercent = Math.round(percent);

  // ✅ Display the result with off-white background and subtle border
  resultDiv.style.display = "block";
  resultDiv.className = "text-center mt-4 fw-semibold shadow-sm";
  resultDiv.style.backgroundColor = "#f9f9f9"; // off-white (not blue)
  resultDiv.style.border = "1px solid #00000022"; // thin soft black border
  resultDiv.style.color = "#000000"; // black text
  resultDiv.style.borderRadius = "8px"; // gentle rounded corners
  resultDiv.style.padding = "1.5rem"; // interior spacing

  resultDiv.innerHTML = `
    <div style="font-size: 4rem; font-weight: bold; line-height: 1;">
      ${roundedPercent}%
    </div>
    <hr class="my-2" style="border-top: 1px solid #00000022; width: 60%; margin: 0.5rem auto;" />
    <div style="font-size: 1.25rem;">
      Battery Power Remaining
    </div>
  `;
});
