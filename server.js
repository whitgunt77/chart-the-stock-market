const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// In-memory store for active stock symbols (synced across users)
let trackedStocks = ["AAPL", "GOOGL", "MSFT", "AMZN"];

// Robust mock stock data generator for reliable development & testing
async function fetchStockData(symbol) {
  const upperSymbol = symbol.toUpperCase();

  // Generate last 30 days of dates
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  // Seed initial price based on symbol character codes for consistency
  let basePrice =
    (upperSymbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      150) +
    50;

  const prices = dates.map(() => {
    basePrice += (Math.random() - 0.48) * 4;
    return parseFloat(Math.max(10, basePrice).toFixed(2));
  });

  return {
    symbol: upperSymbol,
    dates: dates,
    prices: prices,
  };
}

// Gather all stock datasets concurrently
async function getAllStocksData() {
  const stockPromises = trackedStocks.map((symbol) => fetchStockData(symbol));
  return await Promise.all(stockPromises);
}

// WebSocket Connection Handling
io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);

  // Send current tracked stocks and their chart datasets upon connection
  socket.emit("init_stocks", await getAllStocksData());

  // Listen for user adding a new stock symbol
  socket.on("add_stock", async (symbol) => {
    const cleanSymbol = symbol.trim().toUpperCase();
    if (cleanSymbol && !trackedStocks.includes(cleanSymbol)) {
      trackedStocks.push(cleanSymbol);
      const stockData = await fetchStockData(cleanSymbol);

      // Broadcast update to ALL connected clients in real-time
      io.emit("stock_added", stockData);
    }
  });

  // Listen for user removing a stock symbol
  socket.on("remove_stock", (symbol) => {
    const cleanSymbol = symbol.trim().toUpperCase();
    trackedStocks = trackedStocks.filter((s) => s !== cleanSymbol);

    // Broadcast removal to ALL connected clients in real-time
    io.emit("stock_removed", cleanSymbol);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});
