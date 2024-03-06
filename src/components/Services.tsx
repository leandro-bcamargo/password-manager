import React from 'react';
import { FormData } from '../types/FormData';
import './Services.css';

export type ServicesProps = {
  services: FormData[];
  handleRemove: HandleRemove;
  hidePasswords: boolean;
};
export type HandleRemove = (e: React.MouseEvent<HTMLButtonElement>) => void;

export default function Services({ services, handleRemove, hidePasswords }:
ServicesProps) {
  return (
    <div className="services">
      {services.length === 0
        ? <p>Nenhuma senha cadastrada</p>
        : services.map((service, i) => {
          return (
            <div key={ i } className="service">
              <a href={ service.url }>{service.serviceName}</a>
              <p>{service.login}</p>
              <p>{hidePasswords ? '******' : service.password}</p>
              <button
                data-testid="remove-btn"
                onClick={ handleRemove }
                name={ service.serviceName }
              >
                Remover
              </button>
            </div>
          );
        })}
    </div>
  );
}
