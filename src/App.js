import React, { useEffect, useState } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([])
  const [editingDev, setEdit] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [devs])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }

  async function handleEditDev(data) {
    const response = await api.put(`/devs/${editingDev._id}`, data)

    setDevs(devs.map(dev => (dev._id === response._id ? response : dev)))
    setEdit([])
  }

  async function handleDeleteDev(devId) {
    await api.delete(`/devs/${devId}`)

    setDevs(devs.filter(dev => dev._id !== devId))
  }

  async function toggleForm(devId) {
    setEdit(devId)
  }

  return (
    <div id="app">
      <aside>
        {editingDev.length === 0 ? (
          <>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} />
          </>
        ) : (
          <>
            <strong>Editar {editingDev.name}</strong>
            <DevForm onSubmit={handleEditDev} editing={editingDev} />
          </>
        )}
      </aside>

      <main>
        <ul>
          {devs &&
            devs.map(dev => (
              <DevItem
                key={dev._id}
                dev={dev}
                deleteDev={handleDeleteDev}
                editDev={toggleForm}
              />
            ))}
        </ul>
      </main>
    </div>
  )
}

export default App
