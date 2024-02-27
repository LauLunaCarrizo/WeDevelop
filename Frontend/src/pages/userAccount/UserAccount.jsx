import { useAuth0 } from "@auth0/auth0-react"
import style from "./UserAccount.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userProvider from "../../utils/provider/userProvider/userProvider";
import { useTranslation } from "react-i18next";
import { clearLocalStorage } from "../../helpers/local";
import { useSelector } from "react-redux";


export const UserAccount = ({ menuIsActive }) => {
  const data = useSelector(state => state.userData)
  const [t, i18n] = useTranslation("global");
  const { user, logout } = useAuth0()
  const [userBD, setUserBD] = useState({})
  let fecha = data.createdAt.split("")
  let res = fecha.slice(0, 10) 

  const handleLogut = () => {
    logout()
    clearLocalStorage()
  }

  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    const userext = await userProvider.getUserByEmail(user.email);
    setUserBD(userext)
  }

  return (
    <div className={style.infoContainer} style={menuIsActive ? { left: '-20%' } : { left: '0%' }}>
      <div className={style.imgAndNameContainer}>
        <img src={data?.image}></img>
        <h2>{data?.name}</h2>
        <p>{user?.email}</p>
      </div>
      <div className={style.planAndMembershipContainer}>
        <label >{t("Role")}</label>
        <p>{userBD.role}</p>
        <label >{t("UserAccount.creationDate")}</label>
        <p> { res }</p>
      </div>
      <div className={style.buttonsContainer}>
        <button onClick={handleLogut}>{t("UserAccount.SignOut")}</button>
        <div>
        {
  userBD && userBD.role === 'admin' ? (
    <Link to={'/admin'}>
      <button>{t("UserAccount.adminPanel")}</button>
    </Link>
  ) : null
}
        </div>
      </div>
    </div>
  )
}