import { createElement } from '../utility'
import Wrapper from '../Wrapper/Wrapper'
import styles from './UiTopTasks.module.css'

/**
 * Создает элементы для интерфейса списка задач
 */
export default class UiTopTasks {
  _field = { className: 'field', type: 'input' }
  _pinned = { className: 'pinned', type: 'h2', textContent: 'Pinned:' }
  _allTasks = { className: 'allTasks', type: 'h2', textContent: 'All Tasks:' }

  constructor() {
    this.createElement = createElement
    this.wrapper = new Wrapper()
  }

  /**
   * Создает секцию
   * @param {Object} param0 описание элемента
   * @returns элемент
   */
  createSection({ className, type, textContent }) {
    const section = this.createElement([styles.section, this.getClassName(className)])
    const content = this.createElement(styles.content)
    const child = this.createElement([className, styles.child], type)
    textContent && (child.textContent = textContent)

    section.append(child)
    type !== 'input' && section.append(this.wrapper.getWrapper(content))

    return section
  }

  /**
   * Делает первую буквы имени класса заглавной
   * @param {string} className имя класса
   * @returns имя класса с заглавной буквы
   */
  getClassName(className) {
    const newName = [...className].reduce((acc, char, index) => {
      if (index === 0) return acc + char.toUpperCase()
      return acc + char
    }, '')

    return styles[`section${newName}`]
  }

  getField() {
    return this.createSection(this._field)
  }

  getPinned() {
    return this.createSection(this._pinned)
  }

  getAllTasks() {
    return this.createSection(this._allTasks)
  }

  /**
   * Меняет текст заголовков
   */
  showTitle(title) {
    document.querySelector('title').textContent = title
    document.querySelector('.welcome').textContent = title
  }
}
