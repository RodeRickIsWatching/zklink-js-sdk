import { BigNumber, BigNumberish, Contract, ContractTransaction, ethers } from 'ethers';
import { EthMessageSigner } from './eth-message-signer';
import { Provider } from './provider';
import { Signer } from './signer';
import { AccountState, Address, TokenLike, Nonce, PriorityOperationReceipt, TransactionReceipt, PubKeyHash, ChangePubKey, EthSignerType, SignedTransaction, Transfer, TxEthSignature, ForcedExit, Withdraw, ChangePubkeyTypes, ChangePubKeyOnchain, ChangePubKeyECDSA, ChangePubKeyCREATE2, Create2Data, ChainId, TokenId, Order, TokenSymbol, TokenAddress, OrderMatching } from './types';
export declare class ZKSyncTxError extends Error {
    value: PriorityOperationReceipt | TransactionReceipt;
    constructor(message: string, value: PriorityOperationReceipt | TransactionReceipt);
}
export declare class Wallet {
    ethSigner: ethers.Signer;
    ethMessageSigner: EthMessageSigner;
    cachedAddress: Address;
    signer?: Signer;
    accountId?: number;
    ethSignerType?: EthSignerType;
    provider: Provider;
    private constructor();
    connect(provider: Provider): this;
    static fromEthSigner(ethWallet: ethers.Signer, provider: Provider, signer?: Signer, accountId?: number, ethSignerType?: EthSignerType): Promise<Wallet>;
    static fromCreate2Data(syncSigner: Signer, provider: Provider, create2Data: Create2Data, accountId?: number): Promise<Wallet>;
    static fromEthSignerNoKeys(ethWallet: ethers.Signer, provider: Provider, accountId?: number, ethSignerType?: EthSignerType): Promise<Wallet>;
    getEIP712Signature(data: any): Promise<TxEthSignature>;
    getEthMessageSignature(message: ethers.utils.BytesLike): Promise<TxEthSignature>;
    getTransfer(tx: Transfer): Promise<Transfer>;
    signSyncTransfer(transfer: {
        fromSubAccountId: number;
        toSubAccountId: number;
        to: Address;
        token: TokenLike;
        amount: BigNumberish;
        fee: BigNumberish;
        accountId: number;
        ts?: number;
        nonce: number;
    }): Promise<SignedTransaction>;
    getOrderMatching(matching: {
        accountId: number;
        account: Address;
        taker: Order;
        maker: Order;
        expectBaseAmount: BigNumberish;
        expectQuoteAmount: BigNumberish;
        fee: BigNumberish;
        feeToken: TokenLike;
        nonce: number;
    }): Promise<OrderMatching>;
    signSyncOrderMatching(matching: {
        accountId: number;
        account: Address;
        taker: any;
        maker: any;
        expectBaseAmount: BigNumberish;
        expectQuoteAmount: BigNumberish;
        fee: BigNumberish;
        feeToken: TokenLike;
        ts?: number;
        nonce: number;
    }): Promise<SignedTransaction>;
    getForcedExit(tx: ForcedExit): Promise<ForcedExit>;
    signSyncForcedExit(forcedExit: {
        toChainId: ChainId;
        subAccountId: number;
        target: Address;
        l2SourceToken: TokenLike;
        l1TargetToken: TokenLike;
        feeToken: TokenLike;
        fee?: BigNumberish;
        ts?: number;
        nonce: number;
    }): Promise<SignedTransaction>;
    syncForcedExit(forcedExit: {
        target: Address;
        toChainId: ChainId;
        subAccountId: number;
        l2SourceToken: TokenLike;
        l1TargetToken: TokenLike;
        feeToken: TokenLike;
        ts?: number;
        fee?: BigNumberish;
        nonce?: Nonce;
    }): Promise<Transaction>;
    syncTransfer(transfer: {
        fromSubAccountId: number;
        toSubAccountId: number;
        to: Address;
        token: TokenLike;
        amount: BigNumberish;
        ts?: number;
        fee?: BigNumberish;
        accountId?: number;
        nonce?: Nonce;
    }): Promise<Transaction>;
    getOrder(payload: Order): Promise<Order>;
    signSyncOrder(payload: Order): Promise<SignedTransaction>;
    getWithdrawFromSyncToEthereum(tx: Withdraw): Promise<Withdraw>;
    signWithdrawFromSyncToEthereum(withdraw: {
        toChainId: number;
        subAccountId: number;
        to: string;
        l2SourceToken: TokenLike;
        l1TargetToken: TokenLike;
        amount: BigNumberish;
        fee: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        accountId: number;
        ts?: number;
        nonce: number;
    }): Promise<SignedTransaction>;
    withdrawFromSyncToEthereum(withdraw: {
        toChainId: number;
        subAccountId: number;
        to: string;
        l2SourceToken: TokenLike;
        l1TargetToken: TokenLike;
        amount: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        ts?: number;
        fee?: BigNumberish;
        nonce?: Nonce;
        fastProcessing?: boolean;
    }): Promise<Transaction>;
    isSigningKeySet(): Promise<boolean>;
    getChangePubKey(changePubKey: {
        linkChainId: number;
        feeToken: TokenLike;
        fee: BigNumberish;
        nonce: number;
        accountId?: number;
        ethAuthData?: ChangePubKeyOnchain | ChangePubKeyECDSA | ChangePubKeyCREATE2;
        ts: number;
    }): Promise<ChangePubKey>;
    signSetSigningKey(changePubKey: {
        linkChainId: number;
        feeToken: TokenLike;
        fee: BigNumberish;
        nonce: number;
        ethAuthType: ChangePubkeyTypes;
        verifyingContract: string;
        chainId: number;
        domainName?: string;
        version?: string;
        accountId?: number;
        batchHash?: string;
        ts?: number;
    }): Promise<SignedTransaction>;
    setSigningKey(changePubKey: {
        linkChainId: number;
        feeToken: TokenLike;
        ethAuthType: ChangePubkeyTypes;
        chainId: number;
        verifyingContract: Address;
        domainName?: string;
        version?: string;
        fee?: BigNumberish;
        nonce?: Nonce;
    }): Promise<Transaction>;
    getTransferEthMessagePart(transfer: {
        to: Address;
        token: TokenSymbol;
        amount: BigNumberish;
        fee: BigNumberish;
    }): string;
    getWithdrawEthMessagePart(withdraw: {
        to: string;
        token: TokenLike;
        amount: BigNumberish;
        fee: BigNumberish;
    }): string;
    getChangePubKeyEthMessagePart(changePubKey: {
        pubKeyHash: string;
        feeToken: TokenLike;
        fee: BigNumberish;
    }): string;
    getForcedExitEthMessagePart(forcedExit: {
        target: Address;
        token: TokenLike;
        fee: BigNumberish;
        nonce: number;
    }): string;
    isOnchainAuthSigningKeySet(linkChainId: number, nonce?: Nonce): Promise<boolean>;
    onchainAuthSigningKey(linkChainId: number, nonce?: Nonce, ethTxOptions?: ethers.providers.TransactionRequest): Promise<ContractTransaction>;
    getCurrentPubKeyHash(): Promise<PubKeyHash>;
    getNonce(nonce?: Nonce): Promise<number>;
    getAccountId(): Promise<number | undefined>;
    address(): Address;
    getAccountState(): Promise<AccountState>;
    getSubAccountState(subAccountId: number): Promise<AccountState>;
    getBalance(token: TokenLike, subAccountId: number): Promise<BigNumber>;
    getEthereumBalance(token: TokenLike, linkChainId: ChainId): Promise<BigNumber>;
    estimateGasDeposit(linkChainId: number, args: any[]): Promise<BigNumber>;
    depositToSyncFromEthereum(deposit: {
        subAccountId: number;
        depositTo: Address;
        token: TokenAddress;
        amount: BigNumberish;
        linkChainId: number;
        mapping: boolean;
        ethTxOptions?: ethers.providers.TransactionRequest;
        approveDepositAmountForERC20?: boolean;
    }): Promise<ETHOperation>;
    emergencyWithdraw(withdraw: {
        tokenId: TokenId;
        subAccountId: number;
        linkChainId: number;
        accountId?: number;
        ethTxOptions?: ethers.providers.TransactionRequest;
    }): Promise<ETHOperation>;
    getZkSyncMainContract(linkChainId: number): Promise<Contract>;
    private modifyEthersError;
    private setRequiredAccountIdFromServer;
}
export declare class ETHOperation {
    ethTx: ContractTransaction;
    zkSyncProvider: Provider;
    state: 'Sent' | 'Mined' | 'Committed' | 'Verified' | 'Failed';
    error?: ZKSyncTxError;
    priorityOpId?: BigNumber;
    constructor(ethTx: ContractTransaction, zkSyncProvider: Provider);
    awaitEthereumTxCommit(): Promise<ethers.ContractReceipt>;
    awaitReceipt(linkChainId: number): Promise<PriorityOperationReceipt>;
    awaitVerifyReceipt(linkChainId: number): Promise<PriorityOperationReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
export declare class Transaction {
    txData: any;
    txHash: string;
    sidechainProvider: Provider;
    state: 'Sent' | 'Committed' | 'Verified' | 'Failed';
    error?: ZKSyncTxError;
    constructor(txData: any, txHash: string, sidechainProvider: Provider);
    awaitReceipt(): Promise<TransactionReceipt>;
    awaitVerifyReceipt(): Promise<TransactionReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
export declare function submitSignedTransaction(signedTx: SignedTransaction, provider: Provider): Promise<Transaction>;
