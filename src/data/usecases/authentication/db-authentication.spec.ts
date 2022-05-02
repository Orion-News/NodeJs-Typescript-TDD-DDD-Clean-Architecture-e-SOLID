import { DbAuthentication } from './db-authentication'
import { AccountModel, LoadAccountByEmailRepository, AuthenticationModel, HashComparer, Encrypter, UpdateAcessTokenRepository } from './db-authentication-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(res => res(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(res => res(true))
    }
  }
  return new HashComparerStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return new Promise(res => res('any_token'))
    }
  }
  return new EncrypterStub()
}

const makeAcessTokenRepository = (): UpdateAcessTokenRepository => {
  class updateAcessTokenRepositoryStub implements UpdateAcessTokenRepository {
    async update (id: string, token: string): Promise<string> {
      return new Promise(res => res('vazio'))
    }
  }
  return new updateAcessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  EncrypterStub: Encrypter
  updateAcessTokenRepositoryStub: UpdateAcessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const EncrypterStub = makeEncrypter()
  const updateAcessTokenRepositoryStub = makeAcessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub, 
    EncrypterStub, 
    updateAcessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    EncrypterStub,
    updateAcessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async() => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async() => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((res, rej) => rej(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async() => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async() => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async() => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((res, rej) => rej(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async() => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      new Promise(res => res(false))
    )
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async() => {
    const { sut, EncrypterStub } = makeSut()
    const generateSpy = jest.spyOn(EncrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should if throws Encrypter throws', () => {
    const { sut, EncrypterStub } = makeSut()
    jest.spyOn(EncrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((res, rej) => rej(new Error()))
    )
    const accessToken = sut.auth(makeFakeAuthentication())
    expect(accessToken).rejects.toThrow()
  })

  test('Should call Encrypter with correct id', async() => {
    const acesstoken = await makeSut().sut.auth(makeFakeAuthentication())
    expect(acesstoken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAcessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should if throws UpdateAccessTokenRepository throws', () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAcessTokenRepositoryStub, 'update').mockReturnValueOnce(
      new Promise((res, rej) => rej(new Error()))
    )
    const accessToken = sut.auth(makeFakeAuthentication())
    expect(accessToken).rejects.toThrow()
  })
})