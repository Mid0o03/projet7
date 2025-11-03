// script.js - Multi-Convertisseur

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // --- Convertisseur de devises ---
  const devisesSection = document.getElementById("devises");

  devisesSection.innerHTML += `
    <form id="currency-form">
      <input type="number" id="amount" placeholder="Montant" required />
      <select id="from-currency">
        <option value="EUR">Euro (EUR)</option>
        <option value="USD">Dollar (USD)</option>
        <option value="JPY">Yen (JPY)</option>
      </select>
      <select id="to-currency">
        <option value="USD">Dollar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="JPY">Yen (JPY)</option>
      </select>
      <div class="result" id="currency-result">Résultat : </div>
    </form>
  `;

  const rateMap = {
    EUR: { USD: 1.08, JPY: 169.36, EUR: 1 },
    USD: { EUR: 0.93, JPY: 157.1, USD: 1 },
    JPY: { EUR: 0.0059, USD: 0.0064, JPY: 1 }
  };

  document.getElementById("currency-form").addEventListener("input", () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;

    if (!isNaN(amount)) {
      const rate = rateMap[from][to];
      const result = (amount * rate).toFixed(2);
      document.getElementById("currency-result").textContent = `Résultat : ${result} ${to}`;
    } else {
      document.getElementById("currency-result").textContent = "Résultat : ";
    }
  });

  // --- Convertisseur de température ---
  const tempSection = document.getElementById("temperature");

  tempSection.innerHTML += `
    <form id="temp-form">
      <input type="number" id="temp-value" placeholder="Température" required />
      <select id="from-temp">
        <option value="C">Celsius (°C)</option>
        <option value="F">Fahrenheit (°F)</option>
        <option value="K">Kelvin (K)</option>
      </select>
      <select id="to-temp">
        <option value="F">Fahrenheit (°F)</option>
        <option value="C">Celsius (°C)</option>
        <option value="K">Kelvin (K)</option>
      </select>
      <div class="result" id="temp-result">Résultat : </div>
    </form>
  `;

  const convertTemp = (value, from, to) => {
    let celsius;
    if (from === "C") celsius = value;
    else if (from === "F") celsius = (value - 32) * 5 / 9;
    else if (from === "K") celsius = value - 273.15;

    if (to === "C") return celsius;
    if (to === "F") return (celsius * 9 / 5) + 32;
    if (to === "K") return celsius + 273.15;
  };

  document.getElementById("temp-form").addEventListener("input", () => {
    const value = parseFloat(document.getElementById("temp-value").value);
    const from = document.getElementById("from-temp").value;
    const to = document.getElementById("to-temp").value;

    if (!isNaN(value)) {
      const result = convertTemp(value, from, to).toFixed(2);
      document.getElementById("temp-result").textContent = `Résultat : ${result} °${to}`;
    } else {
      document.getElementById("temp-result").textContent = "Résultat : ";
    }
  });

  // --- Convertisseur de longueurs ---
  const lengthSection = document.getElementById("longueur");

  lengthSection.innerHTML += `
    <form id="length-form">
      <input type="number" id="length-value" placeholder="Longueur" required />
      <select id="from-length">
        <option value="m">Mètre (m)</option>
        <option value="cm">Centimètre (cm)</option>
        <option value="km">Kilomètre (km)</option>
      </select>
      <select id="to-length">
        <option value="m">Mètre (m)</option>
        <option value="cm">Centimètre (cm)</option>
        <option value="km">Kilomètre (km)</option>
      </select>
      <div class="result" id="length-result">Résultat : </div>
    </form>
  `;

  const convertLength = (value, from, to) => {
    const toMeter = {
      m: 1,
      cm: 0.01,
      km: 1000
    };

    const fromMeter = {
      m: 1,
      cm: 100,
      km: 0.001
    };

    return value * toMeter[from] * fromMeter[to];
  };

  document.getElementById("length-form").addEventListener("input", () => {
    const value = parseFloat(document.getElementById("length-value").value);
    const from = document.getElementById("from-length").value;
    const to = document.getElementById("to-length").value;

    if (!isNaN(value)) {
      const result = convertLength(value, from, to).toFixed(2);
      document.getElementById("length-result").textContent = `Résultat : ${result} ${to}`;
    } else {
      document.getElementById("length-result").textContent = "Résultat : ";
    }
  });

  // --- Convertisseur de poids ---
  const poidsSection = document.getElementById("poids");

  poidsSection.innerHTML += `
    <form id="weight-form">
      <input type="number" id="weight-value" placeholder="Poids" required />
      <select id="from-weight">
        <option value="kg">Kilogramme (kg)</option>
        <option value="g">Gramme (g)</option>
        <option value="lb">Livre (lb)</option>
      </select>
      <select id="to-weight">
        <option value="kg">Kilogramme (kg)</option>
        <option value="g">Gramme (g)</option>
        <option value="lb">Livre (lb)</option>
      </select>
      <div class="result" id="weight-result">Résultat : </div>
    </form>
  `;

  const convertWeight = (value, from, to) => {
    const toKg = {
      kg: 1,
      g: 0.001,
      lb: 0.453592
    };

    const fromKg = {
      kg: 1,
      g: 1000,
      lb: 2.20462
    };

    return value * toKg[from] * fromKg[to];
  };

  document.getElementById("weight-form").addEventListener("input", () => {
    const value = parseFloat(document.getElementById("weight-value").value);
    const from = document.getElementById("from-weight").value;
    const to = document.getElementById("to-weight").value;

    if (!isNaN(value)) {
      const result = convertWeight(value, from, to).toFixed(2);
      document.getElementById("weight-result").textContent = `Résultat : ${result} ${to}`;
    } else {
      document.getElementById("weight-result").textContent = "Résultat : ";
    }
  });
});
