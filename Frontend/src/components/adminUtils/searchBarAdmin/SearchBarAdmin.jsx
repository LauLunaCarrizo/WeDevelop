import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SearchBarAdmin.module.css'
import validator from 'validator'
import userProvider from '../../../utils/provider/userProvider/userProvider';
import projectsProvider from '../../../utils/provider/projectsProvider/projectsProvider';


export default function SearchBarAdmin({ setItemsToEdit, itemsToEdit }) {
    const [name, setName] = useState('')

    const handleChange = (e) => {
        const { value } = e.target
        setName(value)
    }
    // const handleClick=()=>{

    // }
    const handleClick = () => {
        if (name === '') return window.alert('Debes ingresar un nombre')
        if (validator.isEmail(name)) getUsEmail(name)
        else {
            getProjectName(name)
        }
        setName('')
    }
    const getUs = async () => {
        const usersResponse = await userProvider.getUsers()
        setItemsToEdit(usersResponse)
    }
    const getProjets = async () => {
        const projectsResponse = await projectsProvider.getProjects()
        setItemsToEdit(projectsResponse.docs)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }
    const getProjectName = async (name) => {
        setItemsToEdit([])
        const projectsResponse = await projectsProvider.getProjectByName(name)
        if (projectsResponse.length === 0) return window.alert('No existen coincidencias con el nombre proporcionado')
        else setItemsToEdit(projectsResponse)
        console.log(projectsResponse);
    }
    const getUsEmail = async (email) => {
        setItemsToEdit([])
        // if (name === '') return window.alert('Debes ingresar un nombre')
        const usersResponse = await userProvider.getUserByEmail(email)
        if (usersResponse === null) {
            return window.alert('No existen coincidencias con el nombre proporcionado')
        }
        else setItemsToEdit([usersResponse])
    }
    return (
        <div className={style.searBar}>
            <div className={style.buttons1}>
                <button
                    onClick={getUs}
                >Usuarios</button>
                <button
                    onClick={getProjets}
                >Proyectos</button>
            </div>

            <div className={style.buttons2}>
                <NavLink to={'/createProject'}>
                    <button>Crear Proyecto</button>
                </NavLink>
                <NavLink to={'/createUser'}>
                    <button>Crear Usuario</button>
                </NavLink>
            </div>

            <div className={style.buttons3}>
                <label className={style.label}>Buscar :  </label>
                <input
                    className={style.input}
                    type="text"
                    name='search'
                    value={name}
                    placeholder='Ingrese email o proyecto'
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />

                <button className={style.button} onClick={() => { handleClick() }}
                >Buscar</button>
            </div>
        </div>
    )
}