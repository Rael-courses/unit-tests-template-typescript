import axios from "axios";

export class FetchUserService {
  public async getUsernames() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const startTime = performance.now();
    const response = await axios.get(url);
    const users = response.data;
    const usernames = users.map((user: { username: string }) => user.username);
    const endTime = performance.now();
    console.log(`
      --------------------------------
      getUsernames took ${endTime - startTime} ms
      --------------------------------
    `);
    return usernames;
  }
}
