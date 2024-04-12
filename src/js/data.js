const tasks = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const tasks = await response.json()
  return tasks
}

export const data = async () => {
  const data = await tasks()
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(data[i])
  }
  return arr
}

export default data
