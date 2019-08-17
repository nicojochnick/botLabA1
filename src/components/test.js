import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';





export default function Users() {
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [loading, setLoading] = useState(true); // Set loading to true on component mount

    // On load, fetch our users and subscribe to updates
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .onSnapshot((querySnapshot) => {
                // Add users into an array
                const users = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id, // required for FlatList
                    };
                });

                // Update state with the users array
                setUsers(users);

                // As this can trigger multiple times, only update loading after the first update
                if (loading) {
                    setLoading(false);
                }
            });

        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
    }, []);

    if (loading) {
        return null; // Show a loading spinner
    }

    return (
        <FlatList
            data={users}
            renderItem={({item}) => <Text>{item.key}</Text>}
        />
    );
}
