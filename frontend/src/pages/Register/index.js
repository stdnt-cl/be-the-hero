import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
   const [ name, setName ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ whatsapp, setWhatsapp ] = useState('');
   const [ city, setCity ] = useState('');
	const [ uf, setUf ] = useState('');
	const [ validationErrors, setValidationErrors ] = useState('');
	const [ message, setMessage ] = useState('');

   const history = useHistory();
   
   async function handleRegister(event) {
      event.preventDefault();
      
      const data = {
         name,
         email,
         whatsapp,
         city,
         uf
      };

      try {
         const response = await api.post('ongs', data);

         alert(`Seu ID de acesso: ${response.data.id}, copie e cole essa hash para logar!`);
         history.push('/');
      } catch (error) {
         alert(`Erro no cadastro, tente novamente`);
			setValidationErrors(error.response.data);

			console.log(validationErrors, '\n', error.response.data.validation.keys);
			setMessage(error.response.data.message);
		}
	}

	function filtering(fieldName) {
		return validationErrors.validation.keys.filter(field => field === fieldName);
	}

	function getCurrentMessage(fieldName) {
		const messageArray = message.split('. ');
		const currentIndex = validationErrors.validation.keys.indexOf(fieldName);

		return messageArray[currentIndex];
	}



//joi is only returning one error, need to set it to return more, check here: https://stackoverflow.com/questions/25953973/joi-validation-return-only-one-error-message

   return (
      <div className="register-container">
         <div className="content">
            <section>
               <img src={logoImg} alt="Be The Hero" />

               <h1>Cadastro</h1>
               <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONGs</p>

               <Link className="link" to="/">
                  <FiArrowLeft size={16} color="#E02041" />   
                  Já tenho cadastro
               </Link>
            </section>

            <form onSubmit={handleRegister}>
					<input
						placeholder="Nome da ONG"
						value={name}
						onChange={event => setName(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={!!validationErrors && (filtering('name')[0] === 'name') ? getCurrentMessage('name') : '' }
					/>

					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={!!validationErrors && filtering('email')[0] === 'email' ? getCurrentMessage('email') : '' }
					/>

					<input
						placeholder="WhatsApp"
						value={whatsapp}
						onChange={event => setWhatsapp(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={!!validationErrors && filtering('whatsapp')[0] === 'whatsapp' ? getCurrentMessage('whatsapp') : '' }
					/>

					<div className="city-uf-input-group">
						<input
							placeholder="Cidade"
							value={city}
							onChange={event => setCity(event.target.value)}
						/>

						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={event => setUf(event.target.value)}
						/>
					<p
						className='validation-errors'
						children={!!validationErrors && filtering('uf')[0] === 'uf' ? getCurrentMessage('uf') : '' }
					/>
					</div>

					<p
						className='validation-errors'
						children={!!validationErrors && filtering('city')[0] === 'city' ? getCurrentMessage('city') : '' }
					/>
               <button className="button" type="submit">Cadastrar</button>
            </form>
         </div>
      </div>
   )
}
