'use client'

import React from "react"
import Link from "next/link"

type ButtonVariant = 'primary' | 'danger'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  className?: string
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gray-600 text-white hover:bg-white hover:text-black',
  danger: 'bg-gray-600 text-white hover:bg-red-700',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = `
    py-3 px-6 rounded-xl border-none text-base font-semibold cursor-pointer 
    transition-all duration-150 hover:-translate-y-1 text-center
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  )
}
