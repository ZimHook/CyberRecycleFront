import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-[100px]">
      <div className="flex gap-[52px] justify-center items-center">
        <div className="w-[580px] text-[32px] font-bold text-[#1A70CD]">
          Turn worthless NFTs & Tokens into 💎
          <br />
          Recycle for $RECYCLE
          <br />
          <a
            className="text-[14px] text-[#666]"
            href="https://testnet.cyberscan.co/address/0x9a6cd5d48d203b161a6c31346a5ccb7b3dd2bb13"
            target="_blank"
            rel="noreferrer"
          >
            Token Contract Address: 0x9a6Cd5d48d203b161A6c31346a5CCB7b3DD2bB13
          </a>
          <Button
            onClick={() => {
              navigate("/recycle");
            }}
            type="primary"
            className="bg-[#1A70CD] w-[300px] h-[48px] text-[20px] font-bold rounded-[24px] mt-6"
          >
            Recycle Tokens
          </Button>
        </div>
        <img src="/shell.png" className="w-[433px]" alt="shell"/>
      </div>
    </div>
  );
};

export default Home;
