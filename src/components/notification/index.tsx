import toast from "react-hot-toast";

export const showNotification = (
  text: string,
  type: 'success' | 'error' | 'warning'
) => {
  const defaultStyles = {
    success: { icon: '🚀', backgroundColor: '#4CAF50', color: '#ffffff' },
    warning: { icon: '⚠️', backgroundColor: '#fbc02d', color: '#000000' },
    error: { icon: '✖', backgroundColor: '#f44336', color: '#ffffff' },
  };

  const { icon, backgroundColor, color } = defaultStyles[type] || defaultStyles.success;

  toast(text, { icon, style: { backgroundColor, color, padding: '16px', } });
};
