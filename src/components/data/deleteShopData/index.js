import { Colors, ShopDataName, SignupName } from "../../../constants";
import character from "../../../assets/images/deniedMonster.png";
import { globalHeight } from "../../dimensions";

export const DeleteShopData = {
  character,
  back: true,
  choose: false,
  navigationName: ShopDataName,
  btnText: "Назад",
  title: "Вы уверены, что хотите удалить магазин? \n Все ваши товары, финансовые отчеты и т.д. автоматически удалятся!",
  deleteText:'Удалить магазин',
  deleteBtnStyle:{
    backgroundColor:Colors.red,
    marginBottom:globalHeight(7)
  },
  styleBtn: {
    borderWidth: 1,
    backgroundColor: "white",
    color: Colors.titleColor,
  },
  styleBtnText: {
    color: Colors.black,
  },
};
