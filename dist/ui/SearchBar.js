"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * Barre de recherche pour filtrer les composants
 */
const SearchBar = ({ onSearch, placeholder = "Rechercher un composant...", }) => {
    const [query, setQuery] = (0, react_1.useState)("");
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full max-w-md mx-auto mb-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: (0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }) }) }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: query, onChange: handleChange, className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm", placeholder: placeholder }), query && ((0, jsx_runtime_1.jsx)("button", { className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600", onClick: () => {
                    setQuery("");
                    onSearch("");
                }, children: (0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }))] }));
};
exports.SearchBar = SearchBar;
exports.default = exports.SearchBar;
