fetch("https://api.hypixel.net/v2/skyblock/bazaar")
  .then(response => response.json())
  .then(res => {
    const products = res.products;
    let tableRows = '';

    const tableHeaders = `
      <tr>
        <th>Product ID</th>
        <th>Sell Price</th>
        <th>Sell Volume</th>
        <th>Sell Moving Week</th>
        <th>Sell Orders</th>
        <th>Buy Price</th>
        <th>Buy Volume</th>
        <th>Buy Moving Week</th>
        <th>Buy Orders</th>
      </tr>
    `;

    const BuggedProductNames = {
      "INK_SACK:3": "COCOA BEANS",
      "INK_SACK:4": "LAPIS LAZULI",
      "LOG_2:1": "DARK OAK WOOD",
      "RAW_FISH:3": "PUFFERFISH",
      "RAW_FISH:2": "CLOWNFISH",
      "RAW_FISH:1": "RAW SALMON",
      "LOG:1": "SPRUCE WOOD",
      "LOG:3": "JUNGLE WOOD",
      "LOG:2": "BIRCH WOOD",
      "SAND:1": "RED SAND"
    }

    for (const productId in products) {
      const product = products[productId];
      const quickStatus = product.quick_status;
      const SellPrice = parseFloat(quickStatus.sellPrice).toFixed(1);
      const BuyPrice = parseFloat(quickStatus.buyPrice).toFixed(1);  
      const formattedProductId = BuggedProductNames[productId] || productId.replace(/_/g, ' ');
      
      tableRows += `
        <tr>
          <td>${formattedProductId}</td>
          <td>$${SellPrice}</td>
          <td>${quickStatus.sellVolume}</td>
          <td>${quickStatus.sellMovingWeek}</td>
          <td>${quickStatus.sellOrders}</td>
          <td>$${BuyPrice}</td>
          <td>${quickStatus.buyVolume}</td>
          <td>${quickStatus.buyMovingWeek}</td>
          <td>${quickStatus.buyOrders}</td>
        </tr>
      `;
    }

    const tableHTML = `<table>${tableHeaders}${tableRows}</table>`;

    document.getElementById('bazaarinfo').innerHTML = tableHTML;
  });

