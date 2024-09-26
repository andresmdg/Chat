type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  const {type, className, ...rest} = props;

  return (
    <input
      type={type}
      className={`${className} border-[1px] focus:outline-blue-600 focus:outline px-2 py-1 w-full rounded-lg text-center  bg-slate-50 text-blue-400 focus:text-blue-600`}
      {...rest}
    />
  );
}