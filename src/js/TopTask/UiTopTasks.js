import CreateElement from './CreatingElements/CreateElement'
import Wrapper from '../Wrapper/Wrapper'
import CreateTask from './CreatingElements/CreateTask'
import CreateSection from './CreatingElements/CreateSection'

/**
 * Создает элементы для интерфейса списка задач
 */
export default class UiTopTasks {
  _field = { className: 'field', type: 'input' }
  _pinned = { className: 'pinned', type: 'h2', textContent: 'Pinned' }
  _allTasks = { className: 'allTasks', type: 'h2', textContent: 'All Tasks' }

  constructor() {
    this.wrapper = new Wrapper()
    this.createTask = new CreateTask()
    this.createSection = new CreateSection()
    this.createElement = new CreateElement()
  }

  /**
   * @returns секцию поля ввода
   */
  getField() {
    return this.createSection.getSection(this._field)
  }

  /**
   * @returns секцию Pinned
   */
  getPinned() {
    return this.createSection.getSection(this._pinned, this.wrapper)
  }

  /**
   * @returns секцию All Tasks
   */
  getAllTasks() {
    return this.createSection.getSection(this._allTasks, this.wrapper)
  }

  /**
   * @param {string} title текст задачи
   * @returns задачу
   */
  getTask(title) {
    return this.createTask.getTask(title)
  }

  getTasks(tasks) {
    return tasks.reduce((acc, task) => [...acc, this.getTask(task)], [])
  }

  /**
   * Возвращает элемент с указанным типом и классом\классами
   * @param {string | string[]} className имя класса или массив имен
   * @param {string} type тип элемента
   * @returns созданный элемент
   */
  getElement(className, type) {
    return this.createElement.getElement(className, type)
  }

  /**
   * Возвращает элемент с переданным сообщением
   * @param {string} className имя класса
   * @param {string} title текст сообщения
   * @returns элемент
   */
  getNoTasksElement(className, title) {
    const element = this.createElement.getElement(className)
    element.textContent = title
    return element
  }

  /**
   * Меняет текст заголовков
   */
  showTitle(title) {
    document.querySelector('title').textContent = title
    document.querySelector('.welcome').textContent = title
  }
}
