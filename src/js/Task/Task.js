/**
 * Создает объект задачу
 * @class
 */
export default class Task {
  /**
   * @param {string} title текст задачи
   * @returns объект задачу
   */
  getTask(title) {
    return this.createTask(title)
  }

  /**
   * Создает объект задачу
   * @param {string} title текст задачи
   * @returns объект задачу
   */
  createTask(title) {
    return { title, pinned: false }
  }
}
