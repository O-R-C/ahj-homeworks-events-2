import CreateElement from './CreateElement'
import styles from './CreateTask.module.css'

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
  createTask({ title, id }) {
    const task = this.getElement(styles.task)
    task.textContent = title
    task.dataset.id = id

    const button = this.getElement(styles.button, 'button')
    task.append(button)

    return task
  }
}
