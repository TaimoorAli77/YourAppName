import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import URL from '../../Url';
import { useNavigation } from '@react-navigation/native';

export default function Disease() {
  const [diseaseName, setDiseaseName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null)
  const [diseaseData, setGetDisease] = useState([])
  const selectDiseaseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result?.assets[0]);
    }
  };
  const navigation = useNavigation()
  const submitDiseaseData = async () => {

    console.log(diseaseName, description, image, diseaseData)
    try {
      const formData = new FormData();
      formData.append('DiseaseName', diseaseName);
      formData.append('Description', description);
      if (!diseaseName) {
        setErrorMsg("Error: Disease Name is required");
        return;
      }
      if (!description) {
        setErrorMsg("Error: Description is required")
      }

      if (image) {
        formData.append('image', {
          uri: image?.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      } else {
        setErrorMsg('Error: Image is required');
        return;
      }
      setLoading(true);
      const response = await axios.post(`${URL}/disease`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },)

      alert("Submitted Disease Data")
      console.log(response?.data)
      setLoading(false)
      setDescription("")
      setDiseaseName("")
      setImage(null)
      // GetDiseaseData()
      setGetDisease(response?.data)
      navigation.navigate('DiseaseList', { diseaseData })

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const handleDiseaseName = () => {
    setDiseaseName('')
  }
  const GetDiseaseData = async () => {
    const response = await axios.get(`${URL}/disease`)
    console.log(response?.data)
    setGetDisease(response?.data)
  }
  useEffect(() => {
    GetDiseaseData();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Disease Information</Text>
      <TextInput placeholder='Disease Name' value={diseaseName} onChangeText={setDiseaseName} onPressIn={() => { setErrorMsg(null) }} style={styles.input} multiline></TextInput>
      <TextInput placeholder='Description' value={description} onChangeText={setDescription} onPressIn={() => setErrorMsg(null)} style={styles.input} multiline></TextInput>
      <TouchableOpacity onPress={selectDiseaseImage} onPressIn={() => { setErrorMsg(null) }} style={{ height: 80, width: 100 }}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} name="image" />
        ) : (
          <Image
            source={require('../../images/one.png')}
            style={styles.image}
            name="image"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Button color={'black'} style={styles.btn} title="Submit Disease Data" onPress={submitDiseaseData} />
      </TouchableOpacity>
      {/* {loading && <ActivityIndicator size="large" color="#00B386" />} */}
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00B386" />
        </View>
      }
      <Text style={{ color: 'red', fontSize: 20, marginVertical: 10 }}>{errorMsg}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  diseaseNameContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 8
  },
  diseaseNameLabel: {
    color: 'black',
    fontSize: 16
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    marginTop: 25,
    // paddingTop:20

  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginTop: 12,
    marginBottom: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 16
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 8,
    flexDirection: 'row', // Arrange the Text and TextInput horizontally
  },
  placeholder: {
    color: 'black',
    fontSize: 16,
    marginRight: 8, // Add some space between placeholder and input
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: 'red'
  }
})