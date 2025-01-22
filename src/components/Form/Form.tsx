type FormProps = {
  className: string,
  handler: (event: React.FormEvent<HTMLFormElement>) => void,
  children: JSX.Element | JSX.Element[]
}

const Form = ({ className, handler, children }: FormProps): JSX.Element => {
  return (
    <form className={className} onSubmit={handler}>
      {children}
    </form>
  );
};

export default Form;