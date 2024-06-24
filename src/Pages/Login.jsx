import { useForm } from 'react-hook-form'
import { loginUserService } from '@/Services/userServices'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/Hook/useAuthContext'
import '@/styles/form.css'
import logo from '@/assets/react.svg'

const Login = () => {

  const { register, handleSubmit, formState:{ errors } } = useForm();
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const onSubmit = async (data) =>  {
    //enviar mi formulario de signup
    try {
      const response = await loginUserService(data)
      if (response.status === 200){
        navigate('/')
        console.log('Usuario autenticado exitosamente')
        login(response.data.token)  // utilizar login del contexto y decodificar el token en el navegador
        //console.log(response.data.token)
      }
    }catch(error) {
      console.log('Ocurrio un error en Login', error)
    }
  }

  return (
    <div className="container" style={{paddingTop:"100px"}}>
    <main className='form-signin w-100 m-auto' >
      <form onSubmit={handleSubmit(onSubmit)}>
      <div class="container d-flex justify-content-center align-items-center vh-10">
        <img
          className='mb-4 logo-react'
          src={logo}
          alt=''
          width={72}
          height={57}
        />
        </div>
        <h1 className='h3 mb-3 fw-normal text-center'>Inicia sesión</h1>
        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            {...register('email')}
          />
           <p>{errors.email?.message}</p>
          <label htmlFor='floatingInput'>Correo</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            {...register('password')}
          />
           <p>{errors.password?.message}</p>
          <label htmlFor='floatingPassword'>Contraseña</label>
        </div>

        <button className='btn btn-primary w-100 py-2' type='submit'>
          Iniciar sesión
        </button>
        <p className='mt-5 mb-3 text-body-secondary'>© 2017–2024</p>
      </form>
    </main>
    </div>
  )
}

export default Login