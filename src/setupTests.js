let localStorage = {}

const localStorageMock = {
  getItem(key) {
    return localStorage[key] || null
  },
  setItem(key, value) {
    localStorage[key] = value.toString()
  },
  clear() {
    localStorage = {}
  },
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
