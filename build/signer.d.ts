import { BigNumberish, ethers } from 'ethers';
import { Address, EthSignerType, PubKeyHash, TransferData, WithdrawData, ForcedExitData, ChangePubKeyData, ChangePubKeyOnchain, ChangePubKeyECDSA, ChangePubKeyCREATE2, Create2Data, OrderData, OrderMatchingData, Signature, TokenId } from './types';
export declare class Signer {
    #private;
    private constructor();
    pubKeyHash(): Promise<PubKeyHash>;
    signTransactionBytes(msg: string): Promise<Signature>;
    pubKey(): Promise<string>;
    signTransfer(tx: TransferData): Promise<TransferData>;
    signOrderMatching(tx: OrderMatchingData): Promise<OrderMatchingData>;
    signOrder(tx: OrderData): Promise<OrderData>;
    signWithdraw(tx: WithdrawData): Promise<WithdrawData>;
    signForcedExit(tx: ForcedExitData): Promise<ForcedExitData>;
    signChangePubKey(changePubKey: {
        chainId: number;
        subAccountId: number;
        accountId: number;
        account: Address;
        newPkHash: PubKeyHash;
        feeToken: TokenId;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        ethAuthData?: ChangePubKeyOnchain | ChangePubKeyECDSA | ChangePubKeyCREATE2;
    }): Promise<ChangePubKeyData>;
    static fromPrivateKey(pk: Uint8Array): Signer;
    static fromSeed(seed: Uint8Array): Promise<Signer>;
    static fromETHSignature(ethSigner: ethers.Signer, restoreKey?: string): Promise<{
        signer: Signer;
        signature: string;
        ethSignatureType: EthSignerType;
    }>;
}
export declare class Create2WalletSigner extends ethers.Signer {
    zkSyncPubkeyHash: string;
    create2WalletData: Create2Data;
    createrSigner: ethers.Signer;
    readonly address: string;
    readonly salt: string;
    constructor(zkSyncPubkeyHash: string, create2WalletData: Create2Data, createrSigner: ethers.Signer, provider?: ethers.providers.Provider);
    getAddress(): Promise<string>;
    /**
     * This signer can't sign messages but we return zeroed signature bytes to comply with ethers API.
     */
    signMessage(_message: any): Promise<string>;
    signTransaction(_message: any): Promise<string>;
    connect(provider: ethers.providers.Provider): ethers.Signer;
}
