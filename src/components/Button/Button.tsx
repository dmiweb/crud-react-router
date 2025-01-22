type ButtonProps = {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
  className?: string,
  children?: string,
  handler?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  style?: React.CSSProperties
}

const Button = ({ type, className, children, handler, style }: ButtonProps) => {
  return (
    <button type={type} className={`button ${className}`} onClick={handler} style={style}>
      {children}
    </button>
  );
}

export default Button;