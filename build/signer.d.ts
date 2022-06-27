import { BigNumberish, ethers } from 'ethers';
import { Address, EthSignerType, PubKeyHash, Transfer, Withdraw, ForcedExit, ChangePubKey, ChangePubKeyOnchain, ChangePubKeyECDSA, ChangePubKeyCREATE2, Create2Data, ChainId, CurveAddLiquidity, CurveRemoveLiquidity, CurveSwap, Order, OrderMatching } from './types';
export declare class Signer {
    #private;
    private constructor();
    pubKeyHash(): Promise<PubKeyHash>;
    pubKey(): Promise<string>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    transferSignBytes(transfer: {
        fromSubAccountId: number;
        toSubAccountId: number;
        accountId: number;
        fromChainId: number;
        toChainId: number;
        from: Address;
        to: Address;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncTransfer(transfer: {
        fromSubAccountId: number;
        toSubAccountId: number;
        accountId: number;
        from: Address;
        to: Address;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<Transfer>;
    signSyncOrderMatching(matching: {
        accountId: number;
        account: Address;
        taker: Order;
        maker: Order;
        expectBaseAmount: BigNumberish;
        expectQuoteAmount: BigNumberish;
        fee: BigNumberish;
        feeTokenId: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<OrderMatching>;
    signSyncCurveAddLiquidity(payload: CurveAddLiquidity & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveAddLiquidity>;
    signSyncCurveRemoveLiquidity(payload: CurveRemoveLiquidity & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveRemoveLiquidity>;
    signSyncCurveSwap(payload: CurveSwap & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveSwap>;
    signSyncOrder(payload: Order & {
        validFrom: number;
        validUntil: number;
    }): Promise<Order>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    withdrawSignBytes(withdraw: {
        toChainId: number;
        subAccountId: number;
        accountId: number;
        from: Address;
        ethAddress: string;
        l2SourceToken: number;
        l1TargetToken: number;
        amount: BigNumberish;
        fee: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncWithdraw(withdraw: {
        toChainId: number;
        subAccountId: number;
        accountId: number;
        from: Address;
        to: string;
        l2SourceToken: number;
        l1TargetToken: number;
        amount: BigNumberish;
        fee: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<Withdraw>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    forcedExitSignBytes(forcedExit: {
        toChainId: ChainId;
        subAccountId: number;
        initiatorAccountId: number;
        target: Address;
        l2SourceToken: number;
        l1TargetToken: number;
        feeToken: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncForcedExit(forcedExit: {
        toChainId: ChainId;
        subAccountId: number;
        initiatorAccountId: number;
        target: Address;
        l2SourceToken: number;
        l1TargetToken: number;
        feeToken: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<ForcedExit>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    changePubKeySignBytes(changePubKey: {
        linkChainId: number;
        chainId: number;
        accountId: number;
        account: Address;
        newPkHash: PubKeyHash;
        fromChainId: number;
        toChainId: number;
        feeTokenId: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncChangePubKey(changePubKey: {
        linkChainId: number;
        accountId: number;
        account: Address;
        newPkHash: PubKeyHash;
        feeTokenId: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        ethAuthData?: ChangePubKeyOnchain | ChangePubKeyECDSA | ChangePubKeyCREATE2;
        validFrom: number;
        validUntil: number;
    }): Promise<ChangePubKey>;
    static fromPrivateKey(pk: Uint8Array): Signer;
    static fromSeed(seed: Uint8Array): Promise<Signer>;
    static fromETHSignature(ethSigner: ethers.Signer): Promise<{
        signer: Signer;
        ethSignatureType: EthSignerType;
    }>;
}
export declare class Create2WalletSigner extends ethers.Signer {
    zkSyncPubkeyHash: string;
    create2WalletData: Create2Data;
    readonly address: string;
    readonly salt: string;
    constructor(zkSyncPubkeyHash: string, create2WalletData: Create2Data, provider?: ethers.providers.Provider);
    getAddress(): Promise<string>;
    /**
     * This signer can't sign messages but we return zeroed signature bytes to comply with ethers API.
     */
    signMessage(_message: any): Promise<string>;
    signTransaction(_message: any): Promise<string>;
    connect(provider: ethers.providers.Provider): ethers.Signer;
}
