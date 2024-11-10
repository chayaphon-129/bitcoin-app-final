var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import './CryptoChart.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const CryptoChart = () => {
    const [chartData, setChartData] = useState(null);
    const [crypto, setCrypto] = useState("bitcoin");
    const [coinDetails, setCoinDetails] = useState(null);
    const fetchHistoricalData = (cryptoId, days) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`);
            const result = yield response.json();
            const chartData = {
                labels: result.prices.map((price) => new Date(price[0]).toLocaleDateString()),
                datasets: [
                    {
                        label: `${cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)} Price (USD)`,
                        data: result.prices.map((price) => price[1]),
                        backgroundColor: "rgba(75, 192, 192, 0.6)", // สีของแท่งกราฟ
                    },
                ],
            };
            setChartData(chartData);
        }
        catch (error) {
            console.error("Error fetching chart data:", error);
        }
    });
    const fetchCoinDetails = (cryptoId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
            const result = yield response.json();
            setCoinDetails(result);
        }
        catch (error) {
            console.error("Error fetching coin details:", error);
        }
    });
    useEffect(() => {
        fetchHistoricalData(crypto, "365");
        fetchCoinDetails(crypto);
    }, [crypto]);
    return (_jsxs("div", { className: "chart-container", children: [_jsxs("h2", { children: [coinDetails ? coinDetails.name : 'Loading...', " Price History"] }), coinDetails && (_jsxs("div", { children: [_jsxs("p", { children: ["Current Price: $", coinDetails.market_data.current_price.usd] }), _jsxs("p", { children: ["Market Cap: $", coinDetails.market_data.market_cap.usd] }), _jsxs("p", { children: ["24h Trading Volume: $", coinDetails.market_data.total_volume.usd] }), _jsxs("p", { children: ["24h Change: ", coinDetails.market_data.price_change_percentage_24h, "%"] })] })), _jsxs("select", { className: "crypto-select", onChange: (e) => setCrypto(e.target.value), value: crypto, children: [_jsx("option", { value: "bitcoin", children: "Bitcoin" }), _jsx("option", { value: "ethereum", children: "Ethereum" }), _jsx("option", { value: "binancecoin", children: "Binance Coin" }), _jsx("option", { value: "dogecoin", children: "Dogecoin" }), _jsx("option", { value: "tether", children: "Tether" }), _jsx("option", { value: "solana", children: "Solana" }), _jsx("option", { value: "ripple", children: "XRP" }), _jsx("option", { value: "tron", children: "Tron" }), _jsx("option", { value: "cardano", children: "ADA" }), _jsx("option", { value: "chainlink", children: "LINK" }), _jsx("option", { value: "filecoin", children: "Filecoin" }), _jsx("option", { value: "uniswap", children: "UNI" })] }), chartData ? (_jsx(Bar, { data: chartData, options: {
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
                } })) : (_jsx("p", { children: "Loading chart..." }))] }));
};
export default CryptoChart;
