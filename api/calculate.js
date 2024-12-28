// Form elemanlarını ve butonu seçelim
const form = document.getElementById("calculatorForm");
const button = document.querySelector("button");

// Formdaki input alanlarını alalım
const inputs = form.querySelectorAll("input");

// İlk başta butonu gri yapalım
button.style.backgroundColor = "#808080"; // Gri

// Inputlardaki her değişikliği izleyelim
inputs.forEach(input => {
    input.addEventListener("input", checkForm);
});

// Formu kontrol eden fonksiyon
function checkForm() {
    // Eğer tüm inputlar doluysa
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");

    // Eğer tüm inputlar doluysa buton yeşil olacak, aksi takdirde gri
    if (allFilled) {
        button.style.backgroundColor = "#4CAF50"; // Yeşil
        button.disabled = false; // Butonu aktif hale getiriyoruz
    } else {
        button.style.backgroundColor = "#808080"; // Gri renk
        button.disabled = true; // Butonu pasif yapıyoruz
    }
}

// Hesaplama işlemi
async function testCalculate() {
    const productCost = document.getElementById("productCost").value;
    const operationalCosts = document.getElementById("operationalCosts").value;
    const marketingCosts = document.getElementById("marketingCosts").value;
    const logisticsFees = document.getElementById("logisticsFees").value;
    const platformCommissions = document.getElementById("platformCommissions").value;
    const salesPrice = document.getElementById("salesPrice").value;
    const unitsSold = document.getElementById("unitsSold").value;

    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productCost,
                operationalCosts,
                marketingCosts,
                logisticsFees,
                platformCommissions,
                salesPrice,
                unitsSold
            }),
        });

        if (!response.ok) {
            throw new Error("Hesaplama sırasında bir hata oluştu.");
        }

        const results = await response.json();

        // Sonuçları güncelle
        document.getElementById("totalCosts").textContent = results.totalCosts;
        document.getElementById("totalRevenue").textContent = results.totalRevenue;
        document.getElementById("grossProfit").textContent = results.grossProfit;
        document.getElementById("activityProfit").textContent = results.activityProfit;
        document.getElementById("profitMargin").textContent = results.profitMargin + "%";
        document.getElementById("costPerUnit").textContent = results.costPerUnit;
    } catch (error) {
        console.error(error);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
}
