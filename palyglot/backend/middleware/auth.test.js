const auth = require("./auth")
// @ponicode
describe("auth", () => {
    test("0", async () => {
        await auth({ userId: "bc23a9d531064583ace8f67dad60f6bb", uid: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", header: () => "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" }, { status: () => 500 }, () => " ")
    })

    test("1", async () => {
        await auth({ userId: 9876, uid: "a85a8e6b-348b-4011-a1ec-1e78e9620782", header: () => "http://www.example.com/route/123?foo=bar" }, { status: () => 400 }, () => " ")
    })

    test("2", async () => {
        await auth({ userId: "bc23a9d531064583ace8f67dad60f6bb", uid: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", header: () => "ponicode.com" }, { status: () => 429 }, () => " ")
    })

    test("3", async () => {
        await auth({ userId: 9876, uid: "a85a8e6b-348b-4011-a1ec-1e78e9620782", header: () => "https://" }, { status: () => 400 }, () => " ")
    })

    test("4", async () => {
        await auth({ userId: "bc23a9d531064583ace8f67dad60f6bb", uid: "7289708e-b17a-477c-8a77-9ab575c4b4d8", header: () => "ponicode.com" }, { status: () => 200 }, () => " ")
    })

    test("5", async () => {
        await auth(undefined, undefined, undefined)
    })
})
