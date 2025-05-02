import { Button, SvgIcon } from "../shared";

export const Header = () => {
  return (
    <div className="flex items-center gap-8 pt-2 py-4 border-b border-neutral-tertiary">
      <button className="flex items-center gap-2 border-r border-grey-1 pr-2">
        <div className="h-6 w-6 grid place-items-center border border-grey-1 rounded-lg">
          <SvgIcon name="angle-left" width={6} height={9} fill="#353945" />
        </div>
        <span className="text-dark-1 font-medium">Back</span>
      </button>

      <h3 className="text-dark-1 laptop:block tablet:block phone:hidden font-semibold text-xl">
        Janica Micheal Session
      </h3>
      <div className="bg-grey-2 laptop:block tablet:block phone:hidden text-center text-[10px] font-medium text-white rounded py-1 px-3">
        Not Started
      </div>
      <Button className="bg-primary-base laptop:hidden tablet:hidden phone:block text-sm py-2 ml-auto text-white">
        Start Session
      </Button>
    </div>
  );
};
