import { Wallet as LinkWallet } from '../src/wallet'
import { Provider as LinkProvider } from '../src/provider'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber, providers, utils } from 'ethers'
import { ChangePubKeyEntries, TransferEntries } from '../src/types'
import { parseEther } from 'ethers/lib/utils'
import { getWallet } from './wallet.test'

describe('Create2 Transfer', () => {
  it('signature', async () => {
    const DeployerAddress = '0x71Eeff03cAe4825E8Aa8647E62296E91176806Ea'
    const AliceAddress = '0xF9690910533F09B98a5c800Bc931747e2677397C'
    const AlicePrivateKey = '0x43be0b8bdeccb5a13741c8fd076bf2619bfc9f6dcc43ad6cf965ab489e156ced'
    const AccountMockCodeHash = '0x668ee252a9ca183e2ca7813e5c4ccc8791c6a699f097d2d83f24e958ed520c32'

    const wallet = await getWallet(AlicePrivateKey as any)
    const create2Data = {
      creatorAddress: DeployerAddress,
      saltArg: '0x0000000000000000000000000000000000000000000000000000000000000000',
      codeHash: AccountMockCodeHash,
    }
    const create2Wallet = await LinkWallet.fromCreate2Data(
      wallet.signer!,
      wallet.ethSigner,
      wallet.provider,
      create2Data
    )
    expect(create2Wallet.address()).toBe('0x31a6b64a162b7e6f8efdf59c0b6f26b60006e040')
    const entries: TransferEntries = {
      fromSubAccountId: 1,
      toSubAccountId: 1,
      to: '0xF9690910533F09B98a5c800Bc931747e2677397C',
      token: 1,
      amount: parseEther('1'),
      nonce: 0,
      ts: 1668054154,
    }

    const signed = await create2Wallet.signTransfer(entries)

    expect(signed.ethereumSignature).toStrictEqual({
      type: 'EIP1271Signature',
      signature:
        '0x3a85ce4ddabb03847c26ac1450815eb83bdbd19d45e012118eece70dce44ac11355d493be1bcf383f0d15bc510db79005b68078df64652fefa772ded909405621c',
    })

    expect(signed.tx.signature).toStrictEqual({
      pubKey: '5e1e8f2a972cb702dc55df70310018d63251e6e7698c7079886e3dc07fbb5ea8',
      signature:
        'fe9e25f3fda300f401890971938b5794cb949b549a6ef0cd7f947fab7516241c7a97bfaaf72d7d753397bd0151a6aa8b61ae16dc61365ad459175f8fc1497903',
    })
  })
})