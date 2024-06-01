import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  sepolia,
  baseSepolia,
  zoraSepolia,
  blastSepolia,
  optimismSepolia,
  cyberTestnet,
} from "viem/chains";

export const chains = [
  sepolia,
  baseSepolia,
  zoraSepolia,
  blastSepolia,
  optimismSepolia,
  { ...cyberTestnet, iconUrl: "https://cyber.co/assets/rebranding/header-dot.svg" },
]

export const WagmiConfig = getDefaultConfig({
  appName: "Cyber Recycle",
  projectId: "9a16903827e8c96c67673832610c9d6a",
  chains,
  ssr: false,
});

export function EvmProvider({ children }) {
  // const chainsGroup = useRecoilValue(reChains);
  // const setChainsWallet = useSetRecoilState(reChainsWallet);

  // useEffect(() => {
  //   if (chainsGroup) {
  //     const list = chainsJson.filter(
  //       (item) =>
  //         (chainsGroup || []).some(
  //           (option: any) =>
  //             Number(option.chainId) === Number(item.chainId) ||
  //             Number(option.networkId) === Number(item.chainId)
  //         ) && !!item?.rpc?.length
  //     );
  //     const chainL = list.map((item, index) => {
  //       return {
  //         blockExplorers: {
  //           default: {
  //             name: ((item.explorers as any[]) || [])[0]?.name,
  //             url: ((item.explorers as any[]) || [])[0]?.url,
  //           },
  //           etherscan: {
  //             name: ((item.explorers as any[]) || [])[0]?.name,
  //             url: ((item.explorers as any[]) || [])[0]?.url,
  //           },
  //         },
  //         contracts: {},
  //         fees: undefined,
  //         formatters: undefined,
  //         name: item.name,
  //         id: item.chainId,
  //         nativeCurrency: item.nativeCurrency,
  //         network: item.name,
  //         serializers: undefined,
  //         rpcUrls: {
  //           default: {
  //             http: item.rpc.filter((option) => !option.includes("${")),
  //           },
  //           public: {
  //             http: item.rpc.filter((option) => !option.includes("${")),
  //           },
  //         },
  //       };
  //     });

  //     if (chainL.length) {
  //       // setChainList(chainL as any[]);
  //       setChainsWallet(chainL);
  //     }
  //   }
  // }, [chainsGroup, setChainsWallet]);

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={WagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale="en-US"
          modalSize="compact"
          initialChain={cyberTestnet}
          appInfo={{
            appName: "Cyber Recycle",
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
