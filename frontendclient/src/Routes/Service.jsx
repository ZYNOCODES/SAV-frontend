import React from 'react'
import './Styles/servicesstyle.css'
import locationicon from './assets/Images/locationicon.png'
import ServiceCard from '../Comp/ServiceCard'


export default function Service() {
  return (
    <div className='Service-page-content'>
        <h2>Service Apres Vente</h2>
        <p>Découvrez la liste des différents points SAV que Stream met à la disposition de ses Clients</p>
        <section className='cards'>
          <div className='section-title'>
            <h4>SAV International</h4> 
          </div>
          <div className='cards-section'>

            <ServiceCard title='Espagne' 
              location='C/Conrado del Campo, Nave 4, Pol. Ind. Trevenez, 29590, Malaga (Malaga)'
              number='+34 952 179 479'
            />
           
           <ServiceCard title='Portugal' 
              location='LetMeRepair Spain Sucursal Portugal Parque Industrial do Cotai Av. Salgueiro Maia n 1025 Armazem 5, Aboboda'
              number='+351 211 309 453'
            />

            <ServiceCard title='Italy' 
              location='inspeedy S.R.L via lodovico settala 3 20124 Milano (MI) - IT'
              number='+39 199 240 668'
            />
          
          </div>
        </section>
        <section className='cards'>
          <div className='section-title'>            
            <h4>SAV Local</h4>            
          </div>
          <div className='cards-section'>
            <ServiceCard title='Hamiz' 
                location='Lotissement Friri N 3, groupe C N 16 El Hamiz'
                number='+213 (0)560 98 57 76 / 023 86 77 32'
              />

            <ServiceCard title='Oran' 
                location='Hai EL AMIRE ABDELKADER N : 01- BIR EL Djir-Oran'
                number='+213 (0) 560 01 91 04'
              />

            <ServiceCard title='Tizi Ouzou' 
                location='Residence Iziri GB 17 BLV Krim Belkacem local N 133 ( en face CASNOS)'
                number='+213 (0) 560 98 57 85'
              />

            <ServiceCard title='Medea' 
                location='Cite Takebou 150 BT D Wilaya de Medea'
                number='+213 (0)560 50 83 07'
              />

            
         
          
          </div>           
        </section>       
    </div>
  )
}

