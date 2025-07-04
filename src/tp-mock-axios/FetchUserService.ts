import axios from "axios";

export class FetchUserService {
  private readonly apiUrl = "https://jsonplaceholder.typicode.com/users";

  public async getUserNames() {
    const response = await axios.get(this.apiUrl);

    if (response.status === 401) {
      throw new Error("Utilisateur non authentifié");
    }

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Une erreur est survenue");
  }
}
