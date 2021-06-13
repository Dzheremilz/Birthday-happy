export const DeployAddress = "0xF25b3745021183AfD0a9DdA23A769E3E8ca124A4";

export const DeployAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addressContract",
        type: "address",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "createBirthday",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
