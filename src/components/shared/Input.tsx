import { useState } from "react";
import { SvgIconName } from "../../types";
import { SvgIcon } from "./SvgIcon";

type Props = {
  label: string;
  icon: SvgIconName;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  name,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label>{label}</label>
      <div className="flex items-center gap-3 border border-grey-3 rounded-2xl py-4 px-3">
        <SvgIcon name={icon} width={18} height={15} />
        <input
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="outline-none bg-transparent flex-1 placeholder:text-grey-2 text-base"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-auto"
          >
            <SvgIcon name="eye" />
          </button>
        )}
      </div>
    </div>
  );
};
