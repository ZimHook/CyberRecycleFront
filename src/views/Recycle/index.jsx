import { Button, Input, Tooltip, message } from "antd";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { WagmiConfig, chains } from "../../provider/EvmProvider";
import {
  getTransactionConfirmations,
  readContract,
  writeContract,
} from "wagmi/actions";
import { erc20Abi, isAddress } from "viem";
import { InfoCircleOutlined } from "@ant-design/icons";
import { burnToken, getTokenReceiver } from "../../api";
import ProgressModal from "./ProgressModal";

const Recycle = () => {
  const [inputValue, setInputValue] = useState("");
  const [tokenInfo, setTokenInfo] = useState({});
  const [checkLoading, setCheckLoading] = useState(false);
  const [burnLoading, setBurnLoading] = useState(false);
  const chainId = useChainId();
  const { address } = useAccount();

  const [current, setCurrent] = useState(0);
  const [progressOpen, setProgressOpen] = useState(false);
  const [fromHash, setFromHash] = useState("");
  const [toHash, setToHash] = useState("");
  const [status, setStatus] = useState();

  const checkToken = async () => {
    if (!isAddress(inputValue)) {
      message.info("Addres Not Valid");
      return;
    }
    setCheckLoading(true);
    try {
      const symbol = await readContract(WagmiConfig, {
        address: inputValue,
        abi: erc20Abi,
        functionName: "symbol",
        chainId: chainId,
      });
      const decimals = await readContract(WagmiConfig, {
        address: inputValue,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: chainId,
      });
      const balance = Number(
        await readContract(WagmiConfig, {
          address: inputValue,
          abi: erc20Abi,
          functionName: "balanceOf",
          chainId: chainId,
          args: [address],
        })
      );
      setTokenInfo({
        symbol,
        balancetext: balance / Math.pow(10, decimals),
        balance,
      });
    } catch (e) {
      console.error(e);
      message.error("Couldn't Get Your Balance");
    } finally {
      setCheckLoading(false);
    }
  };

  const transfer = async () => {
    const receiver = await getTokenReceiver();
    return await writeContract(WagmiConfig, {
      abi: erc20Abi,
      functionName: "transfer",
      address: inputValue,
      args: [receiver, tokenInfo.balance],
    });
  };

  const checkTx = (txHash) => {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        getTransactionConfirmations(WagmiConfig, { hash: txHash })
          .then((blockProcessd) => {
            if (Number(blockProcessd) > 0) {
              clearInterval(interval);
              resolve();
            }
          })
          .catch(console.log);
      }, 1000);
    });
  };

  const burn = async () => {
    if (!tokenInfo.balance) {
      message.error("No Balance On This Token");
      return;
    }
    setBurnLoading(true);
    try {
      setProgressOpen(true);
      setCurrent(0);
      const txHash = await transfer();
      setCurrent(1);
      setFromHash(txHash);
      await checkTx(txHash);
      checkToken();
      setCurrent(2);
      const receiveHash = await burnToken(chainId, txHash);
      setCurrent(3);
      setToHash(receiveHash);
      await checkTx(receiveHash);
      setCurrent(4);
    } catch (e) {
      message.error("Something Went Wrong");
      setStatus("error");
      console.error(e);
    } finally {
      setBurnLoading(false);
    }
  };

  const closeProgress = () => {
    setProgressOpen(false);
    setFromHash("");
    setToHash("");
    setStatus();
  };

  return (
    <div
      className="flex items-center justify-center bg-[#bae0ff] w-[100vw] h-[100vh] relative"
      style={{
        backgroundImage: "url(/sky.png)",
      }}
    >
      <div className="w-[561px] bg-[#fff] shadow-xl rounded-[32px] p-8">
        <div className="font-bold mb-2">
          Enter ERC20 Contract Address
          <Tooltip
            title={
              <div className="text-[#000]">
                Wanna know all the token you hold?
                <a
                  href={`${
                    chains.find((chain) => chain.id === chainId).blockExplorers
                      .default.url
                  }/address/${address}`}
                  target="_blank"
                  className="text-[#326bfb] underline hover:underline"
                  rel="noreferrer"
                >
                  Check The Explorer
                </a>
                .
              </div>
            }
            overlayInnerStyle={{
              background: "#fff",
            }}
            arrow={false}
          >
            <InfoCircleOutlined className="ml-2" />
          </Tooltip>
        </div>
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="mb-4"
          suffix={
            <Button type="primary" onClick={checkToken} loading={checkLoading}>
              Check
            </Button>
          }
        />
        <div className="font-bold mb-2">Token Symbol</div>
        <div className="mb-4">{tokenInfo?.symbol ?? "-"}</div>
        <div className="font-bold mb-2">Balance</div>
        <div className="mb-4">{tokenInfo?.balancetext ?? "-"}</div>
        <Button
          type="primary"
          className="w-full flex justify-center h-[48px] items-center font-bold text-[18px]"
          loading={burnLoading}
          onClick={burn}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2819_919)">
              <path
                d="M12.5 23C8.35786 23 5 19.6421 5 15.5C5 13.3462 5.90786 11.4045 7.36179 10.0366C8.70403 8.77375 12 6.49951 11.5 1.5C17.5 5.5 20.5 9.5 14.5 15.5C15.5 15.5 17 15.5 19.5 13.0296C19.7697 13.8032 20 14.6345 20 15.5C20 19.6421 16.6421 23 12.5 23Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2819_919">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Burn For 1000 $CRC
        </Button>
      </div>
      <ProgressModal
        current={current}
        fromHash={fromHash}
        toHash={toHash}
        onClose={closeProgress}
        open={progressOpen}
        status={status}
      />
    </div>
  );
};

export default Recycle;
