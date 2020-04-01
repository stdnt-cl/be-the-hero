import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
   function handleRegister(event) {
      event.preventDefault();
      
   }

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
               <input placeholder="Nome da ONG" />
               <input type="email" placeholder="E-mail" />
               <input placeholder="WhatsApp" />

               <div className="city-uf-input-group">
                  <input placeholder="Cidade" />
                  <input placeholder="UF" style={{ width: 80 }} />
               </div>
            
               <button className="button" type="submit">Cadastrar</button>
            </form>
         </div>
      </div>
   )
}