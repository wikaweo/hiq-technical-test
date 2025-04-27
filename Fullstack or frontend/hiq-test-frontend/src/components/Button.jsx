import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  icon: Icon,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  size = 'md',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9933FF]'

  const sizes = {
    sm: 'h-8 px-3 text-sm gap-2',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2',
    xl: 'min-h-[56px] px-8 py-4 text-lg gap-3',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
      className={`${base} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  )
}
