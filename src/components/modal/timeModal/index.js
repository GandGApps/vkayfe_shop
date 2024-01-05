import { styles } from "./styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import closeIcon from "../../../assets/images/closeIcon.png";
import { Colors, globalStyles } from "../../../constants";

import { TimeData } from "../../data";
import { AppButton } from "../../core";

export function TimeModal(props) {
  const [activeDataIndex, setActiveDataIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(0);

  const changeFunc = () => {
    const a = `${TimeData[activeDataIndex].data[activeChildIndex]}`;
    props.timeFunc(a);
    setActiveChildIndex(0);
    setActiveDataIndex(0);
    props.modalFunc(false);
  };

  return (
    <Modal
      visible={props.visible}
      testID={"modal"}
      backdropColor={"rgba(250, 250, 250, 0.5)"}
      backdropOpacity={1}>
      <View style={styles.modalContent}>
        <View style={styles.back_button_View}>
          <TouchableOpacity onPress={() => {
            setActiveChildIndex(0);
            setActiveDataIndex(0);
            props.modalFunc(false);

          }}>
            <Image source={closeIcon} style={styles.back_button} />
          </TouchableOpacity>
        </View>
        <View style={[globalStyles.row, styles.contScroll]}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {TimeData.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.nameTime,
                    { borderWidth: activeDataIndex === index ? 1 : 0 },
                    { borderBottomColor: activeDataIndex === index ? Colors.black : Colors.borderGray },
                  ]}
                  onPress={() => {
                    setActiveDataIndex(index);
                  }}
                  key={index}>
                  <Text style={[
                    globalStyles.weightLight,
                    globalStyles.titleTextSmall,
                    styles.inp,
                    { color: activeDataIndex === index ? Colors.black : Colors.gray },
                  ]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {TimeData[activeDataIndex].data.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.nameTime,
                    { borderWidth: activeChildIndex === index ? 1 : 0 },
                    { borderBottomColor: activeChildIndex === index ? Colors.black : Colors.borderGray },
                  ]}
                  key={index}
                  onPress={() => setActiveChildIndex(index)}
                >
                  <Text
                    style={[
                      globalStyles.weightLight,
                      globalStyles.titleTextSmall,
                      styles.inp,
                      { color: activeChildIndex === index ? Colors.black : Colors.gray },
                    ]}>{item} </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <AppButton
          text={"Применить"}
          onPress={() => changeFunc()}
          stylesContainer={styles.container}
        />
      </View>
    </Modal>
  );
}
