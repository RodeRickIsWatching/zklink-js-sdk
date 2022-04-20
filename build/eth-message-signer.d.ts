import * as ethers from 'ethers';
import { TxEthSignature, EthSignerType, PubKeyHash, Address, Order } from './types';
/**
 * Wrapper around `ethers.Signer` which provides convenient methods to get and sign messages required for zkSync.
 */
export declare class EthMessageSigner {
    private ethSigner;
    private ethSignerType?;
    constructor(ethSigner: ethers.Signer, ethSignerType?: EthSignerType);
    getEthMessageSignature(message: ethers.utils.BytesLike): Promise<TxEthSignature>;
    getTransferEthSignMessage(transfer: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to: string;
        nonce: number;
        accountId: number;
    }): string;
    ethSignTransfer(transfer: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to: string;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
    getSwapEthMessagePart(tx: {
        stringAmountIn: string;
        stringAmountOut: string;
        stringFee0: string;
        stringFee1: string;
        stringTokenIn: string;
        stringTokenOut: string;
        pairAddress: string;
    }): string;
    getSwapEthSignMessage(transfer: {
        stringAmountIn: string;
        stringAmountOut: string;
        stringAmountOutMin: string;
        stringFee0: string;
        stringFee1: string;
        stringTokenIn: string;
        stringTokenOut: string;
        pairAddress: string;
        nonce: number;
        accountId: number;
    }): string;
    ethSignSwap(transfer: {
        stringAmountIn: string;
        stringAmountOut: string;
        stringAmountOutMin: string;
        stringFee0: string;
        stringFee1: string;
        stringTokenIn: string;
        stringTokenOut: string;
        pairAddress: string;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
    getRemoveLiquidityEthMessagePart(tx: {
        stringAmount0: string;
        stringAmount1: string;
        stringLpQuantity: string;
        pairAddress: Address;
        fee1: string;
        fee2: string;
        nonce: number;
        accountId: number;
    }): string;
    getRemoveLiquidityEthSignMessage(transfer: {
        stringAmount0: string;
        stringAmount1: string;
        stringLpQuantity: string;
        pairAddress: Address;
        fee1: string;
        fee2: string;
        nonce: number;
        accountId: number;
    }): string;
    ethSignRemoveLiquidity(transfer: {
        stringAmount0: string;
        stringAmount1: string;
        stringTokenIn: string;
        stringTokenOut: string;
        stringTokenLp: string;
        stringLpQuantity: string;
        pairAddress: Address;
        fee1: string;
        fee2: string;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
    ethSignAddLiquidity(transfer: {
        stringAmount0: string;
        stringAmount1: string;
        stringAmount0Min: string;
        stringAmount1Min: string;
        stringToken0: string;
        stringToken1: string;
        account: string;
        nonce: number;
        accountId: number;
        pairAccount: Address;
    }): Promise<TxEthSignature>;
    getAddLiquidityEthSignMessage(transfer: {
        stringAmount0: string;
        stringAmount1: string;
        stringToken0: string;
        stringToken1: string;
        account: string;
        nonce: number;
        accountId: number;
    }): string;
    getAddLiquidityEthMessagePart(tx: {
        stringAmount0: string;
        stringAmount1: string;
        stringToken0: string;
        stringToken1: string;
        account: string;
        nonce: number;
        accountId: number;
    }): string;
    ethSignCurveAddLiquidity(payload: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): Promise<TxEthSignature>;
    getCurveAddLiquidityEthSignMessage(payload: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    getCurveAddLiquidityEthMessagePart(tx: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    ethSignCurveRemoveLiquidity(payload: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): Promise<TxEthSignature>;
    getCurveRemoveLiquidityEthSignMessage(payload: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    getCurveRemoveLiquidityEthMessagePart(tx: {
        stringAmounts: string[];
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    ethSignCurveSwap(payload: {
        stringAmountIn: string;
        stringAmountOut: string;
        tokenIn: string | number;
        tokenOut: string | number;
        account: string;
        nonce: number;
        pairAccount: Address;
    }): Promise<TxEthSignature>;
    getCurveSwapEthSignMessage(payload: {
        stringAmountIn: string;
        stringAmountOut: string;
        tokenIn: string | number;
        tokenOut: string | number;
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    getCurveSwapEthMessagePart(tx: {
        stringAmountIn: string;
        stringAmountOut: string;
        tokenIn: string | number;
        tokenOut: string | number;
        account: string;
        nonce: number;
        pairAccount: Address;
    }): string;
    ethSignOrder(payload: Order): Promise<TxEthSignature>;
    getOrderEthSignMessage(payload: Order): string;
    getOrderEthMessagePart(tx: Order): string;
    getCreatePoolEthMessagePart(tx: {
        token0: string;
        token1: string;
    }): string;
    getCreatePoolEthSignMessage(transfer: {
        token0: string;
        token1: string;
        nonce: number;
        accountId: number;
    }): string;
    ethSignCreatePool(transfer: {
        token0: string;
        token1: string;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
    ethSignForcedExit(forcedExit: {
        stringToken: string;
        stringFee: string;
        target: string;
        nonce: number;
    }): Promise<TxEthSignature>;
    getWithdrawEthSignMessage(withdraw: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to: string;
        nonce: number;
        accountId: number;
    }): string;
    getForcedExitEthSignMessage(forcedExit: {
        stringToken: string;
        stringFee: string;
        target: string;
        nonce: number;
    }): string;
    getTransferEthMessagePart(tx: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to?: string;
    }, type: 'transfer' | 'withdraw'): string;
    getWithdrawEthMessagePart(tx: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to?: string;
    }): string;
    getChangePubKeyEthMessagePart(changePubKey: {
        pubKeyHash: PubKeyHash;
        stringToken: string;
        stringFee: string;
    }): string;
    getForcedExitEthMessagePart(forcedExit: {
        stringToken: string;
        stringFee: string;
        target: string;
    }): string;
    ethSignWithdraw(withdraw: {
        stringAmount: string;
        stringToken: string;
        stringFee: string;
        to: string;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
    getChangePubKeyEthSignMessage(changePubKey: {
        pubKeyHash: PubKeyHash;
        nonce: number;
        accountId: number;
    }): Uint8Array;
    ethSignChangePubKey(changePubKey: {
        pubKeyHash: PubKeyHash;
        nonce: number;
        accountId: number;
    }): Promise<TxEthSignature>;
}
