import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

interface UseImagePickerResult {
  imageUri: string | null;
  pickImage: () => void;
  clearImage: () => void;
}

const useImagePicker = (): UseImagePickerResult => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // Guard against undefined
          setImageUri(response.assets?.[0].uri ?? null);
        }
      }
    );
  };

  const clearImage = () => setImageUri(null);

  return { imageUri, pickImage, clearImage };
};

export default useImagePicker;
