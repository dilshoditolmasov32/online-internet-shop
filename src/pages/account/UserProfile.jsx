import { useState } from "react";
import OrdersHistory from "./ProfileHistory";
import ProfileInfo from "./ProfilInfo";
import ModalLogout from "../../components/modal/ModalLogout.jsx";
import "../../styles/scss/pages/account.scss";
import api from "../../api/axios.js";
import { t } from "i18next";
import arrowIcon from "../../assets/img/arrowIcon.svg";
import "../../styles/scss/pages/userProfile.scss";
import { NavLink } from "react-router";
import axios from "axios";

const TABS = {
  PROFILE: "profile",
  ORDERS: "orders",
};

export default function UserProfile({ onLogout }) {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [res, setRes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navInfo, setNavInfo] = useState({
    title: t("myPage"),
    nav: false,
    current: t("myPage"),
    newStatus: false,
  });

  const handleLogout = () => {
    setIsOpen(!isOpen);
  };

  const onCloseFunc = () => {
    setIsOpen(false);
  };


  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__breadcrumbs">
          <NavLink to="/">
            <button className="profile-page__back-btn">
              <img src={arrowIcon} alt="arrow icon" />
              Ortga
            </button>
          </NavLink>
          <NavLink to={"/"}>
            <span className="profile-page__crumb">Bosh sahifa</span>
          </NavLink>
          <span className="profile-page__crumb profile-page__crumb--current">
            Mening sahifam
          </span>
        </div>

        <h1 className="profile-page__title">Mening sahifam</h1>

        <div className="profile-page__layout">
          <aside className="profile-sidebar">
            <button
              className={
                "profile-sidebar__item" +
                (activeTab === TABS.PROFILE
                  ? " profile-sidebar__item--active"
                  : "")
              }
              onClick={() => setActiveTab(TABS.PROFILE)}
            >
              Mening sahifam
            </button>
            <button
              className={
                "profile-sidebar__item" +
                (activeTab === TABS.ORDERS
                  ? " profile-sidebar__item--active"
                  : "")
              }
              onClick={() => setActiveTab(TABS.ORDERS)}
            >
              Xaridlar tarixi
            </button>
            <button
              className="profile-sidebar__item profile-sidebar__item--logout"
              onClick={handleLogout}
            >
              Chiqish
            </button>
          </aside>
          {isOpen ? <ModalLogout  onCloseFunc={onCloseFunc}  /> : ""}

          <section className="profile-content">
            {activeTab === TABS.PROFILE ? <ProfileInfo /> : <OrdersHistory />}
          </section>
        </div>
      </div>
    </div>
  );
}

const mockOrders = [
  {
    id: "#356445848",
    status: "Yetkazib berildi",
    statusType: "success",
    date: "05.04.2023",
    time: "10:47",
    total: "5 600 000 so'm",
    items: [
      {
        id: "ID 564645851",
        title: "Shkafli parta",
        subtitle: "150x90 sm",
        price: "5 600 000 so'm",
        badge: null,
      },
      {
        id: "ID 564645853",
        title: "Shkafli parta 150x90 sm",
        subtitle: "",
        price: "5 600 000 so'm",
        badge: "-36%",
      },
    ],
  },
  {
    id: "#356445849",
    status: "Bekor qilindi",
    statusType: "danger",
    date: "05.04.2023",
    time: "10:47",
    total: "5 600 000 so'm",
    items: [],
  },
  {
    id: "#356445850",
    status: "Jarayonda",
    statusType: "warning",
    date: "05.04.2023",
    time: "10:47",
    total: "5 600 000 so'm",
    items: [],
  },
];
