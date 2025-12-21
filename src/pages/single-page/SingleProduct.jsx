import ProductIdSlider from "../../components/productSlider/ProductIdSlider.jsx";
import Nav from "../../components/media/Nav.jsx";
import Products from "../../components/products/Products.jsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useAddCartItem from "../../hooks/useAddCartItem.jsx";
import useAuthMe from "../../hooks/useAuthMe.jsx";

import box from "../../assets/img/box.svg";
import defaultImg from "../../assets/img/defaultImg.svg";
import shield from "../../assets/img/shield.svg";
import successIcon from "../../assets/img/toast.svg";
import wallet from "../../assets/img/wallet.svg";

import "../../styles/scss/components/prod.scss";
import { getProductId } from "../../api/product.service.js";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { addCartItem } = useAddCartItem();
  const { userMe, error: authError } = useAuthMe();

  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(defaultImg);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProductId(id);
        console.log(res.data.data);
        setProduct(res.data.data);

        if (res.data?.base_image?.large_image_url) {
          setCurrentImg(res.data.base_image.large_image_url);
        }
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки продукта");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleBuy = () => {
    toast(
      <div className="toast-message">
        <img src={successIcon} alt="success" />
        <span>Успешно отправлено на проверку</span>
      </div>,
      {
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        icon: false,
      }
    );
  };

  const handleAddToCart = async () => {
    if (authError) return navigate("/auth");

    try {
      await addCartItem({ product_id: product.id, amount: 1 });
      navigate("/basket");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Продукт не найден</p>;

  const navInfo = {
    title: product.name,
    total: product.in_stock ? 1 : 0,
    discount: 0,
  };

  return (
    <div className="product-page">
      <div className="container">
        <Nav status={false} info={navInfo} />

        <div className="productId-page">
          <div className="sliderId-component">
            <ProductIdSlider
              info={product.images || []}
              onSelect={(img) =>
                setCurrentImg(img.original_image_url || defaultImg)
              }
            />

            <div className="product-info">
              <div className="product-info__parameters">
                <p className="product-info__parameters-title">
                  {t("parameters")}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.short_description || "",
                  }}
                />
              </div>

              <div className="product-info__details">
                <p className="product-info__details-title">
                  {t("infoAbtProd")}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description || "",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="product-sidebar">
            <div className="purchase-box">
              <p className="purchase-box__price">{product.formatted_price}</p>

              <div className="purchase-box__buttons">
                <button onClick={handleAddToCart} disabled={!product.in_stock}>
                  {t("addToCart")}
                </button>

                <button
                  onClick={() => (userMe ? handleBuy() : navigate("/auth"))}
                  disabled={!product.in_stock}
                >
                  {t("buyBtn")}
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <img src={box} alt="box" />
                <p className="feature-item__text">{t("receivingWays")}</p>
              </div>
              <div className="feature-item">
                <img src={wallet} alt="wallet" />
                <p className="feature-item__text">{t("paymentWays")}</p>
              </div>
              <div className="feature-item">
                <img src={shield} alt="shield" />
                <p className="feature-item__text">{t("guarantee")}</p>
              </div>
            </div>
          </div>
        </div>

        <Products title={t("newProds")} />
      </div>
    </div>
  );
}
