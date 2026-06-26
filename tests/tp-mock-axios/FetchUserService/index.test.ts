import axios from "axios";
import { FetchUserService } from ".";

describe("FetchUserService", () => {
  let fetchUserService: FetchUserService;
  let axiosGetSpy: jest.SpyInstance;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(() => {
    fetchUserService = new FetchUserService();
  });

  describe("getUsernames", () => {
    it("should return an array of user names", async () => {
      // Arrange
      axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({
        data: [
          { username: "Alice" },
          { username: "Bob" },
          { username: "Charlie" },
        ],
      });
      const expected = ["Alice", "Bob", "Charlie"];

      // Act
      const result = await fetchUserService.getUsernames();

      // Assert
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      expect(axiosGetSpy).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
      );
      expect(result).toStrictEqual(expected);
    });
  });
});
