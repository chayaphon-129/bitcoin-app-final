import React, { useEffect, useState } from "react";
import { Bar }  from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import './CryptoChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CryptoChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [coinDetails, setCoinDetails] = useState<any>(null);

  const fetchHistoricalData = async (cryptoId: string, days: string) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`);
      const result = await response.json();
      const chartData = {
        labels: result.prices.map((price: number[]) => new Date(price[0]).toLocaleDateString()),
        datasets: [
          {
            label: `${cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)} Price (USD)`,
            data: result.prices.map((price: number[]) => price[1]),
            backgroundColor: "rgba(75, 192, 192, 0.6)", // สีของแท่งกราฟ
          },
        ],
      };
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const fetchCoinDetails = async (cryptoId: string) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
      const result = await response.json();
      setCoinDetails(result);
    } catch (error) {
      console.error("Error fetching coin details:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData(crypto, "365");
    fetchCoinDetails(crypto);
  }, [crypto]);

  return (
    <div className="chart-container">
      <h2>{coinDetails ? coinDetails.name : 'Loading...'} Price History</h2>
      {coinDetails && (
        <div>
          <p>Current Price: ${coinDetails.market_data.current_price.usd}</p>
          <p>Market Cap: ${coinDetails.market_data.market_cap.usd}</p>
          <p>24h Trading Volume: ${coinDetails.market_data.total_volume.usd}</p>
          <p>24h Change: {coinDetails.market_data.price_change_percentage_24h}%</p>
        </div>
      )}
      <select className="crypto-select" onChange={(e) => setCrypto(e.target.value)} value={crypto}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="binancecoin">Binance Coin</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="tether">Tether</option>
        <option value="solana">Solana</option>
        <option value="ripple">XRP</option>
        <option value="tron">Tron</option>
        <option value="cardano">ADA</option>
        <option value="chainlink">LINK</option>
        <option value="filecoin">Filecoin</option>
        <option value="uniswap">UNI</option>
      </select>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `${crypto.charAt(0).toUpperCase() + crypto.slice(1)} Price Chart`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price (USD)",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default CryptoChart;
