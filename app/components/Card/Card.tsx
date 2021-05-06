import React from "react";
import { Image, View } from "react-native";
import Text from "../Text";
import cardStyles from "./styles";

interface CardProps {
  title: any;
  subTitle: any;
  image: any;
}
const Card: React.FC<CardProps> = ({ title, subTitle, image }) => {
  return (
    <View style={cardStyles.card as any}>
      <Image style={cardStyles.image} source={image} />
      <View style={cardStyles.detailsContainer}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Card;
