import { Colors, SignupName } from "../../../constants";
import character from "../../../assets/images/deniedMonster.png";

export const deniedData = {
  character,
  back: true,
  choose: false,
  navigationName: SignupName,
  btnText: "Подать заявку еще раз",
  title: "Отказ в регистрации Причина: ",
  denied:true,
  styleBtn: {
    borderWidth: 1,
    backgroundColor: "white",
    color: Colors.titleColor,
  },
  styleBtnText: {
    color: Colors.black,
  },
};
