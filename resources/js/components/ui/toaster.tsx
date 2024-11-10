import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // Get the position from the first toast or fallback to 'top-right'
  const position = toasts.length > 0 ? toasts[0].position || 'top-right' : 'top-right';

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, position, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Pass the dynamic position to the ToastViewport */}
      <ToastViewport position={position} />
    </ToastProvider>
  )
}
