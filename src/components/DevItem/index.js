import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

export default function DevItem({ dev, deleteDev, editDev }) {
  async function handleDeleteDev() {
    await deleteDev(dev._id)
  }

  function handleEditDev() {
    editDev(dev)
  }

  return (
    <li className="dev-item">
      <button onClick={handleDeleteDev}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <header>
        <img src={dev.avatar_url} alt="Avatar usuário" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(',')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no github
      </a>
      <button onClick={handleEditDev}>Editar dev</button>
    </li>
  )
}
