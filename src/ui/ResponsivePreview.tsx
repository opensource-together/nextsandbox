import React, { useState } from "react";

type DeviceSize = "mobile" | "tablet" | "desktop";

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

/**
 * Prévisualisation responsive pour tester les composants sur différentes tailles d'écran
 */
export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({
  children,
}) => {
  const [activeDevice, setActiveDevice] = useState<DeviceSize>("desktop");

  const deviceSizes = {
    mobile: { width: "320px", height: "568px" },
    tablet: { width: "768px", height: "1024px" },
    desktop: { width: "100%", height: "auto" },
  };

  const getPreviewClassName = (size: DeviceSize) => {
    return activeDevice === size
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-500 hover:text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <div className="flex items-center border-b px-4 py-2 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mr-6">
          Aperçu responsive
        </h3>
        <div className="flex space-x-4">
          <button
            className={`py-2 px-1 text-sm ${getPreviewClassName("mobile")}`}
            onClick={() => setActiveDevice("mobile")}
          >
            <svg
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Mobile
          </button>
          <button
            className={`py-2 px-1 text-sm ${getPreviewClassName("tablet")}`}
            onClick={() => setActiveDevice("tablet")}
          >
            <svg
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Tablette
          </button>
          <button
            className={`py-2 px-1 text-sm ${getPreviewClassName("desktop")}`}
            onClick={() => setActiveDevice("desktop")}
          >
            <svg
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Desktop
          </button>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <div
          style={{
            width: deviceSizes[activeDevice].width,
            height: deviceSizes[activeDevice].height,
            transition: "width 0.3s, height 0.3s",
            overflow: "auto",
            border: activeDevice !== "desktop" ? "1px solid #e5e7eb" : "none",
            borderRadius: activeDevice !== "desktop" ? "8px" : "0",
            boxShadow:
              activeDevice !== "desktop" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ResponsivePreview;
