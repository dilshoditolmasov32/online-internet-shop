import { useTranslation } from "react-i18next";
import Map from "../tools/Map";
import Form from "../form/Form";
import logo from "../../assets/img/logo.svg";
import qrCode from "../../assets/img/qr.svg";
import telephone from "../../assets/img/smallCallIcon.svg";
import appStore from "../../assets/img/appstore.svg";
import playMarket from "../../assets/img/pm.svg";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { AiFillYoutube } from "react-icons/ai";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <Form />
      <div className="footer__inner">
        <div className="container">
          <div className="footer__wrap">
            <div className="footer__l">
              <div className="footer__left">
                <div className="footer__titles-media">
                  <a 
                 data-aos="flip-down"
                    data-social="Instagram"
                    style={{ "--accent-color": "#FF0069" }}
                    href="https://www.instagram.com/"
                  >
                    <IoLogoInstagram />
                  </a>
                  <a 
                 data-aos="flip-down"
                    data-social="Facebook"
                    style={{ "--accent-color": "#0866FF" }}
                    href="https://www.facebook.com/profile.php?id=61566515812935"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>

                  <a
                  data-aos="flip-down"
                    data-social="Telegram"
                    style={{ "--accent-color": "#26A5E4" }}
                    href="https://t.me/@fromMrX"
                    target="_blank"
                  >
                    <FaTelegramPlane />
                  </a>
                  <a
                 data-aos="flip-down"
                    data-social="Youtube "
                    style={{ "--accent-color": "#FF0000" }}
                    href="https://www.youtube.com/watch?v=8JW3PvhUmb4&list=RD9Eg7iBWqEFg&index=3"
                    target="_blank"
                  >
                    <AiFillYoutube />
                  </a>
                </div>
                <div className="footer__btm" data-aos="flip-down">
                  <img
                    className="footer__btm-qr"
                    src={qrCode}
                    alt="qr icon"
                    width={245}
                    height={"auto"}
                  />
                </div>
              </div>
              <div className="contact-phone-data">
                <div className="contact-info" data-aos="fade-up">
                  <h3>Информация</h3>
                  <p>В магазин</p>
                  <p>Связаться с нами!</p>
                  <p>Возврат товара</p>
                  <p>Гарантия на товары</p>
                  <a href="tel:+998999999996" className="call-btn">
                    <img src={telephone} alt="phone icon" />
                    <span> +998 99 999 99 96</span>
                  </a>
                </div>
                <div className="phone-info" data-aos="fade-up"  >
                  <h3>Информация</h3>
                  <p>В магазин</p>
                  <p>Связаться с нами!</p>
                  <p>Возврат товара</p>
                  <p>Гарантия на товары</p>
                  <div className="play-store-market">
                    <a
                      href={"https://www.apple.com/app-store/"}
                      target="_blank"
                      className="appStore-btn"
                    >
                      <img
                        src={appStore}
                        alt="App Store"
                        className="app-icon"
                      />
                      <span>AppStore</span>
                    </a>
                    <a
                      href={"https://play.google.com/"}
                      target="_blank"
                      className="playMarket-btn"
                    >
                      <img
                        src={playMarket}
                        alt="play Market"
                        className="app-icon"
                      />
                      <span>Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__main-map" data-aos="fade-left">
              <Map />

              <div className="footer__main-map__desc">
                <p className="footer__main-map__desc-text">{t("makeRoute")}</p>
                <div className="footer__main-map__desc-nav">
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/zbBrP"
                  >
                    Google maps
                  </a>
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/5rq4u"
                  >
                    Yandex maps
                  </a>
                  <a
                    className="footer__main-map__desc-nav__link"
                    target="_blank"
                    href="https://shorturl.at/aha7U"
                  >
                    2gis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-wrap">
            <div className="footer__bottom-desc">
              <img src={logo} alt="logo-icon" />
              <p className="footer__bottom-desc__text">{t("footerBtm")}</p>
            </div>
            <p className="footer__bottom-text">© 2025 MILLIYBIZ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
