import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import URL from '../../Url';
import axios from 'axios';

const WProgressReport = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [weekNumber, setWeekNumber] = useState('');
    const [size, setSize] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [notes, setNotes] = useState('');
    const [weeklyGrowthData, setWeeklyGrowthData] = useState([]);
    const [cropType, setCropType] = useState([])

    useEffect(() => {
        GetCropType()
    }, []);
    const GetCropType = async () => {
        try {
            const response = await axios.get(`${URL}/croptype`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response?.status === 200) {
                console.log("Success");
                console.log(response?.data)
                setCropType(response?.data);
                return;
            }
            else {
                throw new Error("Failed to fetch crop type data for WP_Report")
            }


        } catch (error) {
            console.log("Error Fetching crop type data for WP_Report", error)

        }
    }
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const getHeader = () => {
        <Text style={styles.heading}>Crops Weekly Growth</Text>
    }
    const getFooter = () => {

    }

    const submitWeeklyGrowth = () => {
        // Add the new weekly growth data to the array
        setWeeklyGrowthData((prevData) => [
            ...prevData,
            { weekNumber, size, imageURL, notes },
        ]);

        // Reset form fields
        setWeekNumber('');
        setSize('');
        setImageURL('');
        setNotes('');

        // Close the modal
        setModalVisible(false);
    };

    const renderWeeklyGrowthItem = ({ item }) => (
        <View style={styles.card}>
            <Text >Week {item.weekNumber}</Text>
            <Text>Size: {item.size}</Text>
            {item.imageURL && <Image source={{ uri: item.imageURL }} style={styles.image} />}
            <Text>Notes: {item.notes}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* <ScrollView> */}
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
            >
                {/* <Text style={styles.heading}>Crops Weekly Growth</Text> */}
                {cropType && cropType.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.heading}>{item.cropType} crop</Text>
                        <FlatList
                            data={weeklyGrowthData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderWeeklyGrowthItem}
                            ListHeaderComponent={getHeader}
                        // ListFooterComponent={getFooter}
                        />
                        {/* <Button  onPress={openModal} style={styles.btn}/> */}
                        <TouchableOpacity style={styles.btn} >
                            <Button style={styles.btn} color={'#00b386'} title="Add Weekly Growth" onPress={openModal} />
                        </TouchableOpacity>
                    </View>
                ))}
                {/* Button to Add Weekly Growth */}

                {/* Modal for Adding Weekly Growth */}
                <Modal visible={modalVisible} onRequestClose={closeModal}>
                    <View style={styles.modalContainer}>
                        <Text>Add Weekly Growth</Text>
                        <TextInput
                            placeholder="Week Number"
                            value={weekNumber}
                            onChangeText={(text) => setWeekNumber(text)}
                        />
                        <TextInput
                            placeholder="Size"
                            value={size}
                            onChangeText={(text) => setSize(text)}
                        />
                        <TextInput
                            placeholder="Image URL"
                            value={imageURL}
                            onChangeText={(text) => setImageURL(text)}
                        />
                        <TextInput
                            placeholder="Notes"
                            value={notes}
                            onChangeText={(text) => setNotes(text)}
                        />
                        <Button title="Submit" onPress={submitWeeklyGrowth} />
                        <Button title="Cancel" onPress={closeModal} />
                    </View>
                </Modal>

                {/* Button to View Weekly Growth */}
                {/* <Button title="View Weekly Growth of Crop" onPress={() => { }} /> */}

                {/* FlatList to Display Weekly Growth */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        flexDirection: 'row', // Horizontal layout
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 2,
        marginRight: 5
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        // paddingTop: 5,
        paddingBottom: 15,
        color: 'green'
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 8,
        borderRadius: 8,
    },
    btn: {
        elevation: 0,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 20
    },
});

export default WProgressReport;
