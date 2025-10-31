import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
//import OnboardingScreen from './components/OnboardingScreen';
//import ChooseRoleScreen from './components/ChooseRole';
import Dashboard from './components/Dashboard';
//import CampaignDetails from './components/CampaignDetails';
//import CreateCampaign from './components/CreateCampaign';
//import CreateOffer from './components/CreateOffer';
//import ActiveOrders from './components/ActiveOrders';
//import Proposals from './components/Proposals';
//import ExploreOffers from './components/ExploreOffers';
//import Wallet from './components/Wallet';
//import Messages from './components/Messages';
//import LeaveReview from './components/LeaveReview';
//import CreatorProfile from './components/CreatorProfile';
//import Campaigns from './components/Campaigns';
//import DashboardNew from './components/DashboardNew';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <OnboardingScreen /> */}
       {/* <ChooseRoleScreen />   */}
       <Dashboard /> 
      {/* <CampaignDetails /> */}
      {/* <CreateCampaign /> */}
      {/* <CreateOffer /> */}
      {/* <ActiveOrders /> */}
      {/* <Proposals /> */}
      {/* <ExploreOffers /> */}
      {/* <Wallet /> */}
      {/* <LeaveReview /> */}
       {/* <CreatorProfile />  */}
       {/* <Campaigns />  */}
      {/* <DashboardNew /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
