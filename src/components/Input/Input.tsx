type InputProps = {
  type: string,
  className?: string,
  name: string,
  defaultValue?: string,
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  autoFocus?: boolean
}

const Input = (
  {
    type,
    className,
    name,
    defaultValue,
    handler,
    placeholder
  }: InputProps
) => {
  return (
    <input
      type={type}
      className={className}
      name={name}
      defaultValue={defaultValue}
      onChange={(event) => handler && handler(event)}
      placeholder={placeholder}
      autoFocus={true}
    />
  );
};

export default Input;