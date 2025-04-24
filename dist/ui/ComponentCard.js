"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Carte pour afficher un composant dans la sandbox
 */
const ComponentCard = ({ name, description, category, component, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-white", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-800", children: name }), category && ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600", children: category }))] }), description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: description })), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-6 border rounded-md bg-gray-50 flex items-center justify-center", children: component })] }) }));
};
exports.ComponentCard = ComponentCard;
exports.default = exports.ComponentCard;
