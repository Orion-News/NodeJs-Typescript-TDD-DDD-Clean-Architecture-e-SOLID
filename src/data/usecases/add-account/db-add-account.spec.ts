import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols'



const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise <AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

interface SutTypes {
  sut: DbAddAccount
  HasherStub: Hasher
  makeAddAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const HasherStub = makeHasher()
  const makeAddAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(HasherStub, makeAddAccountRepositoryStub)
  return {
    sut,
    HasherStub,
    makeAddAccountRepositoryStub
  } 
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async() => {
    const { sut, HasherStub } = makeSut()
    const encryptSpy = jest.spyOn(HasherStub, 'hash')
    
    
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async() => {
    const { sut, HasherStub } = makeSut()
    jest.spyOn(HasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    
    
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async() => {
    const { sut, makeAddAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(makeAddAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if addAccountRepository throws', async() => {
    const { sut, makeAddAccountRepositoryStub } = makeSut()
    jest.spyOn(makeAddAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on sucess', async() => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })
})