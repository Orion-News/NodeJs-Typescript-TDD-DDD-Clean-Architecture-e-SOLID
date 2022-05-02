export interface UpdateAcessTokenRepository {
    update (id: string, token: string): Promise<string>
}