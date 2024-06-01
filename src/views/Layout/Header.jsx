import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

const nav = [
  {
    label: "recycle",
    link: "/recycle",
  },
];

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation()

  return (
    <div className="flex justify-between px-4 h-[72px] py-2 items-center shadow-md fixed top-0 bg-[#fff] w-full" style={{zIndex: 999}}>
      <div className="flex h-full text-[26px] font-bold text-[#1A70CD] items-center gap-2 cursor-pointer" onClick={() => {
        navigate('/')
      }}>
        <img src="/logo.svg" className="h-[40px]" alt="logo"/> CYBER RECYCLE
      </div>
      <div className="flex gap-2">
        {nav.map((item) => {
          const active = location.pathname.slice(0, item.link.length) === item.link
          return (
            <div
              key={item.label}
              onClick={() => {
                navigate(item.link);
              }}
              className="font-bold text-[20px] uppercase rounded-[18px] h-[36px] leading-[20px] py-2 px-4 cursor-pointer hover:scale-[1.2]"
              style={{
                color: active ? '#fff' : '#262626',
                background: active ? '#326bfb' : '#fff',
                transition: 'all .3s ease',
                boxShadow: active ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <ConnectButton />
    </div>
  );
};

export default Header;
