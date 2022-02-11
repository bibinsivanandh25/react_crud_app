import Axios from '../Axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  let [state, setState] = useState([])
  let [loading, setLoading] = useState(false)
  let [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    let fetchData = async () => {
      let payload = await Axios.get('/posts')
      setState(payload.data)
    }
    fetchData()
  }, [state])

  let mapData = state
    .filter(val => {
      if (searchTerm === '') {
        return val
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    })
    .map(x => {
      return (
        <Fragment key={x.id}>
          <tr>
            <td>{x.id}</td>
            <td>{x.title}</td>
            <td>{x.author}</td>
            <td className="btn-group w-100">
              <div className="btn-group w-100">
                <Link
                  className="btn btn-outline-primary"
                  to={`/edit-post/${x.id}`}
                >
                  edit
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to={`/delete-post/${x.id}`}
                >
                  delete
                </Link>
              </div>
            </td>
          </tr>
        </Fragment>
      )
    })
  return (
    <div>
      {loading ? (
        'loading....'
      ) : (
        <Fragment>
          <div className="container my-4 bg-lite">
            <input
              type="search"
              name="searchTerm"
              placeholder="search..."
              className="form-control"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="container my-4 bg-light p-4">
            <table className="table table-bordered table-hover table-light">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <td>TITLE</td>
                  <td>AUTHOR</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{mapData}</tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Home
