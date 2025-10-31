import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';

interface SignatureProps {
  onSave: (signature: string) => void;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
}

export interface SignatureRef {
  clear: () => void;
  save: () => void; // manually trigger saving
}

const SignatureScreen = forwardRef<SignatureRef, SignatureProps>(
  (
    {
      onSave,
      width = Dimensions.get('window').width - 40,
      height = 180,
      penColor = '#000000',
      backgroundColor = '#ffffff',
    },
    ref
  ) => {
    const signatureRef = useRef<SignatureViewRef>(null);

    // Expose clear & save to parent
    useImperativeHandle(ref, () => ({
      clear: () => signatureRef.current?.clearSignature?.(),
      save: () => signatureRef.current?.readSignature?.(), // triggers onOK
    }));

    // This receives the signature base64
    const handleOK = (signature: string) => {
      console.log('Signature captured:', signature.substring(0, 50) + '...');
      onSave(signature);
    };

    const webStyle = `
      .m-signature-pad--footer {display: none;}
      .m-signature-pad {box-shadow: none; border: none;}
      body, html { background: ${backgroundColor}; }
      canvas { background: ${backgroundColor}; border-radius: 8px; }
    `;

    return (
      <View style={styles.container}>
        <View style={[styles.preview, { width, height }]}>
          <SignatureCanvas
            ref={signatureRef}
            onOK={handleOK}       // ✅ receives the signature
            onEmpty={() => console.log('Empty signature')}
            descriptionText="Sign here"
            webStyle={webStyle}
            penColor={penColor}
            backgroundColor={backgroundColor}
            autoClear={false}
            webviewProps={{
              androidLayerType: 'hardware',
              cacheEnabled: false,
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
  preview: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden' },
});

export default SignatureScreen;
