const ErrorMessage = ({error}: {error: string}): JSX.Element => {
  return (
    <div>Error: {error}</div>
  );
};

export default ErrorMessage;