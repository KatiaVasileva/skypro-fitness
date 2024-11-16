type NewStartProps = {
    onClick: () => void;
  };
  
  export const NewStart = ({
    onClick,
  }: NewStartProps) => {
    return (
      <div className="w-full h-full overflow-x-hidden fixed z-10 bg-dark-gray/50 top-0 left-0">
        <div className="block w-screen min-h-screen mx-auto my-0">
          <div className="h-screen flex items-center">
            <div className="flex flex-col items-center gap-[30px] bg-white w-[360px] min-h-[350px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
              <img
                src="/img/logo.png"
                alt="logo_modal"
                className="block w-[220px] h-[35px]"
              />
              <div className="h-[100px] w-[278px] text-center">
                <p className="text-2xl text-black font-medium mb-7">
                  Чтобы начать заново, добавьте курс на главной странице
                </p>
              </div>
              <button className="btn-primary h-[52px] w-[235px]" onClick={onClick}>
                На главную
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  