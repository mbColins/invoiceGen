import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
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
    const [signature, setSignature] = useState<string | null>(null);
    const signatureRef = useRef<SignatureViewRef>(null);

    // Expose clear to parent
    useImperativeHandle(ref, () => ({
      clear: () => {
        setSignature(null);
        signatureRef.current?.clearSignature?.();
      },
    }));

    const handleSignature = (sig: string) => {
      console.log('Signature captured:', sig.substring(0, 50) + '...');
      setSignature(sig);
      onSave(sig);
    };

    const webStyle = `
      .m-signature-pad--footer {display: none; margin: 0px;}
      .m-signature-pad {box-shadow: none; border: none;}
      body, html { background: ${backgroundColor}; }
      canvas { background: ${backgroundColor}; border-radius: 8px; }
    `;

    return (
      <View style={styles.container}>
        {/* Signature preview */}
        {signature ? (
          <Image
            resizeMode="contain"
            style={[styles.preview, { width, height }]}
            source={{ uri: signature }}
          />
        ) : (
          <View style={[styles.preview, { width, height }]}>
            <SignatureCanvas
              ref={signatureRef}
              onOK={handleSignature}
              onEmpty={() => console.log('Empty signature')}
              descriptionText="Sign here"
              clearText="Clear"
              confirmText="Save"
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
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  preview: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default SignatureScreen;
