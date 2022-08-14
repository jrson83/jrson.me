type IconProps = {
  className: string;
  color: string;
  icon: string;
  size: number;
  title: string;
};

export default ({ className, color, icon, size = 32, title }: IconProps) => {
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
    },
    path: {
      fill: color
        ? color.startsWith("#") ? color : `var(--${color})`
        : "currentColor",
      fillRule: "evenodd",
    },
  };

  return (
    <svg
      aria-hidden="true"
      role="img"
      className={className}
      /* style={styles.svg} */
      width={`${size}px`}
      height={`${size}px`}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <title>{title}</title>
      <path
        style={styles.path}
        d={icon}
      >
      </path>
    </svg>
  );
};
