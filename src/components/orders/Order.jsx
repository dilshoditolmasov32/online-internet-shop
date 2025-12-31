import React, { useState, useEffect } from 'react'
import arrow from '../img/arrowDown.svg'
import arrowUp from '../img/arrowUp.svg'

import accept from '../img/accept.svg'
import decline from '../img/declined.svg'
import inProcess from '../img/inProcess.svg'
import { useTranslation } from 'react-i18next'

export default function Order({ order, allOrders }) {
    const [statusText, setStatusText] = useState('')
    const [img, setImg] = useState(inProcess)
    const [isOpen, setIsOpen] = useState(false)
    const { t, i18n } = useTranslation()
    useEffect(() => {
        if (order.status == 'Yetkazib berildi') {
            setImg(accept)
            setStatusText(t("delivered"))

        } else if (order.status == 'Yetkazib berildi') {
            setImg(decline)
            setStatusText(t("canceled"))

        } else if (order.status == 'Jarayonda') {
            setImg(inProcess)
            setStatusText(t("inProcess"))
        }
    }, []);
    return (
        <div className='order' onClick={() => { setIsOpen(!isOpen) }}>

            <div className="order__top">
                <div className="order__status">
                    <img src={img} alt="" />
                    <h1 className='order__status-text'>{statusText}</h1>
                </div>
                <div className="order__wrap">
                    <div className="order__info">
                        <div className="order__info-element">
                            <p className='order__info-element__text'>{t("date")}</p>
                            <p className='order__info-element__title'>
                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                <span className='order__info-element__title-span'>
                                    {new Date(order.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </p>
                        </div>
                        <div className="order__info-element">
                            <p className='order__info-element__text'>{t("orderId")}</p>
                            <p className='order__info-element__title'>#{order.id}</p>
                        </div>
                        <div className="order__info-element">
                            <p className='order__info-element__text'>{t("odrerPrice")}</p>
                            <p className='order__info-element__title'>
                                {(order.total_price).toLocaleString()}  </p>
                        </div>
                    </div>
                    <div className="order__info-btn">
                        <img src={isOpen ? arrowUp : arrow} alt="" />
                    </div>
                </div>
            </div>

            {
                isOpen && (
                    <>

                        <div className="order__bottom">

                            {order.items.map((e, i) => (
                                <div key={i} className="order__bottom-prod">
                                    <div className="order__bottom-desc">
                                        <img className='order__bottom-desc__img' src={e.product.images[0].image} alt="" />
                                        <div className="order__bottom-desc__wrap">
                                            <h2 className="order__bottom-desc__title">{e.product.name}
                                                {e.product.discount > 0 ? (
                                                    <span>-{e.product.discount}%</span>
                                                ) : ('')}
                                            </h2>
                                            <p className="order__bottom-desc__text">{t("codeOfProd")}: {e.product.id}</p>
                                        </div>
                                    </div>
                                    <div className="order__bottom-price">
                                        <p className="order__bottom-price__title">{t("prodPrice")}</p>
                                        <p className="order__bottom-price__text">
                                            {Number(e.product.discount) > 0 ? (
                                                <span>{Number(e.product.price).toLocaleString()} {t("value")}</span>
                                            ) : ('')}
                                            {(e.product.price - (e.product.price * e.product.discount / 100)).toLocaleString()} {t("value")}
                                        </p>
                                    </div>
                                </div>

                            ))}


                        </div>
                        <div className="order__bottomadapt">
                            {order.items.map((e, i) => (
                                <div key={i} className="order__bottomadapt-prod">
                                    <img className='order__bottom-desc__img' src={e.product.images[0].image} alt="" />
                                    <div className="order__bottomadapt-desc">

                                        <div className="order__bottomadapt-desc__wrap">
                                            <h2 className="order__bottomadapt-desc__title">{e.product.name}
                                                {e.product.discount > 0 ? (
                                                    <span>-{e.product.discount}%</span>
                                                ) : ('')}
                                            </h2>
                                            <p className="order__bottomadapt-desc__text">{t("codeOfProd")}: {e.product.id}</p>
                                        </div>
                                        <div className="order__bottomadapt-price">
                                            <p className="order__bottomadapt-price__title">{t("prodPrice")}</p>
                                            <p className="order__bottomadapt-price__text">
                                                {Number(e.product.discount) > 0 ? (
                                                    <span>{Number(e.product.price).toLocaleString()} {t("value")}</span>
                                                ) : ('')}
                                                {(e.product.price - (e.product.price * e.product.discount / 100)).toLocaleString()} {t("value")}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>
                    </>

                )
            }

        </div >
    )
}
