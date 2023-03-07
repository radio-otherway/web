import toast, {
  Renderable,
  Toast,
  ToastOptions,
  ValueOrFunction
} from "react-hot-toast";

import ToastComponent, { ToastType } from "./ToastComponent";

const ToastService = {
  custom: (
    message: ValueOrFunction<Renderable, Toast>,
    opts?: ToastOptions
  ) => {
    toast.custom(message, opts);
  },

  success: (message: string, title?: string, opts?: ToastOptions, onClick?: () => void) => {
    toast.custom((t) => (
      <ToastComponent
        title={title ?? "Success"}
        body={message}
        isVisible={t.visible}
        type={ToastType.success}
        onToastClicked={() => {
          onClick && onClick();
          toast.dismiss(t.id);
        }}
      />
    ), opts);
  },
  warning: (message: string, title?: string, opts?: ToastOptions) => {
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
    ), opts);
  },
  error: (message: string, title?: string, opts?: ToastOptions) => {
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
    ), opts);
  }
};
export default ToastService;
