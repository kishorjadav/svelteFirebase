import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const useToast = () => {
  const generateToast = (
    type: string,
    message: string,
    duration: number = 3000
  ) =>
    Toastify({
      text: message,
      className: type,
      duration: duration,
    }).showToast();

  const info = (msg: string, duration?: number) =>
    generateToast("info", msg, duration);
  const warning = (msg: string, duration?: number) =>
    generateToast("warning", msg, duration);
  const success = (msg: string, duration?: number) =>
    generateToast("success", msg, duration);
  const error = (msg: string, duration?: number) => {
    if (msg !== "Invalid admin token")
      return generateToast("error", msg, duration);
  };

  return { success, info, warning, error };
};
