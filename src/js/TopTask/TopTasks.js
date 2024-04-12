import UiTopTasks from './UiTopTasks'
import Task from '../Task/Task'
import styles from './TopTasks.module.css'
import data from '../data'

/**
 * список задач
 */
export default class TopTasks {
  allTasks = []

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
    tasks.forEach((task) => this.allTasks.push(new Task(task.title)))
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

    if (this.filterTimer) clearTimeout(this.filterTimer)
    this.filterTimer = setTimeout(() => this.renderTasks(), 300)
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
    const target = evt.target
    const buttonType = this.getButtonType(target)
    buttonType && this.buttonsCLickHandler(buttonType, this.getTaskElement(target))
  }

  /**
   * Клик по кнопке unpin задачи делает ее незакрепленной
   * задача перемещается в секцию All Tasks
   * @param {Event} evt клик внутри секции Pinned
   */
  onClickPinned = (evt) => {
    const target = evt.target
    const buttonType = this.getButtonType(target)
    buttonType && this.buttonsCLickHandler(buttonType, this.getTaskElement(target))
  }

  /**
   * Обработчик клика по кнопке в зависимости от ее типа
   * @param {string} type тип кликнутой кнопки
   * @param {Element} taskEl элемент задача
   */
  buttonsCLickHandler(type, taskEl) {
    type === 'pin' && this.togglePinned('id', taskEl.dataset.id)
    type === 'del' && this.deleteTask('id', taskEl.dataset.id)

    this.renderTasks()
  }

  /**
   * Определяет тип кликнутой кнопки
   * @param {Event.target} target элемент цель клика
   * @returns тип кнопки | undefined
   */
  getButtonType(target) {
    const value = target.classList.value
    if (value.includes('buttonPin')) return 'pin'
    if (value.includes('buttonDel')) return 'del'
  }

  /**
   * Ищет задачу по кнопке которой кликнули
   * @param {Event.target} target объект цель события
   * @returns родителя задачу
   */
  getTaskElement(target) {
    return target.closest('[class^="task"]')
  }

  /**
   * Ищет в массиве задач совпадающую по переданному значению,
   * переключает поле pinned на противоположное
   * @param {string} key название ключа по которому ищем
   * @param {string} value нужное значение
   */
  togglePinned(key, value) {
    const task = this.allTasks.find((task) => task[key] === value)
    task.pinned = !task.pinned
  }

  /**
   * Удаляет задачу соответствующую фильтру
   * @param {string} key название ключа по которому ищем
   * @param {string} value нужное значение
   */
  deleteTask(key, value) {
    this.allTasks = this.allTasks.filter((task) => task[key] !== value)
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
    this.allTasks.push(new Task(this.fieldValue))

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
    return this.allTasks.reduce(
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
    const filteredTasks = this.getFilteredTasks(tasks)

    filteredTasks.length
      ? this.allTasksContent.append(...this.ui.getTasks(filteredTasks))
      : this.showNoTasks(' found')
  }

  /**
   * Фильтрует задачи по значению поля ввода
   * @param {Array} tasks массив задач
   * @returns массив задач отфильтрованных по значению поля ввода
   */
  getFilteredTasks(tasks) {
    const filteredTasks = this.fieldValue
      ? tasks.filter((task) => task.title.startsWith(this.fieldValue))
      : tasks

    return filteredTasks
  }

  /**
   * добавляет на страницу сообщение что нет задач
   */
  showNoTasks(text) {
    const addedText = text ? text : ''
    this.allTasksContent.append(
      this.ui.getNoTasksElement(styles.noTasks, `No tasks${addedText}`)
    )
  }

  /**
   * Отображает заголовки на странице
   */
  showTitle() {
    this.ui.showTitle('Top Tasks')
  }
}
