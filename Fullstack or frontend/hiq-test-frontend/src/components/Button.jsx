import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  icon: Icon,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
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

  const variants = {
    hiq: 'bg-[#9933FF] text-white hover:bg-[#812be0]',
    primary: 'bg-green-600 text-white hover:bg-green-700',
    outline:
      'border border-[#9933FF] text-[#9933FF] hover:bg-purple-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    disabled:
      'bg-gray-300 text-white cursor-not-allowed opacity-60',
  }

  const variantClass = disabled
    ? variants.disabled
    : variants[variant] || variants.primary

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
      className={`${base} ${sizes[size]} ${variantClass} ${className}`}
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
