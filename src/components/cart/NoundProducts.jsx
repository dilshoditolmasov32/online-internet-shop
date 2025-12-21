import bag from '../../assets/img/bag.svg'
import '../../styles/scss/components/noprods.scss'
import { useTranslation } from 'react-i18next'

export default function NoProds() {
    const {t, i18n} = useTranslation()
    return (
        <div className='no-product'>
            <img src={bag} alt="bag-image" />
            <div className="no-product__desc">
                <p className='no-product__title'>{t("emptyCart")}</p>
                <p className='no-product__text'>{t("emptyCartText")}</p>

            </div>
        </div>
    )
}
