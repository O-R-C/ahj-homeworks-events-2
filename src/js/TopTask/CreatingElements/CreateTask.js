import CreateElement from './CreateElement'

/**
 * Создает задачу
 * @class
 */
export default class CreateTask extends CreateElement {
  /**
   * Возвращает задачу
   * @param {string} title текст задачи
   * @returns элемент
   */
  getTask(title) {
    return this.createTask(title)
  }

  /**
   * Создает задачу
   * @param {string} title текст задачи
   * @returns элемент
   */
  createTask(title) {
    const task = this.getElement('task')
    task.textContent = title

    return task
  }
}
