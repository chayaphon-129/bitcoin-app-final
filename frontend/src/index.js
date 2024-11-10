import { jsx as _jsx } from "react/jsx-runtime";
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
// import ChartPage from "./ChartPage";
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(_jsx(React.StrictMode, { children: _jsx(Router, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(App, {}) }) }) }) }));
}
