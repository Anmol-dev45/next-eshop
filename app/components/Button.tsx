import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 border-2  border-slate-700 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${
        outline
          ? "bg-white text-slate-700  focus-visible:ring-white"
          : "bg-slate-700 text-white  focus-visible:ring-slate-700"
      } ${
        small
          ? "px-2 py-1 text-sm font-light"
          : "text-md px-4 py-3 font-semibold "
      }
      ${
        custom && custom
      } cursor-pointer rounded-md transition duration-200 ease-in-out  focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 active:scale-95`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
