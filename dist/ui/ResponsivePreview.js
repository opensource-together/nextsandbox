"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsivePreview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * Prévisualisation responsive pour tester les composants sur différentes tailles d'écran
 */
const ResponsivePreview = ({ children, }) => {
    const [activeDevice, setActiveDevice] = (0, react_1.useState)("desktop");
    const deviceSizes = {
        mobile: { width: "320px", height: "568px" },
        tablet: { width: "768px", height: "1024px" },
        desktop: { width: "100%", height: "auto" },
    };
    const getPreviewClassName = (size) => {
        return activeDevice === size
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700";
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border overflow-hidden shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border-b px-4 py-2 bg-gray-50", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-gray-700 mr-6", children: "Aper\u00E7u responsive" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsxs)("button", { className: `py-2 px-1 text-sm ${getPreviewClassName("mobile")}`, onClick: () => setActiveDevice("mobile"), children: [(0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 inline-block mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" }) }), "Mobile"] }), (0, jsx_runtime_1.jsxs)("button", { className: `py-2 px-1 text-sm ${getPreviewClassName("tablet")}`, onClick: () => setActiveDevice("tablet"), children: [(0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 inline-block mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }), "Tablette"] }), (0, jsx_runtime_1.jsxs)("button", { className: `py-2 px-1 text-sm ${getPreviewClassName("desktop")}`, onClick: () => setActiveDevice("desktop"), children: [(0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 inline-block mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }), "Desktop"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { style: {
                        width: deviceSizes[activeDevice].width,
                        height: deviceSizes[activeDevice].height,
                        transition: "width 0.3s, height 0.3s",
                        overflow: "auto",
                        border: activeDevice !== "desktop" ? "1px solid #e5e7eb" : "none",
                        borderRadius: activeDevice !== "desktop" ? "8px" : "0",
                        boxShadow: activeDevice !== "desktop" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    }, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full w-full", children: children }) }) })] }));
};
exports.ResponsivePreview = ResponsivePreview;
exports.default = exports.ResponsivePreview;
