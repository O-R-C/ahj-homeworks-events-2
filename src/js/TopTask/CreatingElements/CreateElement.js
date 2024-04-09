/**
 * Базовый класс создания элемента
 * @class
 */
export default class CreateElement {
  /**
   * Возвращает элемент с указанным типом и классом\классами
   * @param {string | string[]} className имя класса или массив имен
   * @param {string} type тип элемента
   * @returns созданный элемент
   */
  getElement(className, type = 'div') {
    return this.createElement(className, type)
  }

  /**
   * Создает элемент с указанным типом и классом\классами
   * @param {string | string[]} className имя класса или массив имен
   * @param {string} type тип элемента
   * @returns созданный элемент
   */
  createElement(className, type) {
    const element = document.createElement(type)
    Array.isArray(className)
      ? element.classList.add(...className)
      : element.classList.add(className)

    return element
  }
}
