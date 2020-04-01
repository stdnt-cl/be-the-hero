import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

function Logon() {
   return (
      <div className="logon-container">
         <section className="form">
            <img src={logoImg} alt="Be The Hero" />
            
            <form>
               <h1>Faça seu logon</h1>
               
               <input placeholder="Sua ID" />
               <button class="button" type="submit">Entrar</button>
            
               <Link className="link" to="/register">
                  <FiLogIn size={16} color="#E02041" />   
                  Não tenho cadastro
               </Link>
            </form>
         </section>

         <img src={heroesImg} alt="Heroes" />
      </div>
   );
}

export default Logon;
