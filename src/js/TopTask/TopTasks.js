import UiTopTasks from './UiTopTasks'
import Wrapper from '../Wrapper/Wrapper'
import styles from './TopTasks.module.css'

/**
 * список задач
 */
export default class TopTasks {
  allTask = []
  pinnedTask = []

  constructor() {
    this.ui = new UiTopTasks()
    this.wrapper = new Wrapper()
    this.container = this.ui.createElement(styles.container)
  }

  init() {
    this.showTitle()
    this.renderUI()
  }

  renderUI() {
    const body = document.body
    const appElement = this.ui.createElement(styles.app)

    this.sectionField = this.ui.getField()
    this.sectionPinned = this.ui.getPinned()
    this.sectionAllTasks = this.ui.getAllTasks()

    appElement.append(this.sectionField)
    appElement.append(this.sectionPinned)
    appElement.append(this.sectionAllTasks)

    this.container.append(this.wrapper.getWrapper(appElement))
    body.append(this.container)
  }

  /**
   * Показывает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
