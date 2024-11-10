var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./App.css";
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
const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCryptoIndex, setCurrentCryptoIndex] = useState(0);
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            // Fetch USD prices
            const usdResponse = yield fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTOS.join(",")}`);
            const usdData = yield usdResponse.json();
            // Fetch THB prices
            const thbResponse = yield fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&ids=${CRYPTOS.join(",")}`);
            const thbData = yield thbResponse.json();
            // Map THB prices by crypto id for easy access
            const thbPriceMap = new Map(thbData.map((coin) => [coin.id, coin.current_price]));
            // Combine data into single array
            const combinedData = usdData.map((usdCoin) => ({
                id: usdCoin.id,
                name: usdCoin.name,
                symbol: usdCoin.symbol,
                usd_price: usdCoin.current_price,
                thb_price: thbPriceMap.get(usdCoin.id) || 0,
            }));
            setData(combinedData);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    });
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
        return _jsx("p", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Crypto Prices" }), data.length > 0 && (_jsx("div", { className: "price-list", children: _jsxs("div", { className: "price fade", children: [_jsxs("p", { children: [data[currentCryptoIndex].name, " (", data[currentCryptoIndex].symbol.toUpperCase(), "):"] }), _jsxs("p", { children: ["USD: $", data[currentCryptoIndex].usd_price.toFixed(2), " | THB: \u0E3F", data[currentCryptoIndex].thb_price.toFixed(2)] })] }) }))] }));
};
export default App;
