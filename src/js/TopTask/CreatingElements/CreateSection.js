import CreateElement from './CreateElement'
import styles from './CreateSection.module.css'

/**
 * Создает секцию
 * @class
 */
export default class CreateSection extends CreateElement {
  /**
   * Возвращает секцию, созданную по описанию
   * @param {Object} item описание секции
   * @param {Object} wrapper обертка декоратор
   * @returns элемент секцию
   */
  getSection(item, wrapper = null) {
    return this.createSection(item, wrapper)
  }

  /**
   * Создает секцию
   * @param {Object} param0 описание элемента
   * @param {Object} wrapper обертка декоратор
   * @returns элемент
   */
  createSection({ className, type, textContent }, wrapper) {
    const section = this.getElement([styles.section, this.getSectionName(className)])
    const content = this.getElement(styles.content)
    const child = this.getElement([className, styles.child], type)
    textContent && (child.textContent = textContent)

    section.append(child)
    wrapper && section.append(wrapper.getWrapper(content))

    return section
  }

  /**
   * Создает персонализированное имя класса секции
   * @param {string} className имя класса
   * @returns имя класса для секции
   */
  getSectionName(className) {
    const sectionName = [...className].reduce((acc, char, index) => {
      if (index === 0) return acc + char.toUpperCase()
      return acc + char
    }, 'section')

    return styles[sectionName]
  }
}
