import { 
  Authentication, 
  AuthenticationModel, 
  LoadAccountByEmailRepository, 
  HashComparer, 
  Encrypter, 
  UpdateAcessTokenRepository 
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {  
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
  ){}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if ( account ) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const acessToken = await this.encrypter.encrypt(account.id)
        await this.updateAcessTokenRepository.updateAccessToken(account.id, acessToken)
        return acessToken
      }
    }
    return null
  }
}