let data = [
  {
    id: 1,
    isEdit: false,
    checked: false,
    fullName: 'Nguyễn Văn Nam',
    gender: 'male',
    age: 12
  },
  {
    id: 3,
    isEdit: true,
    checked: true,
    fullName: 'Phạm Văn Minh',
    gender: 'male',
    age: 16
  },
  {
    id: 2,
    isEdit: false,
    checked: true,
    fullName: 'Nguyễn Thị Vân',
    gender: 'female',
    age: 16
  },
]

const createReadOnlyTr = item => {
  const gender = item.gender === 'male' ? 'Nam' : 'Nữ'

  const html = `
    <tr>
      <td>
        <div class="form-check">
          <input onclick="toggleTickRow(${item.id})" class="form-check-input" ${item.checked ? 'checked' : ''} type="checkbox" value="">
        </div>
      </td>
      <td>${item.id}</td>
      <td>${item.fullName}</td>
      <td>${gender}</td>
      <td>${item.age}</td>
      <td>
        <button class="btn btn-info btn-sm" onclick="setEditMode(${item.id}, true)">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
      </td>
    </tr>
  `

  return html
}

const createEditingTr = item => {
  const gender = item.gender === 'male' ? 'Nam' : 'Nữ'

  const html = `
    <tr class="is-edit">
      <td>
        <div class="form-check">
          <input onclick="toggleTickRow(${item.id})" class="form-check-input" ${item.checked ? 'checked' : ''} type="checkbox" value="">
        </div>
      </td>

      <td>
        <input class="form-control" value="${item.id}" disabled />
      </td>

      <td>
        <input class="form-control" value="${item.fullName}" />
      </td>

      <td>
        <select class="form-select" aria-label="Chọn giới tính">
          <option ${item.gender === 'male' ? 'selected' : ''} value="male">Nam</option>
          <option ${item.gender === 'female' ? 'selected' : ''} value="female">Nữ</option>
        </select>
      </td>

      <td>${item.age}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="saveRow(event, ${item.id})">Save</button>
        <button class="btn btn-warning btn-sm" onclick="setEditMode(${item.id}, false)">Cancel</button>
      </td>
    </tr>
  `

  return html
}

const render = () => {
  const table = document.getElementById('table-body')
  let html = ''

  data.forEach(item => {
    html += item.isEdit ? createEditingTr(item) : createReadOnlyTr(item)
  })

  table.innerHTML = html
}

const toggleTickRow = id => {
  const item = data.find(row => row.id === id)
  item.checked = !item.checked

  let countCheckedItems = 0
  data.forEach(row => {
    if (row.checked) {
      countCheckedItems++
    }
  })

  const isCheckAll = countCheckedItems === data.length
  const inputCheckAll = document.getElementById('check-all-btn')
  inputCheckAll.checked = isCheckAll
}

const setEditMode = (id, isEdit) => {
  const item = data.find(row => row.id === id)
  item.isEdit = isEdit
  render()
}

const deleteItem = id => {
  data = data.filter(item => item.id !== id)
  render()
}

const saveRow = (event, id) => {
  const item = data.find(row => row.id === id)

  const tr = event.target.closest('tr')
  const inputFullName = tr.querySelector('td:nth-child(3) input')
  const inputGender = tr.querySelector('td:nth-child(4) select')

  item.fullName = inputFullName.value
  item.gender = inputGender.value
  item.isEdit = false

  render()
}

const generateId = () => {
  let max = 0

  data.forEach(item => {
    if (item.id > max) {
      max = item.id
    }
  })

  return max + 1
}

const addNewRecord = () => {
  const item = {
    id: generateId(),
    isEdit: false,
    checked: false,
    fullName: '',
    gender: 'male',
    age: 0
  }

  data.push(item)
  render()
}

const deleteManyItems = () => {
  data = data.filter(item => !item.checked)
  render()
}

const toogleTickAll = (event) => {
  const isChecked = event.target.checked

  data.forEach(item => item.checked = isChecked)
  render()
}

render()
