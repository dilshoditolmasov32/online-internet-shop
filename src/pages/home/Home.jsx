import Slides from "../../components/slides/Slides.jsx"
import Categories from "../../components/categories/Categories.jsx"
import Products from "../../components/products/Products.jsx"
import { useTranslation } from 'react-i18next';
import useNews from "../../hooks/useNews.jsx";

export default function Home() {
    const { t, i18n } = useTranslation();
    const { news } = useNews()


    return (
        <>
            <Slides info={news} type='first' />
            <Categories />
            <Products title={t('allProds')} />
            <Slides info={news} type='second' />
            <Products title={t('specialOffer')} />
        </>

    )
}
