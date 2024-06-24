import { useState, useEffect } from "react"
import { getUserService } from "@/Services/userServices"
import '@/styles/dashboard.css'
const Dashboard = () => {
  const [userData, setUserData] = useState({})// vacío
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserService(token)
        if (response.status === 200) {
          setUserData(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Dashboard', error)
      }
    }
    fetchUserData()
  }, [token])

  return (
    <>
          <div className="container mt-5" style={{ paddingTop: "40px" }}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">DASHBOARD</h2>
              <div className="text-center mb-4">
                <h4 className="text-muted">Bienvenido(a) a tu perfil:</h4>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Nombre:</h5>
                      <p className="card-text">{userData?.first_name}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Apellidos:</h5>
                      <p className="card-text">{userData?.last_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Género:</h5>
                      <p className="card-text">{userData?.gender}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Email:</h5>
                      <p className="card-text">{userData?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Rol:</h5>
                      <p className="card-text">{userData?.role}</p>
                    </div>
                  </div>
                </div>
                {/* Aquí puedes agregar más tarjetas para mostrar otros datos del usuario si es necesario */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard