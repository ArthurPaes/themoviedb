import { toast, TypeOptions } from 'react-toastify';

export const useToast = () => {
  const showToast = (
    toastTitle: string,
    errorMessage: string,
    type: TypeOptions
  ): void => {
    toast(
      <div data-testid="toast-element" className="text-[14px]">
        <p>{toastTitle}</p>
        <p className="text-[10px]">{errorMessage}</p>
      </div>,
      {
        closeOnClick: true,
        theme: 'colored',
        type: type,
      }
    );
  };

  return {
    showToast,
  };
};
