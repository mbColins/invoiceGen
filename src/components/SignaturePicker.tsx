// import React, { useRef } from "react";
// import { View, Button, ViewStyle } from "react-native";
// import SignatureCapture from "react-native-signature-capture";

// interface SignaturePickerProps {
//   onSave?: (signatureBase64: string) => void;
//   strokeColor?: string;
//   backgroundColor?: string;
//   style?: ViewStyle;
// }

// const SignaturePicker: React.FC<SignaturePickerProps> = ({ onSave,strokeColor = "#000",backgroundColor = "#fff",style,}) => {
//   const ref = useRef<SignatureCapture>(null);

//   const saveSignature = () => {
//     ref.current?.saveImage();
//   };

//   const resetSignature = () => {
//     ref.current?.resetImage();
//   };

//   const handleSaveEvent = (result: { encoded: string; pathName: string }) => {
//     if (onSave) {
//       onSave(result.encoded);
//     }
//   };

//   return (
//     <View style={[{ flex: 1 }, style]}>
//       <SignatureCapture
//         style={{ flex: 1, borderColor: "#000033", borderWidth: 1 }}
//         ref={ref}
//         onSaveEvent={handleSaveEvent}
//         showNativeButtons={false}
//         showTitleLabel={false}
//         backgroundColor={backgroundColor}
//         strokeColor={strokeColor}
//       />
//       <Button title="Save" onPress={saveSignature} />
//       <Button title="Reset" onPress={resetSignature} />
//     </View>
//   );
// };

// export default SignaturePicker;
