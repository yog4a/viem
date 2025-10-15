export default {
    name: 'publicnode',
    endpoints: {
        ethereum: {
            http: "https://ethereum-rpc.publicnode.com",
            wss: "wss://ethereum-rpc.publicnode.com",
            type: 'debug',
        },
        base: {
            http: "https://base-rpc.publicnode.com",
            wss: "wss://base-rpc.publicnode.com",
            type: 'debug',
        },
    },
};