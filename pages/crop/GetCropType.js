import axios from 'axios';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { VirtualizedList } from 'react-native';
import URL from '../../Url';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const GetCropType = ({ route }) => {
    const [cropTypeData, setCropTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const cropTypeDNew = route.params?.cropTypeData;
    useEffect(() => {
        cropTypeDataGet();
    }, [cropTypeDNew]);

    const cropTypeDataGet = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/croptype`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newData = response?.data
            setCropTypeData(newData);
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


    const deviceWidth = Dimensions.get('window').width;
    const threshold = -deviceWidth * 0.4;
    const Item = memo(({ item }) => {
        const dragX = useSharedValue(0);
        const height = useSharedValue(65);
        const opacity = useSharedValue(1)
        const gestureHandler = useAnimatedGestureHandler({
            onActive: (e) => {
                dragX.value = e.translationX
            },
            onEnd: (e) => {
                if (threshold < e.translationX) {
                    dragX.value = withTiming(0)
                } else {
                    dragX.value = withTiming(-deviceWidth)
                    height.value = withTiming(0)
                    opacity.value = withTiming(0)
                }
            }
        })
        const itemContainerStyles = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: dragX.value
                    }
                ],
                height: height.value,
                opacity: opacity.value,
                marginTop: opacity.value === 1 ? 10 : 0
            }
        })

        return (<PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.itemContainer, itemContainerStyles]}>
                <View style={styles.image}>
                    <MemoizedImage uri={`${URL}${item.image}`} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cropType}>{item.cropType}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </Animated.View>
        </PanGestureHandler>)
    });
    return (
        <View style={styles.container}>
            {/* ... existing code */}
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={cropTypeData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Item item={item} />}
                    // getItemCount={getItemCount}
                    // getItem={getItem}
                    ListFooterComponent={renderFooter}
                // onEndReachedThreshold={0.1}
                />
                {/* {cropTypeData.length == 0 &&
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>There is nothing to show.</Text>
                    </View>
                } */}
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
        // padding: 16,
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

