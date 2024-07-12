type IconProps = {
  className: string
  color: string
  icon: string
  size: number
  title: string
}

export default ({ className, color, icon, size = 32, title }: IconProps) => {
  return (
    <svg
      aria-hidden='true'
      role='img'
      fill={color
        ? color.startsWith('#') ? color : `var(--${color})`
        : 'currentColor'}
      fill-rule='evenodd'
      className={className}
      width={`${size}px`}
      height={`${size}px`}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <title>{title}</title>
      <path d={icon}></path>
    </svg>
  )
}
