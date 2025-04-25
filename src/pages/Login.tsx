import logo from "../assets/images/stretchlab.png";
import model from "../assets/images/model.png";
import { LoginForm } from "../components/forms";
export const Login = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col laptop:flex-row phone:w-[90%] tablet:w-[60%] laptop:w-[80%] laptop:min-w-[1200px] laptop:max-w-[1200px] laptop:min-h-[560px] laptop:max-h-[560px] mx-auto gap-12 phone:h-[80%] tablet:h-[90%] laptop:h-[90%]">
        <div className="phone:w-full tablet:w-full laptop:w-1/2 flex flex-col gap-4 justify-center">
          <img src={logo} alt="logo" className="w-36 mx-auto" />
          <h1 className="phone:text-2xl tablet:text-3xl laptop:text-4xl font-semibold tracking-custom text-center text-dark-1">
            Welcome Back, Flexologist
          </h1>
          <p className="phone:text-sm tablet:text-base laptop:text-lg leading-5 tracking-custom2 -mt-2 text-grey-5 text-center">
            Log in with your ClubReady credentials to view your sessions and
            access AI-powered support to enhance every stretch.
          </p>
          <LoginForm />
        </div>
        <div className="bg-primary-secondary tablet:w-full laptop:w-1/2 phone:hidden tablet:flex laptop:flex justify-center items-center relative">
          <img src={model} alt="model" className="w-[70%] mx-auto z-20" />
          <div className="absolute bg-primary-base tablet:w-[70px] tablet:h-[100px] laptop:w-[100px] laptop:h-[140px] rounded-2xl laptop:top-24 tablet:top-10 laptop:right-12 tablet:right-16" />
          <div className="absolute tablet:hidden laptop:block bg-[#EFE7FF] w-[75%] h-[47px]  bottom-20 left-1/2 -translate-x-1/2" />
          <div className="absolute bg-primary-tertiary tablet:w-[30%] tablet:h-[200px] laptop:w-[43%] laptop:h-[250px]  laptop:top-[55%] tablet:top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-t-full" />
          <div className="absolute bg-white z-40 max-w-[190px] laptop:bottom-24 tablet:bottom-3 tablet:left-10 laptop:py-3 tablet:py-2 laptop:px-3 tablet:px-2 laptop:left-12 rounded-xl">
            <p className="text-dark-1 text-xs font-semibold laptop:pb-3 tablet:pb-2">
              Creating wireframe
            </p>
            <p className="text-grey-4 text-[10px] border-b-[0.75px] laptop:pb-3 tablet:pb-2 border-[#F2F2F2]">
              Stretch Minds. Heal Bodies. One...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
