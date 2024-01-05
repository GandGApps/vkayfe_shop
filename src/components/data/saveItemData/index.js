import character from "../../../assets/images/characterChoose.png";
import { AddName, Colors, HomeScreenName } from "../../../constants";
import { globalHeight } from "../../dimensions";


export const SaveItemData = {
  character,
  back: false,
  choose: false,
  navigationName: 'TabNavigation',
  btnText: "Мои товары",
  title: "Товар опубликован!",
  deleteText:'Создать еще товар',
  deleteBtnStyle:{
    marginBottom:globalHeight(7),
  },
  styleBtn: {
    borderWidth: 1,
    backgroundColor: "white",
    color: Colors.titleColor,
  },
  styleBtnText: {
    color: Colors.black,
  },
}
