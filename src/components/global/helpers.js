export function saveLocal(item, data) {
  localStorage.setItem(item, JSON.stringify(data));
}

export function getLocal(item) {
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (e) {
    return localStorage.getItem(item);
  }
}
