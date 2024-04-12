import UiTopTasks from './UiTopTasks'
import Task from '../Task/Task'
import styles from './TopTasks.module.css'
import data from '../data'

/**
 * список задач
 */
export default class TopTasks {
  allTask = []

  constructor() {
    this.ui = new UiTopTasks()
  }

  init() {
    this.showTitle()
    this.addUI()
    this.addContentElements()
    this.addListeners()

    this.getTasks()
  }

  /**
   * Получает фейковые задачи
   */
  async getTasks() {
    const tasks = await data()
    tasks.forEach((task) => this.allTask.push(new Task(task.title)))
    this.renderTasks(tasks)
  }

  /**
   * Отображает элементы приложения на странице
   */
  addUI() {
    const body = document.body
    const appElement = this.ui.getElement(styles.app)
    const container = this.ui.getElement(styles.container)

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
   * Ищем и присваиваем элементы
   */
  addContentElements() {
    this.field = this.sectionField.querySelector('input')
    this.pinnedContent = this.sectionPinned.querySelector('[class^="content"]')
    this.allTasksContent = this.sectionAllTasks.querySelector('[class^="content"]')

    this.renderTasks()
  }

  /**
   * Добавляем обработчики событий
   */
  addListeners() {
    this.field.addEventListener('input', this.onInputField)
    this.field.addEventListener('keypress', this.onEnterField)
    this.allTasksContent.addEventListener('click', this.onClickAllTask)
    this.pinnedContent.addEventListener('click', this.onClickPinned)
  }

  /**
   * Сохраняет содержимое поля ввода в this.fieldValue
   * @param {Event} evt изменение поля ввода
   */
  onInputField = (evt) => {
    this.fieldValue = evt.target.value
  }

  /**
   * По нажатию Enter создает новую задачу с контентом из this.fieldValue
   * Очищает поле ввода и this.fieldValue
   * @param {Event} evt изменение поля ввода
   */
  onEnterField = (evt) => {
    if (evt.key === 'Enter') {
      this.fieldValue ? this.addTask() : this.showErrorEmpty()
    }
  }

  /**
   * Клик по кнопке pin задачи делает ее закрепленной
   * задача перемещается в секцию Pinned
   * @param {Event} evt клик внутри секции All Tasks
   */
  onClickAllTask = (evt) => {
    const taskEl = evt.target.closest('[class^="task"]')
    if (taskEl) {
      const task = this.allTask.find((task) => task.id === taskEl.dataset.id)
      task.pinned = true

      this.renderTasks()
    }
  }

  /**
   * Клик по кнопке unpin задачи делает ее незакрепленной
   * задача перемещается в секцию All Tasks
   * @param {Event} evt клик внутри секции Pinned
   */
  onClickPinned = (evt) => {
    const taskEl = evt.target.closest('[class^="task"]')
    if (taskEl) {
      const task = this.allTask.find((task) => task.id === taskEl.dataset.id)
      task.pinned = false

      this.renderTasks()
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

  /**
   * Добавляет задачу в массив this.allTasks
   */
  addTask() {
    this.allTask.push(new Task(this.fieldValue))

    this.clearField()
    this.renderTasks()
  }

  /**
   * Отображает на странице данные из массива задач this.allTasks
   */
  renderTasks() {
    this.cleanTasksContent()
    const { pinned, unPinned } = this.getSortedTask()

    pinned.length ? this.showPinnedTasks(pinned) : this.showNoPinned()
    unPinned.length ? this.showUnPinnedTasks(unPinned) : this.showNoTasks()
  }

  /**
   * @returns объект {pinned, unPinned} отсортированных по полю pinned задач
   */
  getSortedTask() {
    return this.allTask.reduce(
      (acc, task) => {
        const key = task.pinned ? 'pinned' : 'unPinned'
        acc[key].push(task)
        return acc
      },
      { pinned: [], unPinned: [] }
    )
  }

  /**
   * Очищает контент контейнеров задач
   */
  cleanTasksContent() {
    this.pinnedContent.innerHTML = ''
    this.allTasksContent.innerHTML = ''
  }

  /**
   * Добавляет на страницу закрепленные задачи
   * @param {Array} tasks массив задач
   */
  showPinnedTasks(tasks) {
    this.pinnedContent.append(...this.ui.getTasks(tasks))
  }

  /**
   * добавляет на страницу сообщение что нет закрепленных задач
   */
  showNoPinned() {
    this.pinnedContent.append(
      this.ui.getNoTasksElement(styles.noTasks, 'No pinned tasks')
    )
  }

  /**
   * Добавляет на страницу незакрепленные задачи
   * @param {Array} tasks массив задач
   */
  showUnPinnedTasks(tasks) {
    this.allTasksContent.append(...this.ui.getTasks(tasks))
  }

  /**
   * добавляет на страницу сообщение что нет задач
   */
  showNoTasks() {
    this.allTasksContent.append(this.ui.getNoTasksElement(styles.noTasks, 'No tasks'))
  }

  /**
   * Отображает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
