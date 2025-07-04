import axios from "axios";
import z from "zod";
import { userSchema } from "./models/User";

export class FetchUserService {
  private readonly apiUrl = "https://jsonplaceholder.typicode.com/users";

  public async getUserNames() {
    const response = await axios.get(this.apiUrl);

    if (response.status === 401) {
      throw new Error("Utilisateur non authentifié");
    }

    if (response.status === 200) {
      const data = response.data;
      const dataValidation = await z.array(userSchema).safeParseAsync(data);
      if (!dataValidation.success) {
        throw new Error("Données utilisateur invalides");
      }

      return dataValidation.data.map((user) => user.name);
    }

    throw new Error("Une erreur est survenue");
  }
}
