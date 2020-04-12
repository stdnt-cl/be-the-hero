import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { filteringValidationArray, getCurrentValidationMessage} from '../../utils/validationUtils';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ value, setValue ] = useState('');
	const [ validationErrors, setValidationErrors ] = useState('');
	const [ message, setMessage ] = useState('');

	const history = useHistory();

	const ongId = localStorage.getItem('ongId');

	async function handleNewIncident(event) {
		event.preventDefault();
		
		const data = {
			title,
			description,
			value
		}

		try {
			const response = await api.post('incidents', data, {
				headers: {
					authorization: ongId
				}
			})
			console.log(response.error)
			history.push('/profile')
		} catch(error) {
			alert('Erro no registro do caso, tente novamente')
			setValidationErrors(error.response.data);

			setMessage(error.response.data.message)
			console.log(error.response.data, '\n', error.response.data.validation.keys);
		}
	}
	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um herói para resolvê-lo</p>

					<Link className="link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />   
						Voltar para Home  
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input 
						placeholder="Título do caso"
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={
							!!validationErrors && (filteringValidationArray('title', validationErrors) === 'title') ?
							getCurrentValidationMessage('title', message, validationErrors) : ''
						}
					/>

					<textarea
						placeholder="Descrição"
						value={description}
						onChange={event => setDescription(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={
							!!validationErrors && (filteringValidationArray('description', validationErrors) === 'description') ?
							getCurrentValidationMessage('description', message, validationErrors) : ''
						}
					/>

					<input
						placeholder="Valor em reais"
						value={value}
						onChange={event => setValue(event.target.value)}
					/>
					<p
						className='validation-errors'
						children={
							!!validationErrors && (filteringValidationArray('value', validationErrors) === 'value') ?
							getCurrentValidationMessage('value', message, validationErrors) : ''
						}
					/>
				
					<button className="button" type="submit">Cadastrar</button>
				</form>
			</div>
		</div>
	)
}