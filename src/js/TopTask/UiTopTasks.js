import { createElement } from './utility'

/**
 * Создает элементы для интерфейса списка задач
 */
export default class UiTopTasks {
  constructor() {
    this.createElement = createElement

    this.field = this.createField()
  }

  /**
   * Создает секцию поля ввода
   * @returns элемент секцию поля ввода
   */
  createField() {
    const container = this.createElement(['section', 'section-field'])
    const field = this.createElement('field', 'input')

    container.append(field)
    return container
  }

  getField() {
    return this.field
  }

  /**
   * Показывает заголовки на странице
   */
  showTitle(title) {
    document.querySelector('title').textContent = title
    document.querySelector('.welcome').textContent = title
  }
}
