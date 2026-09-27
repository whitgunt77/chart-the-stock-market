# 📈 Chart the Stock Market

A full-stack, real-time collaborative stock trend tracking application built with Node.js, Express, Socket.io, and Chart.js. This project fulfills the FreeCodeCamp "Chart the Stock Market" challenge specifications.

---

## ✨ Features

- **Interactive Trend Graphs:** Visualize recent price trend lines for multiple stocks simultaneously using Chart.js.
- **Dynamic Stock Management:** Add new stock tickers by symbol or remove existing ones seamlessly.
- **Real-Time Synchronization:** Powered by **Socket.io**, any stock added or removed by a user instantly updates across all connected clients in real-time.
- **Reliable Time-Series Data:** Features robust fallback generation for steady, smooth trends.

---

## 🛠️ Tech Stack

- **Front-End:** HTML5, Tailwind CSS, JavaScript (ES6+), Chart.js
- **Back-End:** Node.js, Express, Socket.io

---

## User Stories Implemented

1. **View Graph:** You can view a graph displaying the recent trend lines for each added stock.
2. **Add Stocks:** You can add new stocks by their symbol name.
3. **Remove Stocks:** You can remove stocks using the interactive tags.
4. **Real-time Sync:** You can see changes in real-time when any other user adds or removes a stock via WebSockets.

---

## Local Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/whitgunt77/chart-the-stock-market.git](https://github.com/whitgunt77/chart-the-stock-market.git)
   cd chart-the-stock-market
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   npm start
   ```

4. **Open in your browser:**
   Navigate to `http://localhost:3000`. Open multiple tabs to watch the real-time WebSocket updates in action!

---

## License

MIT License
