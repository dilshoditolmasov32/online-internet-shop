import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ArrowDownBlue from "../../assets/img/arrowDownBlue.svg";
import filter from "../../assets/img/filter.svg";
import close from "../../assets/img/close.svg";
import CategDropdown from "../categories/CategoryDropdown";

export default function ProdsMainAdapt({
  categs = [],
  filters = {},
  activeStatus,
  setActiveStatus,
  handleChange = () => {},
  setFilters,
}) {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [filt, setFilt] = useState(false);
  const [text, setText] = useState(t("all"));
  const handleStatusChange = (newStatus, label) => {
    setIsOpen(false);
    setText(label);
    setActiveStatus(newStatus);

    handleChange({
      target: {
        name: "offer_type",
        value: newStatus === "all" ? "" : newStatus,
      },
    });
  };
  useEffect(() => {
    setText(t("all"));
  }, [t("all")]);

  const handleClick = () => {
    setFilters({
      subcategory: "",
      min_price: "",
      max_price: "",
      search: "",
      page: 1,
    });
    setActiveStatus("all");
    setText("Barchasi");
  };

  return (
    <>
      <div className="container">
        <div className="pradapt">
          <button className="pradapt-btn" onClick={() => setFilt(true)}>
            <img src={filter} alt="filter icon" />
            <p className="pradapt-btn__text">{t("filters")}</p>
          </button>

          <div className="pradapt-all">
            <button className="pradapt-btn" onClick={() => setIsOpen(!isOpen)}>
              <p className="pradapt-btn__text">{text}</p>
              <img src={ArrowDownBlue} alt="arrow icon" />
            </button>

            {isOpen && (
              <div className="pradapt-all__content">
                <p
                  className="pradapt-all__content-text"
                  onClick={() => handleStatusChange("all", t("all"))}
                >
                  {t("all")}
                </p>
                <p
                  className="pradapt-all__content-text"
                  onClick={() =>
                    handleStatusChange("mahsus_taklif", t("specialOffer"))
                  }
                >
                  {t("specialOffer")}
                </p>
                <p
                  className="pradapt-all__content-text"
                  onClick={() => handleStatusChange("yangilik", t("newProd"))}
                >
                  {t("newProd")}
                </p>
              </div>
            )}
          </div>
        </div>
        <button className="clear-btn" onClick={handleClick}>
          {t("clear")}
        </button>

        {filt && (
          <div className="container">
            <div className="filter">
              <div className="filter__wrap">
                <div className="filter__name">
                  <p className="filter__name-text">{t("filters")}</p>
                  <img
                    onClick={() => setFilt(false)}
                    src={close}
                    alt="close icon"
                  />
                </div>

                <div className="filter__top">
                  <p className="filter__title">{t("categories")}</p>
                  <CategDropdown />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
