import * as React from "react"
import Svg, { SvgProps, G, Path, Text, TSpan } from "react-native-svg"

function ShedrLogo(props: SvgProps) {
return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={576}
    height={711}
    viewBox="0 0 576 711"
    {...props}
    >
    <G fill="none">
        <Path d="M288 0l288 498H0z" />
        <Path
        d="M288 29.963L26.003 483h523.995L288 29.963M288 0l288 498H0L288 0z"
        fill="#111"
        />
    </G>
    <Text
        transform="translate(99 679)"
        fill="#fff"
        fontSize={150}
        fontFamily="HelveticaNeue, Helvetica Neue"
    >
        <TSpan x={0} y={0}>
        {"shedr"}
        </TSpan>
    </Text>
    </Svg>
)
}

export default ShedrLogo