// calculate.js
export default function handler(req, res) {
    if (req.method === "POST") {
        const {
            productCost,
            operationalCosts,
            marketingCosts,
            logisticsFees,
            platformCommissions,
            salesPrice,
            taxRate,
            unitsSold
        } = req.body;

        // Tüm değerleri sayıya çevirme
        const totalProductCost = parseFloat(productCost);
        const totalOperationalCosts = parseFloat(operationalCosts);
        const totalMarketingCosts = parseFloat(marketingCosts);
        const totalLogisticsFees = parseFloat(logisticsFees);
        const totalPlatformCommissions = parseFloat(platformCommissions);
        const salesPricePerUnit = parseFloat(salesPrice);
        const taxRatePercentage = parseFloat(taxRate);
        const units = parseInt(unitsSold);

        // Hesaplamalar
        const totalCosts = totalProductCost + totalOperationalCosts + totalMarketingCosts + totalLogisticsFees + totalPlatformCommissions;
        const totalRevenue = salesPricePerUnit * units; // Toplam gelir
        const grossProfit = totalRevenue - totalProductCost; // Brüt kâr (gelir - ürün maliyeti)
        const activityProfit = grossProfit - totalPlatformCommissions; // Faaliyet kârı (brüt kâr - platform komisyonları)
        const profitMargin = (activityProfit / totalRevenue) * 100; // Kâr marjı (%)
        const costPerUnit = totalCosts / units; // Birim başına maliyet
        const suggestedSalesPrice = costPerUnit * 1.2; // Satış fiyatı önerisi (örnek: %20 kâr marjı için)

        res.status(200).json({
            totalCosts: totalCosts.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
            grossProfit: grossProfit.toFixed(2),
            activityProfit: activityProfit.toFixed(2),
            profitMargin: profitMargin.toFixed(2),
            costPerUnit: costPerUnit.toFixed(2),
            suggestedSalesPrice: suggestedSalesPrice.toFixed(2)
        });
    } else {
        res.status(405).json({ message: "Only POST requests are allowed" });
    }
}
