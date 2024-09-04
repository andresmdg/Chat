export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (value: string) => void
) => {
  e.preventDefault();
  setter(e.target.value);
};
