export default class ApiError extends Error {
  constructor(error) {
    const apiResponseBody = error.response.data
    super(apiResponseBody.message)
    this.data = apiResponseBody
  }
}
