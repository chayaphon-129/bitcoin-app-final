import React, { useEffect, useState } from "react";
import "./App.css";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  usd_price: number;
  thb_price: number;
}

const CRYPTOS = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "dogecoin",
  "tether",
  "solana",
  "ripple",
  "tron",
  "cardano",
  "chainlink",
  "filecoin",
  "uniswap",
];

const App: React.FC = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCryptoIndex, setCurrentCryptoIndex] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch USD prices
      const usdResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTOS.join(",")}`
      );
      const usdData = await usdResponse.json();

      // Fetch THB prices
      const thbResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&ids=${CRYPTOS.join(",")}`
      );
      const thbData = await thbResponse.json();

      // Map THB prices by crypto id for easy access
      const thbPriceMap = new Map(thbData.map((coin: any) => [coin.id, coin.current_price]));

      // Combine data into single array
      const combinedData: CryptoData[] = usdData.map((usdCoin: any) => ({
        id: usdCoin.id,
        name: usdCoin.name,
        symbol: usdCoin.symbol,
        usd_price: usdCoin.current_price,
        thb_price: thbPriceMap.get(usdCoin.id) || 0,
      }));

      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setCurrentCryptoIndex((prevIndex) => (prevIndex + 1) % CRYPTOS.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(fadeInterval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Crypto Prices</h1>
      {data.length > 0 && (
        <div className="price-list">
          <div className="price fade">
            <p>
              {data[currentCryptoIndex].name} ({data[currentCryptoIndex].symbol.toUpperCase()}): 
            </p>
            <p>
              USD: ${data[currentCryptoIndex].usd_price.toFixed(2)} | 
              THB: ฿{data[currentCryptoIndex].thb_price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
