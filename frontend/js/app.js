const API_URL = 'http://192.168.1.70:80'
const select = document.getElementById('parameterSelect')
const selec2 = document.getElementById('parameter2Select')
const result = document.getElementById('result')
const loading = document.getElementById('loading')

async function fetchMetadata() {
  try {
    const response = await fetch(`${API_URL}/`)
    const data = await response.json()

    // Sort the data by titlep before creating options
    data.vals.sort((a, b) => a.titlep.localeCompare(b.titlep))

    data.vals.forEach((item) => {
      const option = document.createElement('option')
      option.value = item.name
      option.textContent = item.titlep
      select.appendChild(option)
    })
  } catch (error) {
    console.error('Error fetching metadata:', error)
  }
}

async function fillControlWithData(param, control) {
  try {
    const response = await fetch(`${API_URL}/${param}`)
    const data = await response.json()

    data.vals.forEach((item) => {
      const option = document.createElement('option')
      option.value = item.id
      option.textContent = item.name
      control.appendChild(option)
    })
  } catch (error) {
    console.error('Error fetching parameter data:', error)
  }
}

async function fetchParameterData(param) {
  loading.classList.remove('hidden')
  result.innerHTML = ''

  try {
    const response = await fetch(`${API_URL}/${param}`)
    const data = await response.json()

    const table = document.createElement('table')

    // Create header
    if (data.vals.length > 0) {
      const thead = document.createElement('thead')
      const headerRow = document.createElement('tr')
      Object.keys(data.vals[0]).forEach((key) => {
        const th = document.createElement('th')
        th.textContent = key
        headerRow.appendChild(th)
      })
      thead.appendChild(headerRow)
      table.appendChild(thead)
    }

    // Create body
    const tbody = document.createElement('tbody')
    data.vals.forEach((item) => {
      const row = document.createElement('tr')
      Object.values(item).forEach((value) => {
        const td = document.createElement('td')
        td.textContent = value
        row.appendChild(td)
      })
      tbody.appendChild(row)
    })
    table.appendChild(tbody)

    result.appendChild(table)
  } catch (error) {
    result.innerHTML = 'Error loading data'
    console.error('Error fetching parameter data:', error)
  } finally {
    loading.classList.add('hidden')
  }
}

select.addEventListener('change', (e) => {
  if (e.target.value) {
    fetchParameterData(e.target.value)
    selec2.innerHTML = ''
    fillControlWithData(e.target.value, selec2)
  } else {
    result.innerHTML = ''
  }
})

// Initialize
fetchMetadata()
