import { createElement } from '../utility'
import styles from './Wrapper.module.css'

/**
 * Декоратор
 * @class
 */
export default class Wrapper {
  constructor() {
    this.createElement = createElement
  }

  /**
   * @returns элемент обертку
   */
  createWrapper() {
    return this.createElement(styles.wrapper)
  }

  /**
   * Декорирует элемент
   * @param {Element} item элемент для декорации
   * @returns декорированный элемент
   */
  getWrapper(item) {
    const wrapper = this.createWrapper()
    wrapper.append(item)

    return wrapper
  }
}
