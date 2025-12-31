import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import checkIcon from "../../assets/img/check.svg";
import cancelIcon from "../../assets/img/orderCancelIcon.svg";
import durationIcon from "../../assets/img/durationIcon.svg";
import productOrderImage from "../../assets/img/productPhoto.png";

export default function OrdersHistory() {
  const orderProducts = [
    [
      {
        id: "#35645458",
        productImage: productOrderImage,
        name: "Школьная парта",
        price: "5 900 000 so’m",
        discountPrice: "5 600 000 so’m",
        checkedIcon: checkIcon,
        titleText: "Yetkazib berildi",
      },
      {
        id: "#35645421",
        productImage: productOrderImage,
        name: "Школьная парта",
        price: "5 500 000 so’m",
        discountPrice: "5 000 000 so’m",
        checkedIcon: checkIcon,
        titleText: "Yetkazib berildi",
      },
    ],
    [
      {
        id: "#35645458",
        productImage: productOrderImage,
        name: "Школьная парта",
        price: "5 900 000 so’m",
        discountPrice: "5 600 000 so’m",
        checkedIcon: cancelIcon,
        titleText: "Bekor qilindi",
      },
    ],
    [
      {
        id: "#35645458",
        productImage: productOrderImage,
        name: "Школьная парта",
        price: "5 900 000 so’m",
        discountPrice: "5 600 000 so’m",
        checkedIcon: durationIcon,
        titleText: "Jarayonda",
      },
    ],
  ];

  return (
    <div>
      {orderProducts.map((group, groupIndex) => {
        const firstItem = group[0];

        return (
          <Accordion
            key={groupIndex}
            defaultExpanded={groupIndex === 0}
            className="accordion-order"
            elevation={0}
            square={false}
            sx={{
              borderRadius: "12px !important",
              boxShadow: "none !important",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon
                sx={{
                 
                }}
                />}
              aria-controls={`panel-${groupIndex}-content`}
              id={`panel-${groupIndex}-header`}
              sx={{
                borderRadius: "12px",
                
              }}
            >
              <div className="checked-product">
                <img src={firstItem.checkedIcon} alt="checked icon" />
                <Typography component="h3" className="checked-title">
                  {firstItem.titleText}
                </Typography>
              </div>

              <ul className="checked-product-data">
                <li>
                  <p>Sana</p>
                  <span>05.04.2023 10:47</span>
                </li>
                <li>
                  <p>Buyurtma ID raqami</p>
                  <span>{firstItem.id}</span>
                </li>
                <li>
                  <p>Buyurtma narxi</p>
                  <span>{firstItem.discountPrice}</span>
                </li>
              </ul>
            </AccordionSummary>

            <AccordionDetails>
              <ul>
                {group.map((item, index) => (
                  <li className="product-item" key={item.id || index}>
                    <div className="product-item__left">
                      <div className="product-item__image">
                        <img src={item.productImage} alt="image product" />
                      </div>

                      <div className="product-item__info">
                        <div className="product-item__name">
                          {item.name}
                          {item.discount && (
                            <span className="product-item__discount">
                              -{item.discount}%
                            </span>
                          )}
                        </div>

                        <div className="product-item__id">ID {item.id}</div>
                      </div>
                    </div>

                    <div className="product-item__price">
                        <p>Maxsulot narxi</p>
                      <span className="old">{item.price}</span>
                      <span className="new">{item.discountPrice}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
