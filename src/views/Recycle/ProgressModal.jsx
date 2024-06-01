import { Button, Modal, Steps } from "antd";
import { useAccount, useChainId } from "wagmi";
import { chains } from "../../provider/EvmProvider";
import { shortenAddress } from "../../utils/address";
import { LoadingOutlined, XOutlined } from "@ant-design/icons";
import { shareToTwitter } from "../../utils/twitter";

const ProgressModal = ({
  open,
  onClose,
  current,
  status,
  toHash,
  fromHash,
}) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const shareText = `I just recycled Token and claimed 1000 $RECYCLE!🎈
Try It on ${window.location.origin}`;

  const steps = [
    { label: "Creating Transcation", description: fromHash },
    { label: "Waiting Transcation Confirmation" },
    { label: "Validating Transcation Info" },
    { label: "$CRC Receicing", description: toHash },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closable={current >= steps.length || status}
      maskClosable={false}
      footer={null}
      title={
        <div className="flex justify-center">
          <img
            src={chains.find((chain) => chain.id === chainId).iconUrl}
            className="h-full"
            alt="chain"
          />
          {shortenAddress(address)}
        </div>
      }
    >
      {current >= steps.length ? (
        <div>
          <div className="font-bold flex justify-center text-[24px] mt-10">
            Congrats! 🎉
          </div>
          <div className="w-[80%] m-auto text-center text-[16px] mt-8">
            You have recycled your Token and claimed 1000 $RECYCLE!🎈
          </div>
          <div className="text-[120px] w-full text-center">♻️</div>
          <Button
            type="primary"
            className="w-full h-[48px] font-bold text-[18px] flex items-center justify-center mb-4"
            onClick={() => shareToTwitter(shareText)}
          >
            <XOutlined />
            Share On X
          </Button>
        </div>
      ) : (
        <Steps
          direction="vertical"
          size="small"
          current={current}
          status={status}
          className="mt-8"
          items={steps.map((step, index) => {
            return {
              title: step.label,
              icon: current === index && !status ? <LoadingOutlined /> : void 0,
              description: (
                <a
                  href={`${
                    chains.find((chain) => chain.id === chainId).blockExplorers
                      .default.url
                  }/tx/${step.description}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortenAddress(step.description, 8)}
                </a>
              ),
            };
          })}
        />
      )}
    </Modal>
  );
};

export default ProgressModal;
