const data = [
  {
    id: 1,
    isEdit: false,
    checked: false,
    fullName: 'Nguyễn Văn Nam',
    gender: 'male',
    age: 12
  },
  {
    id: 2,
    isEdit: false,
    checked: true,
    fullName: 'Nguyễn Thị Vân',
    gender: 'female',
    age: 16
  },
  {
    id: 3,
    isEdit: true,
    checked: true,
    fullName: 'Phạm Văn Minh',
    gender: 'male',
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
        <button class="btn btn-danger btn-sm">Delete</button>
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
          <input class="form-check-input" ${item.checked ? 'checked' : ''} type="checkbox" value="">
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
        <button class="btn btn-primary btn-sm">Save</button>
        <button class="btn btn-warning btn-sm"  onclick="setEditMode(${item.id}, false)">Cancel</button>
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
}

const setEditMode = (id, isEdit) => {
  const item = data.find(row => row.id === id)
  item.isEdit = isEdit
  render()
}

render()
