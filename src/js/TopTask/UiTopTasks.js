import { createElement } from '../utility'
import Wrapper from '../Wrapper/Wrapper'
import CreateTask from './CreatingElements/CreateTask'
import CreateSection from './CreatingElements/CreateSection'
import styles from './UiTopTasks.module.css'

/**
 * Создает элементы для интерфейса списка задач
 */
export default class UiTopTasks {
  _field = { className: 'field', type: 'input' }
  _pinned = { className: 'pinned', type: 'h2', textContent: 'Pinned' }
  _allTasks = { className: 'allTasks', type: 'h2', textContent: 'All Tasks' }

  constructor() {
    this.wrapper = new Wrapper()
    this.createElement = createElement
    this.createTask = new CreateTask()
    this.createSection = new CreateSection()
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
    console.log('🚀 ~ UiTopTasks ~ getTask ~ title:', title)
    return this.createTask.getTask(title)
  }

  /**
   * Меняет текст заголовков
   */
  showTitle(title) {
    document.querySelector('title').textContent = title
    document.querySelector('.welcome').textContent = title
  }
}
