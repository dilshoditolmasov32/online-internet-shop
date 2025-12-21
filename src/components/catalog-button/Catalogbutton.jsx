import { useState, useRef, useEffect } from "react";
import "../../styles/scss/components/catalogButton.scss";
import {
  X,
  ChevronRight,
  ChevronDown,
  Star,
  Shirt,
  Palette,
  Smartphone,
  Tent,
  Headphones,
  Monitor,
  ShoppingBag,
  Footprints,
  ShoppingBasket,
  Sparkles,
  Heart,
  Menu,
} from "lucide-react";

const categories = [
  { id: "weekly", name: "Hafta tovarlari", icon: <Star className="w-5 h-5" />, subcategories: [] },
  { id: "winter", name: "Qishki kolleksiya", icon: <Shirt className="w-5 h-5" />, subcategories: [] },
  { id: "hobby", name: "Xobbi va ijod", icon: <Palette className="w-5 h-5" />, subcategories: [] },
  { id: "smartphones", name: "Smartfonlari", icon: <Smartphone className="w-5 h-5" />, subcategories: [] },
  {
    id: "tourism",
    name: "Turizm, baliq ovi va ovchilik",
    icon: <Tent className="w-5 h-5" />,
    subcategories: [
      {
        name: "Pallatkalar, tentlar va shatyorlar",
        items: ["Pallatkalar", "Tentlar va shatyorlar", "Aksessuarlar"],
      },
      // qolganlari oldingidek qoldirsa bo'ladi
    ],
  },
  { id: "electronics", name: "Elektronika", icon: <Headphones className="w-5 h-5" />, subcategories: [] },
  { id: "appliances", name: "Maishiy texnika", icon: <Monitor className="w-5 h-5" />, subcategories: [] },
  { id: "clothing", name: "Kiyim", icon: <ShoppingBag className="w-5 h-5" />, subcategories: [] },
  { id: "shoes", name: "Poyabzallar", icon: <Footprints className="w-5 h-5" />, subcategories: [] },
  { id: "accessories", name: "Aksessuarlar", icon: <ShoppingBasket className="w-5 h-5" />, subcategories: [] },
  { id: "beauty", name: "Go‘zallik va parvarish", icon: <Sparkles className="w-5 h-5" />, subcategories: [] },
  { id: "health", name: "Salomatlik", icon: <Heart className="w-5 h-5" />, subcategories: [] },
];

export default function CatalogMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tourism");
  const [openedMobileCategory, setOpenedMobileCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 480);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  const handleMobileCategoryClick = (id) => {
    setOpenedMobileCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="catalog-menu" ref={menuRef}>
      <button
        className={`catalog-btn ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="catalog-btn__icon">
          {isOpen ? <X /> : <Menu />}
        </span>
        <span className="catalog-btn__text">Katalog</span>
      </button>

      {isOpen && !isMobile && (
        <div className="catalog-menu__dropdown">
          <div className="catalog-menu__dropdown__container">
            <div className="catalog-menu__dropdown__sidebar">
              <div className="catalog-menu__dropdown__sidebar__content">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    onMouseEnter={() => setSelectedCategory(category.id)}
                    className={`catalog-menu__category ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                  >
                    <span className="catalog-menu__category__icon">
                      {category.icon}
                    </span>
                    <span className="catalog-menu__category__name">
                      {category.name}
                    </span>
                    <ChevronRight className="catalog-menu__category__chevron" />
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-menu__dropdown__content">
              {selectedCategoryData &&
              selectedCategoryData.subcategories.length > 0 ? (
                <div className="catalog-menu__panel">
                  <div className="catalog-menu__panel__header">
                    <h3>{selectedCategoryData.name}</h3>
                    <ChevronRight className="chevron-icon" />
                  </div>
                  <div className="catalog-menu__panel__grid">
                    {selectedCategoryData.subcategories.map((subcat, index) => (
                      <div key={index} className="catalog-menu__panel__column">
                        <h4>{subcat.name}</h4>
                        <ul>
                          {subcat.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a href="#">{item}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="catalog-menu__panel__empty">
                  <p>Podkategoriyalar tez orada qo'shiladi</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isOpen && isMobile && (
        <div className="catalog-menu__mobile">
          <div className="catalog-menu__mobile-header">
            <span className="catalog-menu__mobile-title">Katalog</span>
            <button
              className="catalog-menu__mobile-close"
              onClick={() => setIsOpen(false)}
            >
              <X  color="white"/>
            </button>
          </div>

          <ul className="catalog-menu__mobile-list">
            {categories.map((category) => {
              const isActive = openedMobileCategory === category.id;
              const hasSub = category.subcategories?.length > 0;

              return (
                <li
                  key={category.id}
                  className={`catalog-menu__mobile-item ${
                    isActive ? "active" : ""
                  }`}
                >
                  <button
                    className="catalog-menu__mobile-item-btn"
                    onClick={() =>
                      hasSub
                        ? handleMobileCategoryClick(category.id)
                        : setIsOpen(false)
                    }
                  >
                    <span className="catalog-menu__mobile-icon">
                      {category.icon}
                    </span>
                    <span className="catalog-menu__mobile-name">
                      {category.name}
                    </span>
                    <span className="catalog-menu__mobile-chevron">
                      {hasSub ? (
                        isActive ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )
                      ) : (
                        <ChevronRight />
                      )}
                    </span>
                  </button>

                  {hasSub && isActive && (
                    <div className="catalog-menu__mobile-sub">
                      {category.subcategories.map((subcat, idx) => (
                        <div
                          className="catalog-menu__mobile-sub-block"
                          key={idx}
                        >
                          <p className="catalog-menu__mobile-sub-title">
                            {subcat.name}
                          </p>
                          <ul className="catalog-menu__mobile-sub-list">
                            {subcat.items.map((item, i) => (
                              <li
                                key={i}
                                className="catalog-menu__mobile-sub-item"
                              >
                                <a href="#">{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
