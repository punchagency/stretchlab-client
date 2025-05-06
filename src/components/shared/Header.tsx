import logo from "../../assets/images/stretchlab.png";
import avatar from "../../assets/images/avatar.png";

export const Header = ({ flexologist_name }: { flexologist_name: string }) => {
  return (
    <div className="flex laptop:flex-row tablet:flex-col phone:flex-col laptop:gap-[15%] tablet:gap-4 phone:gap-6 border-b border-neutral-tertiary py-4 laptop:items-center tablet:items-start">
      <div>
        <img
          src={logo}
          alt="logo"
          className="laptop:w-28 tablet:w-20 laptop:h-10 tablet:h-8 phone:w-20 phone:h-8"
        />
      </div>
      <div className="flex-1 flex w-full items-center ">
        <div>
          <h4 className="text-dark-1 font-semibold phone:text-xl text-2xl">
            Welcome back!{" "}
            <span className="text-grey-2">{flexologist_name}</span>
          </h4>
          <p className="text-grey-5 text-base">
            Ready to help your clients move better today?
          </p>
        </div>
        <div className="ml-auto phone:hidden border-neutral-base border-2 rounded-lg laptop:flex tablet:flex items-center gap-2 px-4 py-2">
          <div>
            <img src={avatar} alt="avatar" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-dark-1 font-medium">{flexologist_name}</p>
            <p className="text-neutral-secondary text-sm">Flexologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};
