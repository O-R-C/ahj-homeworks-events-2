/**
 * Создает элемент с указанным типом и классом\классами
 * @param {string | string[]} className имя класса или массив имен
 * @param {string} type тип элемента
 * @returns созданный элемент
 */
export const createElement = (className, type = 'div') => {
  const element = document.createElement(type)
  if (Array.isArray(className)) {
    element.classList.add(...className)
  } else {
    element.classList.add(className)
  }
  return element
}
