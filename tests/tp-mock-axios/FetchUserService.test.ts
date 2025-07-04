import { FetchUserService } from "@/tp-mock-axios/FetchUserService";
import { User } from "@/tp-mock-axios/models/User";
import axios from "axios";
import { container } from "tsyringe";

describe("FetchUserService", () => {
  const fetchUserService = container.resolve(FetchUserService);
  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  afterEach(() => {
    jest.resetAllMocks(); // Clear mock calls and implementations
    jest.restoreAllMocks(); // Restore original implementations
  });

  describe("mock with jest.fn", () => {
    it("should throw 'Utilisateur non authentifié' if api returns 401", async () => {
      axios.get = jest.fn().mockImplementation(async () => {
        return {
          status: 401,
        };
      });

      const act = async () => await fetchUserService.getUserNames();

      await expect(act).rejects.toThrow("Utilisateur non authentifié");
      expect(axios.get).toHaveBeenCalledWith(apiUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it.each`
      status
      ${400}
      ${404}
      ${500}
    `(
      "should throw 'Une erreur est survenue', if api returns an error",
      async ({ status }) => {
        axios.get = jest.fn().mockImplementation(async () => {
          return {
            status,
          };
        });

        const act = async () => await fetchUserService.getUserNames();

        await expect(act).rejects.toThrow("Une erreur est survenue");
        expect(axios.get).toHaveBeenCalledWith(apiUrl);
        expect(axios.get).toHaveBeenCalledTimes(1);
      }
    );

    it("should return user names", async () => {
      axios.get = jest.fn().mockImplementation(async () => {
        return {
          status: 200,
          data: [{ name: "user1" }, { name: "user2" }, { name: "user3" }],
        };
      });

      const result = await fetchUserService.getUserNames();

      expect(result).toStrictEqual(
        expect.arrayContaining(["user2", "user1", "user3"])
      );
      expect(axios.get).toHaveBeenCalledWith(apiUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("mock with jest.spyOn", () => {
    type AxiosResponse = Awaited<ReturnType<typeof axios.get>>;

    it("should throw 'Utilisateur non authentifié' if api returns 401", async () => {
      const resolvedValue = {
        status: 401,
      } satisfies Pick<AxiosResponse, "status">;

      jest
        .spyOn(axios, "get")
        .mockResolvedValue(resolvedValue as AxiosResponse);

      const act = async () => await fetchUserService.getUserNames();
      await expect(act).rejects.toThrow("Utilisateur non authentifié");
      expect(axios.get).toHaveBeenCalledWith(apiUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should return user names", async () => {
      const resolvedValue = {
        status: 200,
        data: [
          { name: "user1" },
          { name: "user2" },
          { name: "user3" },
        ] satisfies User[],
      } satisfies Pick<AxiosResponse, "status" | "data">;
      jest
        .spyOn(axios, "get")
        .mockResolvedValue(resolvedValue as AxiosResponse);

      const result = await fetchUserService.getUserNames();

      expect(result).toStrictEqual(
        expect.arrayContaining(["user2", "user1", "user3"])
      );
      expect(axios.get).toHaveBeenCalledWith(apiUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
