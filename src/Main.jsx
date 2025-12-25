import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import {View} from "react-native";

const Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppBar />
            <RepositoryList />
        </View>
    );
};

export default Main;