function calculateCostInputs(productCost, operationalCosts, marketingCosts, logisticsFees, platformCommissions, salesPrice, taxRate, unitsSold) {
    const totalProductCost = parseFloat(productCost);
    const totalOperationalCosts = parseFloat(operationalCosts);
    const totalMarketingCosts = parseFloat(marketingCosts);
    const totalLogisticsFees = parseFloat(logisticsFees);
    const totalPlatformCommissions = parseFloat(platformCommissions);
    const salesPricePerUnit = parseFloat(salesPrice);
    const taxRatePercentage = parseFloat(taxRate);
    const units = parseInt(unitsSold);

    // Toplam giderler
    const totalCosts = totalProductCost + totalOperationalCosts + totalMarketingCosts + totalLogisticsFees + totalPlatformCommissions;

    // Kâr marjı
    const profitMargin = salesPricePerUnit * units - totalCosts;

    // Vergi hesaplaması
    const taxAmount = profitMargin * (taxRatePercentage / 100);

    // Net Kâr
    const netProfit = profitMargin - taxAmount;

    return {
        totalCosts,
        profitMargin,
        taxAmount,
        netProfit,
    };
}

function testCalculate() {
    const productCost = document.getElementById("productCost").value;
    const operationalCosts = document.getElementById("operationalCosts").value;
    const marketingCosts = document.getElementById("marketingCosts").value;
    const logisticsFees = document.getElementById("logisticsFees").value;
    const platformCommissions = document.getElementById("platformCommissions").value;
    const salesPrice = document.getElementById("salesPrice").value;
    const taxRate = document.getElementById("taxRate").value;
    const unitsSold = document.getElementById("unitsSold").value;

    const results = calculateCostInputs(productCost, operationalCosts, marketingCosts, logisticsFees, platformCommissions, salesPrice, taxRate, unitsSold);

    document.getElementById("totalCosts").textContent = results.totalCosts.toFixed(2);
    document.getElementById("profitMargin").textContent = results.profitMargin.toFixed(2);
    document.getElementById("taxAmount").textContent = results.taxAmount.toFixed(2);
    document.getElementById("netProfit").textContent = results.netProfit.toFixed(2);
}
