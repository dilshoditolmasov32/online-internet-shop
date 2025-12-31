import ProductIdSlider from "../../components/productSlider/ProductIdSlider.jsx";
import Nav from "../../components/media/Nav.jsx";
import Products from "../../components/products/Products.jsx";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


import box from "../../assets/img/box.svg";
import defaultImg from "../../assets/img/defaultImg.svg";
import shield from "../../assets/img/shield.svg";
import wallet from "../../assets/img/wallet.svg";

import { getProductId } from "../../service/product.service.js";
import { AuthContext } from "../../auth/context/AuthContext.jsx";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, openAuth } = useContext(AuthContext);


  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(defaultImg);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProductId(id);
        setProduct(res.data.data);

        if (res.data?.base_image?.large_image_url) {
          setCurrentImg(res.data.base_image.large_image_url);
        }
      } catch (err) {
        setError("Ошибка загрузки продукта");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleBuy = () => {
    toast.success("Muvaqqiyatli amalga oshirildi");
  };

  const handleAddToCart = () => {
    navigate("/basket")
  };

  if (loading) {
    return (
      <div className="product-page skeleton-page">
        <div className="container">
          <div className="skeleton-nav"></div>

          <div className="productId-page">
            <div className="sliderId-component">
              <div className="skeleton-slider"></div>

              <div className="product-info">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line text"></div>
                <div className="skeleton-line text"></div>
                <div className="skeleton-line text"></div>
              </div>
            </div>

            <div className="product-sidebar">
              <div className="skeleton-box"></div>
              <div className="skeleton-features"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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

                {user ? (
                  <button onClick={handleBuy} disabled={!product.in_stock}>
                    {t("buyBtn")}
                  </button>
                ) : (
                  <button onClick={openAuth} disabled={!product.in_stock}>
                    {t("buyBtn")}
                  </button>
                )}
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
