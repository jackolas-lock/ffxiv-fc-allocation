import dataMap from './dataMap';

export function saveLocal(item, data) {
  if (Array.isArray(dataMap[item]) || typeof dataMap[item] === 'object') {
    localStorage.setItem(item, JSON.stringify(data));
  } else {
    localStorage.setItem(item, data);
  }
}

export function getLocal(item) {
  const fetchedItem = localStorage.getItem(item);
  let parsedItem;

  if (fetchedItem) {
    if (Array.isArray(dataMap[item]) || typeof dataMap[item] === 'object') {
      parsedItem = JSON.parse(fetchedItem);
    } else {
      parsedItem = localStorage.getItem(item);
    }
  } else {
    parsedItem = dataMap[item] ?? null;
  }
  return parsedItem;
}

export function isEmptyObject(object) {
  return Object.keys(object).length === 0;
}
