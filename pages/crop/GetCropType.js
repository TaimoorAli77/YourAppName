import axios from 'axios';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { VirtualizedList } from 'react-native';
import URL from '../../Url';

const GetCropType = ({ route }) => {
    const [cropTypeData, setCropTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const cropTypeDNew = route.params?.cropTypeData;

    useEffect(() => {
        cropTypeDataGet();
        if (cropTypeDNew != null) {
            setCropTypeData(cropTypeDNew)
        }
    }, []);

    const cropTypeDataGet = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/croptype?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newData = response?.data?.slice().reverse();

            // Check if there is more data available
            if (newData.length === 0) {
                setHasMoreData(false);
                return;
            }

            setCropTypeData((prevData) => [...prevData, ...newData]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    const getItemCount = (data) => {
        return data.length;
    };

    const getItem = (data, index) => {
        const item = data[index];
        return {
            id: item?._id,
            image: item?.image,
            cropType: item?.cropType,
            description: item?.description,
        };
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#00B386" /> : null;
    };
    const MemoizedImage = memo(({ uri }) => (
        <Image source={{ uri }} style={{ width: 70, height: 70 }} />
    ));

    const Item = memo(({ item }) => (
        <View style={styles.itemContainer} key={item?._id}>
            <View style={styles.image}>
                <MemoizedImage uri={`${URL}${item.image}`} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cropType}>{item.cropType}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    ), (prevProps, nextProps) => {
        return prevProps.item._id === nextProps.item._id;
    });


    const End = () => {
        return <View><Text>End of Data.</Text> </View>
    };

    const handleEndReached = () => {
        if (!loading) {
            // cropTypeDataGet();
            End();
        }
    };

    return (
        <View style={styles.container}>
            {/* ... existing code */}
            <SafeAreaView style={{ flex: 1 }}>
                <VirtualizedList
                    data={cropTypeData || null}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item item={item} />}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                />
            </SafeAreaView>
        </View>
    );
};

export default GetCropType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        flex: 1,
        // width: 20,
        // height: 50,
        // borderRadius: 25,
        // paddingEnd: 35,
    },
    textContainer: {
        flex: 2,
        marginStart: 5,
        padding: 10

    },
    cropType: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    headingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headingRow: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // flex:1,

        marginBottom: 10,
        backgroundColor: '#00d1da', // Optional: Add a background color for the heading row
    },
    headingCell: {
        flex: 1,
        fontWeight: 'bold',
        padding: 10,
    },
    cropDesc: {
        // paddingEnd: 0,
        flex: 2,
        fontWeight: 'bold',
        // alignItems:'flex-start',
        // alignContent:'flex-start',
        textAlign: 'left',
        padding: 10

    }
});

