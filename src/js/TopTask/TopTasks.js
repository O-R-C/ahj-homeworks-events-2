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
    this.wrapper = this.ui.wrapper
  }

  init() {
    this.showTitle()
    this.renderUI()
  }

  /**
   * Отображает элементы приложения на странице
   */
  renderUI() {
    const body = document.body
    const appElement = this.ui.createElement(styles.app)
    const container = this.ui.createElement(styles.container)

    this.sectionField = this.ui.getField()
    this.sectionPinned = this.ui.getPinned()
    this.sectionAllTasks = this.ui.getAllTasks()

    appElement.append(this.sectionField)
    appElement.append(this.sectionPinned)
    appElement.append(this.sectionAllTasks)

    container.append(this.ui.wrapper.getWrapper(appElement))
    body.append(container)
  }

  /**
   * Отображает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
