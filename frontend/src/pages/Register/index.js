import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { filteringValidationArray, getCurrentValidationMessage} from '../../utils/validationUtils';

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

			setMessage(error.response.data.message);
		}
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
						children={
							!!validationErrors && (filteringValidationArray('name', validationErrors) === 'name') ?
							getCurrentValidationMessage('name', message, validationErrors) : ''
						}
					/>

					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={
							!!validationErrors && (filteringValidationArray('email', validationErrors) === 'email') ?
							getCurrentValidationMessage('email', message, validationErrors) : ''
						}
					/>

					<input
						placeholder="WhatsApp"
						value={whatsapp}
						onChange={event => setWhatsapp(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={
							!!validationErrors && (filteringValidationArray('whatsapp', validationErrors) === 'whatsapp') ?
							getCurrentValidationMessage('whatsapp', message, validationErrors) : ''
						}
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
					</div>
					<div className='city-uf-validation-errors'>
						<p
							className='validation-errors'
							children={
								!!validationErrors && (filteringValidationArray('city', validationErrors) === 'city') ?
								getCurrentValidationMessage('city', message, validationErrors) : ''
							}
						/>

						<p
							className='validation-errors uf-validation-message'
							children={
								!!validationErrors && (filteringValidationArray('uf', validationErrors) === 'uf') ?
								getCurrentValidationMessage('uf', message, validationErrors) : ''
							}
						/>
					</div>
               <button className="button" type="submit">Cadastrar</button>
            </form>
         </div>
      </div>
   )
}
