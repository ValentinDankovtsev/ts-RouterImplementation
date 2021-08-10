import { Router } from "./Router";

describe("history router", () => {
  it("isWork", async () => {
    history.pushState({}, "", "/");
    const router = Router();
    expect(location.toString()).toBe("http://localhost/");
    await router.go("/home/about");
    expect(location.toString()).toBe("http://localhost/home/about");
    await router.go("/home/about/me");
    expect(location.toString()).toBe("http://localhost/home/about/me");

    expect(location.pathname.toString()).toBe("/home/about/me");
    router.on("sdad");
    expect(router.listeners).toHaveLength(1);
    expect(router.listeners).toEqual([{ match: "sdad" }]);
    router.on("sdasdfd");
    expect(router.listeners).toHaveLength(2);
    expect(router.listeners).toEqual([{ match: "sdad" }, { match: "sdasdfd" }]);
  });
});
