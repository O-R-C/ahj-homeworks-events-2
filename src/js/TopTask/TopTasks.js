import UiTopTasks from './UiTopTasks'
import Task from '../Task/Task'
import styles from './TopTasks.module.css'

/**
 * список задач
 */
export default class TopTasks {
  allTask = []
  pinnedTask = []

  constructor() {
    this.ui = new UiTopTasks()
    this.task = new Task()
    this.wrapper = this.ui.wrapper
  }

  init() {
    this.showTitle()
    this.renderUI()
    this.addContentElements()
    this.addListeners()
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

  addContentElements() {
    this.field = this.sectionField.querySelector('input')
    this.pinnedContent = this.sectionPinned.querySelector('[class^="content"]')
    this.allTasksContent = this.sectionAllTasks.querySelector('[class^="content"]')

    this.showNoPinned()
  }

  addListeners() {
    this.field.addEventListener('input', this.fieldHandlerInput.bind(this))
    this.field.addEventListener('keypress', this.fieldHandlerEnter.bind(this))
  }

  /**
   * Сохраняет содержимое поля ввода в this.fieldValue
   * @param {Event} evt изменение поля ввода
   */
  fieldHandlerInput(evt) {
    this.fieldValue = evt.target.value
  }

  /**
   * По нажатию Enter создает новую задачу с контентом из this.fieldValue
   * Очищает поле ввода и this.fieldValue
   * @param {Event} evt изменение поля ввода
   */
  fieldHandlerEnter(evt) {
    if (evt.key === 'Enter') {
      this.fieldValue ? this.addTask() : this.showErrorEmpty()
    }
  }

  /**
   * Очищает поле ввода и this.fieldValue
   */
  clearField() {
    this.fieldValue = ''
    this.field.value = this.fieldValue
  }

  /**
   * При нажатии Enter и пустом поле ввода отображает подсказку на 1 секунду
   */
  showErrorEmpty() {
    this.field.placeholder = 'Нужно ввести задачу'
    setTimeout(() => (this.field.placeholder = ''), 1000)
  }

  showNoPinned() {
    this.pinnedContent.append(this.ui.getTask('No pinned tasks'))
  }

  addTask() {
    this.allTask.push(this.task.getTask(this.fieldValue))
    console.log(this.allTask)
    this.clearField()
  }

  /**
   * Отображает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
