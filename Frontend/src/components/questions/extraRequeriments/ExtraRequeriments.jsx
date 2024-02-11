import React, { useState } from 'react'
import style from "./ExtraRequeriments.module.css"

export const ExtraRequeriments = ({ quote, setQuote, question, setQuestion }) => {

  const [requeriment, setRequeriment] = useState('')

  const handleChange = (event) => {
    setRequeriment(event.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setRequeriment(e.target.value)
    setQuote({
      ...quote,
      'extraRequeriments': e.target.value
    })
    setQuestion(question + 1)
  }

  return (
    <div className={style.containerExtraRequeriments}>
      <div className={style.titleCuestion}>
        <h3>¿Tu página tiene algun requisito no contemplado dentro de nuestra ruta de preguntas?</h3>
      </div>
      <div className={style.ExtraRequerimentsContainer}>
        <div className={style.ExtraRequerimentsOpcionOne}>
          <button
            className={style.button}
            value="no"
            onClick={handleClick}
          >No</button>
        </div>
        <div className={style.ExtraRequerimentsTwo}>
          <textarea
          placeholder='Especifique los requisitos aqui'
            value={requeriment}
            type='text'
            onChange={handleChange}
            className={style.ExtraRequerimentsTextArea}
          ></textarea>
          <button
            className={style.ExtraRequerimentsUpload}
            onClick={handleClick}
          >Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
