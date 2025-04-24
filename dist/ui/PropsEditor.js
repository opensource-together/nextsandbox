"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropsEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * Éditeur de props interactif
 */
const PropsEditor = ({ propDefinitions, onChange, }) => {
    const initialProps = propDefinitions.reduce((acc, prop) => {
        acc[prop.name] = prop.defaultValue;
        return acc;
    }, {});
    const [props, setProps] = (0, react_1.useState)(initialProps);
    const handleChange = (name, value) => {
        const newProps = { ...props, [name]: value };
        setProps(newProps);
        onChange(newProps);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border rounded-lg p-4 shadow-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-md font-medium text-gray-800 mb-3", children: "Propri\u00E9t\u00E9s" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: propDefinitions.map((prop) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-sm font-medium text-gray-700 mb-1", children: prop.name }), prop.type === "string" && ((0, jsx_runtime_1.jsx)("input", { type: "text", value: props[prop.name] || "", onChange: (e) => handleChange(prop.name, e.target.value), className: "border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500" })), prop.type === "number" && ((0, jsx_runtime_1.jsx)("input", { type: "number", value: props[prop.name] || 0, onChange: (e) => handleChange(prop.name, Number(e.target.value)), className: "border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500" })), prop.type === "boolean" && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: Boolean(props[prop.name]), onChange: (e) => handleChange(prop.name, e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm text-gray-600", children: Boolean(props[prop.name]) ? "Activé" : "Désactivé" })] })), prop.type === "select" && prop.options && ((0, jsx_runtime_1.jsx)("select", { value: props[prop.name] || "", onChange: (e) => handleChange(prop.name, e.target.value), className: "border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500", children: prop.options.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: option }, option))) }))] }, prop.name))) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setProps(initialProps), className: "mt-4 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors", children: "R\u00E9initialiser" })] }));
};
exports.PropsEditor = PropsEditor;
exports.default = exports.PropsEditor;
