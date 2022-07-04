"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHProxy = exports.Provider = void 0;
const transport_1 = require("./transport");
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
const logger_1 = require("@ethersproject/logger");
const EthersErrorCode = logger_1.ErrorCode;
class Provider {
    constructor(transport) {
        this.transport = transport;
        this.contractAddress = [];
        // For HTTP provider
        this.pollIntervalMilliSecs = 500;
    }
    /**
     * @deprecated Websocket support will be removed in future. Use HTTP transport instead.
     */
    static newWebsocketProvider(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield transport_1.WSTransport.connect(address);
            const provider = new Provider(transport);
            provider.tokenSet = new utils_1.TokenSet(yield provider.getTokens());
            return provider;
        });
    }
    static newHttpProvider(address = 'http://127.0.0.1:3030', pollIntervalMilliSecs) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new transport_1.HTTPTransport(address);
            const provider = new Provider(transport);
            if (pollIntervalMilliSecs) {
                provider.pollIntervalMilliSecs = pollIntervalMilliSecs;
            }
            provider.tokenSet = new utils_1.TokenSet(yield provider.getTokens());
            return provider;
        });
    }
    /**
     * Provides some hardcoded values the `Provider` responsible for
     * without communicating with the network
     */
    static newMockProvider(network, ethPrivateKey, getTokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new transport_1.DummyTransport(network, ethPrivateKey, getTokens);
            const provider = new Provider(transport);
            provider.tokenSet = new utils_1.TokenSet(yield provider.getTokens());
            return provider;
        });
    }
    // return transaction hash (e.g. sync-tx:dead..beef)
    submitTx({ tx, signature, fastProcessing, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('tx_submit', [tx, signature, fastProcessing]);
        });
    }
    // Requests `zkSync` server to execute several transactions together.
    // return transaction hash (e.g. sync-tx:dead..beef)
    submitTxsBatch(transactions, ethSignatures) {
        return __awaiter(this, void 0, void 0, function* () {
            let signatures = [];
            // For backwards compatibility we allow sending single signature as well
            // as no signatures at all.
            if (ethSignatures == undefined) {
                signatures = [];
            }
            else if (ethSignatures instanceof Array) {
                signatures = ethSignatures;
            }
            else {
                signatures.push(ethSignatures);
            }
            return yield this.transport.request('submit_txs_batch', [transactions, signatures]);
        });
    }
    getContractAddress(linkChainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.contractAddress[linkChainId]) {
                return this.contractAddress[linkChainId];
            }
            this.contractAddress[linkChainId] = yield this.transport.request('contract_address', [
                linkChainId,
            ]);
            return this.contractAddress[linkChainId];
        });
    }
    getTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('tokens', []);
        });
    }
    updateTokenSet() {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTokenSet = new utils_1.TokenSet(yield this.getTokens());
            this.tokenSet = updatedTokenSet;
        });
    }
    getState(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('account_info', [address]);
        });
    }
    getSubAccountState(address, subAccountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('sub_account_info', [address, subAccountId]);
        });
    }
    // get transaction status by its hash (e.g. 0xdead..beef)
    getTxReceipt(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('tx_info', [txHash]);
        });
    }
    getPriorityOpStatus(linkChainId, serialId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('ethop_info', [linkChainId, serialId]);
        });
    }
    getConfirmationsForEthOpAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('get_confirmations_for_eth_op_amount', []);
        });
    }
    getEthTxForWithdrawal(withdrawal_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request('get_eth_tx_for_withdrawal', [withdrawal_hash]);
        });
    }
    notifyPriorityOp(linkChainId, serialId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport.subscriptionsSupported()) {
                return yield new Promise((resolve) => {
                    const subscribe = this.transport.subscribe('ethop_subscribe', [serialId, action], 'ethop_unsubscribe', (resp) => {
                        subscribe
                            .then((sub) => sub.unsubscribe())
                            .catch((err) => console.log(`WebSocket connection closed with reason: ${err}`));
                        resolve(resp);
                    });
                });
            }
            else {
                while (true) {
                    const priorOpStatus = yield this.getPriorityOpStatus(linkChainId, serialId);
                    const notifyDone = action === 'COMMIT'
                        ? priorOpStatus.block && priorOpStatus.block.committed
                        : priorOpStatus.block && priorOpStatus.block.verified;
                    if (notifyDone) {
                        return priorOpStatus;
                    }
                    else {
                        yield (0, utils_1.sleep)(this.pollIntervalMilliSecs);
                    }
                }
            }
        });
    }
    notifyTransaction(hash, action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport.subscriptionsSupported()) {
                return yield new Promise((resolve) => {
                    const subscribe = this.transport.subscribe('tx_subscribe', [hash, action], 'tx_unsubscribe', (resp) => {
                        subscribe
                            .then((sub) => sub.unsubscribe())
                            .catch((err) => console.log(`WebSocket connection closed with reason: ${err}`));
                        resolve(resp);
                    });
                });
            }
            else {
                while (true) {
                    const transactionStatus = yield this.getTxReceipt(hash);
                    const notifyDone = action == 'COMMIT'
                        ? transactionStatus.failReason ||
                            (transactionStatus.block && transactionStatus.block.committed)
                        : transactionStatus.failReason ||
                            (transactionStatus.block && transactionStatus.block.verified);
                    if (notifyDone) {
                        return transactionStatus;
                    }
                    else {
                        yield (0, utils_1.sleep)(this.pollIntervalMilliSecs);
                    }
                }
            }
        });
    }
    getTransactionFee(txType, address, tokenLike, chainId // Link chain id, required number in withdraw and forcedId, others null
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionFee = yield this.transport.request('get_tx_fee', [
                txType,
                address.toString(),
                tokenLike,
                chainId,
            ]);
            return {
                feeType: transactionFee.feeType,
                gasTxAmount: ethers_1.BigNumber.from('0'),
                gasPriceWei: ethers_1.BigNumber.from(transactionFee.gasPriceWei),
                gasFee: ethers_1.BigNumber.from(transactionFee.gasFee),
                zkpFee: ethers_1.BigNumber.from(transactionFee.zkpFee),
                totalFee: ethers_1.BigNumber.from(transactionFee.totalFee),
            };
        });
    }
    getTransactionsBatchFee(txTypes, addresses, tokenLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const batchFee = yield this.transport.request('get_txs_batch_fee_in_wei', [
                txTypes,
                addresses,
                tokenLike,
            ]);
            return ethers_1.BigNumber.from(batchFee.totalFee);
        });
    }
    getTokenPrice(tokenLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPrice = yield this.transport.request('get_token_price', [tokenLike]);
            return parseFloat(tokenPrice);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.disconnect();
        });
    }
}
exports.Provider = Provider;
class ETHProxy {
    constructor(ethersProvider, contractAddress) {
        this.ethersProvider = ethersProvider;
        this.contractAddress = contractAddress;
        this.governanceContract = new ethers_1.Contract(this.contractAddress.govContract, utils_1.SYNC_GOV_CONTRACT_INTERFACE, this.ethersProvider);
    }
    resolveTokenId(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isTokenETH)(token)) {
                return 0;
            }
            else {
                const tokenId = yield this.governanceContract.tokenIds(token);
                if (tokenId == 0) {
                    throw new Error(`ERC20 token ${token} is not supported`);
                }
                return tokenId;
            }
        });
    }
}
exports.ETHProxy = ETHProxy;
