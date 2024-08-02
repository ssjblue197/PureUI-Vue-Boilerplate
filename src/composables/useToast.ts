// Always escape HTML for text arguments!
function escapeHtml(html?: string) {
  const div = document.createElement('div');
  div.textContent = html ?? '';
  return div.innerHTML;
}

const iconByStatus: Record<string, string> = {
  primary: 'info-circle',
  success: 'check-circle',
  neutral: 'universal-access-circle',
  warning: 'exclamation-circle',
  danger: 'x-circle',
};

export type Variant =
  | 'primary'
  | 'success'
  | 'neutral'
  | 'warning'
  | 'danger';

export interface ToastOptions {
  message?: string;
  variant: Variant;
  icon?: string;
  duration?: number;
  closable?: boolean;
}

// Custom function to emit toast notifications
export function useToast() {
  const defaultOptions: ToastOptions = {
    message: '',
    variant: 'primary',
    icon: '',
    duration: 3000,
    closable: true,
  };

  const show = (options: ToastOptions) => {
    const { message, variant, icon, duration, closable } =
      Object.assign(defaultOptions, options);
    const alert = Object.assign(
      document.createElement('p-alert'),
      {
        variant,
        closable,
        duration,
        innerHTML: `
            <p-icon name="${icon || iconByStatus[variant]}" slot="icon"></p-icon>
            ${escapeHtml(message)}
          `,
      },
    );
    document.body.append(alert);
    return alert.toast();
  };

  return {
    show,
  };
}
