import { createElement } from '../utility'
import styles from './Wrapper.module.css'

export default class Wrapper {
  constructor() {
    this.createElement = createElement
  }

  createWrapper() {
    return this.createElement(styles.wrapper)
  }

  getWrapper(item) {
    const wrapper = this.createWrapper()
    wrapper.append(item)

    return wrapper
  }
}
