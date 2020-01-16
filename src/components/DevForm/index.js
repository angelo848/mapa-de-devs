import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit, editing }) {
  const [github_username, setGithubUsername] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [thumbUrl, setThumbUrl] = useState('')
  const [techs, setTechs] = useState('')

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      err => {
        console.log(err)
      },
      { timeout: 30000 }
    )
  }, [])

  useEffect(() => {
    if (editing) {
      const { name, bio, techs, avatar_url } = editing
      setName(name)
      setBio(bio)
      setTechs(techs.join(', '))
      setThumbUrl(avatar_url)
    }
  }, [editing])

  async function handleSubmit(e) {
    e.preventDefault()

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
      name,
      bio,
      thumbUrl
    })

    setName('')
    setBio('')
    setTechs('')
    setTechs('')
    setLatitude('')
    setLongitude('')
    setGithubUsername('')
    setTechs('')
  }

  return (
    <form onSubmit={handleSubmit}>
      {!editing && (
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>
      )}

      {editing && (
        <>
          <div className="input-block">
            <label htmlFor="techs">Nome completo</label>
            <input
              name="name"
              id="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Bio</label>
            <textarea
              rows="4"
              cols="50"
              name="bio"
              id="bio"
              required
              value={bio}
              onChange={e => setBio(e.target.value)}
            ></textarea>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Avatar</label>
            <input
              name="avatar_url"
              id="avatar_url"
              required
              value={thumbUrl}
              onChange={e => setThumbUrl(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm
