import UiTopTask from './UiTopTask'

/**
 * список задач
 */
export default class TopTask {
  allTask = []
  pinnedTask = []

  constructor() {
    this.ui = new UiTopTask()
    this.container = this.ui.createElement('container')

    this.init()
  }

  init() {
    this.fieldSection = this.ui.getField()
    this.container.append(this.fieldSection)

    this.showTitle()
  }

  /**
   * Показывает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Task')
  }
}
