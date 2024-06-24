import { useForm } from 'react-hook-form'
import { registerUserService } from '@/Services/userServices'
import { useNavigate } from 'react-router-dom'
import '@/styles/form.css'
import logo from '@/assets/react.svg'


const Signup = () => {

  const { register, handleSubmit, formState:{ errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) =>  {
    //enviar mi formulario de signup
    try {
      const response = await registerUserService(data)
      if (response.status === 201){
        navigate('/login')
        console.log('Usuario creado exitosamente')
      }
    }catch(error) {
      console.log('Ocurrio un error en Signup', error)
    }
  }


  return (
    <div className="container" style={{paddingTop:"100px"}}>
    <main className='form-signin d-flex flex-column justify-content-center align-items-center'>
      <form className='w-100' onSubmit={handleSubmit(onSubmit)} >
        <div class="container d-flex justify-content-center align-items-center vh-10">
        <img className='mb-3 logo-react ' src={logo} alt='logo' width='72' height='57' />
        </div>
        <h1 className='h3 mb-3 fw-normal text-center '>Registrese</h1>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='first_name'
            name='first_name'
            placeholder='John'
            {...register('first_name')}
            required
          />          
          <label htmlFor='first_name'>Nombre</label>
          <p>{errors.first_name?.message}</p>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='last_name'
            name='last_name'
            placeholder='Doe'
            {...register('last_name')}
            required
          />
          <label htmlFor='last_name'>Apellidos</label>
          <p>{errors.last_name?.message}</p>
        </div>

        <div className='form-floating mb-3'>
          <select
            className='form-select'
            id='gender'
            name='gender'
            {...register('gender')}
            required
          >
            <p>{errors.gender?.message}</p>
            <option value=''>Elije...</option>
            <option value='M'>Masculino</option>
            <option value='F'>Femenino</option>
          </select>
          <label htmlFor='gender'>Genero</label>
          <p>{errors.gender?.message}</p>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='name@example.com'
            {...register('email')}
            required
          />
          <label htmlFor='email'>Correo electrónico</label>
          <p>{errors.email?.message}</p>
        </div>

        <div className='form-floating mb-3'> 
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            placeholder='Password'
            {...register('password')}
            required
          />
          <label htmlFor='password'>Contraseña</label>
          <p>{errors.password?.message}</p>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>Registrar</button>
        <p className='mt-5 mb-3 text-body-secondary'>© 2017–2024</p>
        </form>
    </main>
    </div>
  )
}

export default Signup