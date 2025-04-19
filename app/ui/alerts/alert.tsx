import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

interface AlertProps {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
  onClose?: () => void; 
}

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
};

const colorMap = {
  success: {
    background: "bg-green-50",
    text: "text-green-800",
    icon: "text-green-400",
    border: "border-green-400",
    hover: "hover:bg-green-100",
  },
  error: {
    background: "bg-red-50",
    text: "text-red-800",
    icon: "text-red-400",
    border: "border-red-400",
    hover: "hover:bg-red-100",
  },
  warning: {
    background: "bg-yellow-50",
    text: "text-yellow-800",
    icon: "text-yellow-400",
    border: "border-yellow-400",
    hover: "hover:bg-yellow-100",
  },
};

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <div
      className={`rounded-md ${colors.background} p-4 border-l-4 ${colors.border}`}
    >
      <div className="flex">
        <div className="shrink-0">
          <Icon className={`size-5 ${colors.icon}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${colors.text}`}>{title}</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>{message}</p>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={onClose}
              className={`-mx-1.5 -my-1.5 inline-flex ${colors.background} rounded-md p-1.5 ${colors.text} ${colors.hover}`}
            >
              <span className="sr-only">Dismiss</span>
              &#x2715; {/* Close icon */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
