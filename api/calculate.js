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

        // Hesaplamalar
        const totalProductCost = parseFloat(productCost);
        const totalOperationalCosts = parseFloat(operationalCosts);
        const totalMarketingCosts = parseFloat(marketingCosts);
        const totalLogisticsFees = parseFloat(logisticsFees);
        const totalPlatformCommissions = parseFloat(platformCommissions);
        const salesPricePerUnit = parseFloat(salesPrice);
        const taxRatePercentage = parseFloat(taxRate);
        const units = parseInt(unitsSold);

        const totalCosts = totalProductCost + totalOperationalCosts + totalMarketingCosts + totalLogisticsFees + totalPlatformCommissions;
        const profitMargin = salesPricePerUnit * units - totalCosts;
        const taxAmount = profitMargin * (taxRatePercentage / 100);
        const netProfit = profitMargin - taxAmount;

        res.status(200).json({
            totalCosts: totalCosts.toFixed(2),
            profitMargin: profitMargin.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            netProfit: netProfit.toFixed(2),
        });
    } else {
        res.status(405).json({ message: "Only POST requests are allowed" });
    }
}
