import { useState, useEffect } from "react"
import { useAuthContext } from "@/Hook/useAuthContext"
import { getUserService } from "@/Services/userServices"
const Secret = () => {
  const { userPayload } = useAuthContext()
  const [userData, setUserData] = useState({})
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
            <h2 className="card-title text-center">SECRET</h2>
            <div className="text-center mb-4">
              <h4 className="text-muted">Bienvenido(a) a Secret 🤫</h4>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Saludos:</h5>
                    <p className="card-text">
                      {userPayload?.role === 'ADMIN' ? 'Hola Admin! 🎩' : 'Hola Customer! 🧢'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Nombre:</h5>
                    <p className="card-text">{`Bienvenido ✋ ${userData.first_name} ${userData.last_name}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rol:</h5>
                    <p className="card-text">
                      {userPayload?.role === 'ADMIN' ? 'Rol: Administrador' : 'Rol: Customer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
);
};

export default Secret;