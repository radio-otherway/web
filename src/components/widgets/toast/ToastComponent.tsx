import React from "react";
import {
  RiAlarmWarningLine,
  RiErrorWarningLine,
  RiShieldCheckLine
} from "react-icons/ri";
import { CgCloseO } from "react-icons/cg";

enum ToastType {
  success,
  warning,
  error,
}

interface IToastComponentProps {
  title: string;
  body: string;
  type: ToastType;
  isVisible: boolean;
  onToastClicked: () => void;
}

const ToastComponent = ({
                          title,
                          body,
                          type,
                          onToastClicked
                        }: IToastComponentProps) => {
  const _getToastIcon = (type: ToastType): React.ReactNode => {
    switch (type) {
      case ToastType.success:
        return <RiShieldCheckLine className="h-10 w-10 text-white" />;
      case ToastType.warning:
        return <RiAlarmWarningLine className="h-10 w-10 text-white" />;
      case ToastType.error:
        return <RiErrorWarningLine className="h-10 w-10 text-white" />;
    }
  };

  function _getBackgroundColour(type: ToastType) {
    switch (type) {
      case ToastType.success:
        return "alert-success";
      case ToastType.warning:
        return "alert-warning";
      case ToastType.error:
        return "alert-error";
    }
  }

  return (
    <div className="flex w-96 flex-col items-center space-y-4 text-base-content sm:items-end">
      <div
        className={`pointer-events-auto flex w-full max-w-md rounded-lg shadow-lg ${_getBackgroundColour(
          type
        )}`}
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">{_getToastIcon(type)}</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-md bold  shadow-accent">{title}</p>
              <p className="mt-1 text-sm ">{body}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            type="button"
            title="Close"
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium focus:outline-none focus:ring-0 focus:ring-offset-0"
            onClick={() => onToastClicked()}
          >
            <CgCloseO className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastComponent;
export { ToastType };
