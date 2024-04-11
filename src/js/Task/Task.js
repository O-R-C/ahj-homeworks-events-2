import { nanoid } from 'nanoid'

/**
 * Создает объект задачу
 * @class
 */
export default class Task {
  /**
   * Создает объект задачу
   * @constructor
   * @param {string} title текст задачи
   */
  constructor(title) {
    this.title = title
    this.pinned = false
    this.id = nanoid(10)
  }
}
