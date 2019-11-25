interface ContractJSON {
  contractName: string;
  abi: string;
  bytecode: string;
  networks?: Record<string, Network>;
}

interface Network {
  events: Object;
  address: string;
  transactionHash: string;
}

export { ContractJSON };
