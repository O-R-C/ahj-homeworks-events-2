import UiTopTasks from './UiTopTasks'
import styles from './TopTasks.module.css'

/**
 * список задач
 */
export default class TopTasks {
  allTask = []
  pinnedTask = []

  constructor() {
    this.ui = new UiTopTasks()
    this.container = this.ui.createElement(styles.container)

    this.init()
  }

  init() {
    this.showTitle()
    this.renderUI()
  }

  renderUI() {
    this.fieldSection = this.ui.getField()
    const appElement = this.ui.createElement(styles.app)
    appElement.append(this.fieldSection)
    this.container.append(appElement)
    const body = document.body
    body.append(this.container)
  }

  /**
   * Показывает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
