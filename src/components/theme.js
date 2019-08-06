import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    global: {
        fontFamily: "roboto"
    },

    fullContainer: {
        flex: 1,
        fontFamily: "roboto"
    },

    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },

    tabRowIcon:{
        margin: 30,
    },

    addButtonStyle: {
        borderWidth: 0,
        alignContent: "center",
        alignItems: "center",
        backgroundColor:'white',
        width: 80,
        height: 80,
        shadowColor: "grey",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 5,
        borderRadius: 300,
        marginLeft: 125,
        marginRight: 125,
        marginTop: 10,
        padding: 20,
    },

    averages: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        color: "white",
    },

    goals: {
        fontFamily: "roboto",
        borderWidth: 0,
        backgroundColor: "white",
        shadowColor: "grey",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 5,
        borderRadius: 6,
        margin: 8,
        padding: 8,
    },
    topGoals: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    goalText: {
        width: "60%",
        fontSize: 20,
        fontWeight: "bold",
    },

    dayText: {
        fontSize:20,
        fontWeight: "500",
        color: "darkgrey"

    },

    displayText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"},

    topContainer: {
        borderColor: "black",
        borderWidth: 0,
        flex: 1,
    },

    topTopContainerItems: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between',
        color: 'white',
        flex: 0.5,
    },

    bottomContainer: {
        borderColor: "black",
        borderWidth: 0,
        backgroundColor: '#f9f9f9',
        flex: 1,
        alignContent: "center"
    },

    bottomContainerItems: {
        alignContent: "flex-end"
    },


    addGoalHeader: {
        margin: 10,
        fontSize: 20,
        color: "black",
        textAlign: "center"
    },

    input: {
        fontSize: 20,
        color: "black",
        textAlign: "center",
        borderWidth: 0,
        backgroundColor: "white",
        shadowColor: "grey",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 5,
        borderRadius: 6,
        margin: 10
    }

});
