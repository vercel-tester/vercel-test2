export default function handler(req, res) {
    if (req.method === "POST") {
        const {
            unitsSold,
            productCost,
            operationalCosts,
            marketingCosts,
            logisticsFees,
            platformCommissions,
            salesPrice
        } = req.body;


        const units = parseInt(unitsSold);
        const totalProductCost = parseFloat(productCost);
        const totalOperationalCosts = parseFloat(operationalCosts);
        const totalMarketingCosts = parseFloat(marketingCosts);
        const totalLogisticsFees = parseFloat(logisticsFees);
        const totalPlatformCommissions = parseFloat(platformCommissions);
        const salesPricePerUnit = parseFloat(salesPrice);

        // Hesaplamalar
        const totalCosts = totalProductCost + totalOperationalCosts + totalMarketingCosts + totalLogisticsFees;
        const totalRevenue = salesPricePerUnit * units;
        const platformDeductions = totalPlatformCommissions * totalRevenue / 100;
        const grossProfit = totalRevenue - productCost; 
        const activityProfit = grossProfit - totalCosts + totalProductCost - platformDeductions ; 
        const profitMargin = (activityProfit / totalRevenue) * 100; 
        const costPerUnit = totalCosts / units; 

        res.status(200).json({
            totalCosts: totalCosts.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
            platformDeductions: platformDeductions.toFixed(2),
            grossProfit: grossProfit.toFixed(2),
            activityProfit: activityProfit.toFixed(2),
            profitMargin: profitMargin.toFixed(2),
            costPerUnit: costPerUnit.toFixed(2)
        });
    } else {
        res.status(405).json({ message: "Only POST requests are allowed" });
    }
}
