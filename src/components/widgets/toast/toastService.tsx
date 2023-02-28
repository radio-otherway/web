import toast from "react-hot-toast";

import ToastComponent, { ToastType } from "./ToastComponent";
import {
  RiAlarmWarningLine,
  RiErrorWarningLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const ToastService = {
  success: (message: string, title?: string) => {
    toast.custom((t) => (
      <ToastComponent
        title={title ?? "Success"}
        body={message}
        isVisible={t.visible}
        type={ToastType.success}
        onToastClicked={() => {
          toast.dismiss(t.id);
        }}
      />
    ));
  },
  warning: (message: string, title?: string) => {
    toast.custom((t) => (
      <ToastComponent
        title={title ?? "Warning"}
        body={message}
        isVisible={t.visible}
        type={ToastType.warning}
        onToastClicked={() => {
          toast.dismiss(t.id);
        }}
      />
    ));
  },
  error: (message: string, title?: string) => {
    toast.custom((t) => (
      <ToastComponent
        title={title ?? "Error"}
        body={message}
        type={ToastType.error}
        isVisible={t.visible}
        onToastClicked={() => {
          toast.dismiss(t.id);
        }}
      />
    ));
  },
};
export default ToastService;
