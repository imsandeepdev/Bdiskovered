import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import styles from './styles';

const faqList = [
  {
    id: '1',
    ques: `What is BDiskovered and how does it work?`,
    ans: `BDiskovered is revolutionizing the way designers, artists, musicians, and dancers connect with their audience and clients by enabling them to showcase their talents, find new opportunities, and build their careers all in one place. Meanwhile, BDiskovered makes it easy for businesses and organizations to discover and engage with a wide range of talents to bring freshness and excitement to their functions and events.`,
  },
  {
    id: '2',
    ques: `How can I sign up for BDiskovered, and what are the different types of user accounts?`,
    ans: `To sign up for BDiskovered, simply download the app and register your interest as a viewer, talent, or business. As a viewer, you can transform your account to a talent if you want to showcase your work on the platform. The different types of user accounts are:\n
Viewers: Can browse and discover talented individuals, watch their videos, and follow them.
Talents: Can upload their work and het get discovered.
Businesses: Can discover new talent, engage with talents, and hire them for their events.`,
  },
  {
    id: '3',
    ques: 'What types of talents can use BDiskovered to showcase their work?',
    ans: 'BDiskovered welcomes all types of talented individuals in music, dance, art, and fashion who want to showcase their work and connect with businesses and individuals.',
  },
  {
    id: '4',
    ques: 'How can I use BDiskovered to find new opportunities and connect with businesses or individuals?',
    ans: `As a talent, you can showcase your work on the platform, and businesses and individuals can discover and engage with you. You can also follow and connect with other talented individuals on the platform. As a business, you can browse through a wide range of talents, engage with them, and hire them for your events.`,
  },
  {
    id: '5',
    ques: `How can businesses and organizations use BDiskovered to discover and engage with talents?`,
    ans: `Businesses and organizations can use BDiskovered to discover and engage with a wide range of talented individuals in music, dance, art, and fashion. They can browse through their work, connect with them, and hire them for their events.`,
  },
  {
    id: '6',
    ques: `What are the fees associated with using BDiskovered, both for users and for payment to talent?`,
    ans: `BDiskovered is free to sign up for all users. There is a subscription fee for talents and businesses to discover and connect with each other’s.
Once an interest is in place and a connection is needed then a subscription is paid, and the connection is made with the Talent.`,
  },
  {
    id: '7',
    ques: `How does BDiskovered ensure the safety and security of its users' information and transactions?`,
    ans: `BDiskovered takes the safety and security of its users very seriously. The app undergoes censorship and approval prior to the release of content. The platform also uses advanced security measures to ensure the safety and security of users' information and transactions.`,
  },
  {
    id: '8',
    ques: `What kind of support does BDiskovered offer to its users?`,
    ans: `BDiskovered offers support to its users through its support team. Users can contact the support team through the app or via email.`,
  },
  {
    id: '9',
    ques: `Can I provide feedback or suggest new features for BDiskovered?`,
    ans: `Yes, users can provide feedback or suggest new features for BDiskovered through the app or via email.`,
  },
  {
    id: '10',
    ques: `What advice do you have for talent using BDiskovered?`,
    ans: `Our advice for talent using BDiskovered is to have fun while being serious about the content they upload. It's important to showcase their unique talents, style, and personality to attract the right audience and opportunities. We also encourage talent to engage with their viewers and potential connections through the app's communication tools, such as messaging and chat features, to build meaningful relationships and partnerships.`,
  },
];

const FaqScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={props.route.params?.from}
      />
      <View style={styles.topLineView}/>
      <View style={styles.mainView}>
        {props.route.params?.from == 'FAQ' ? (   
          <ScrollView 
          contentContainerStyle={{flexWrap:1}}
          showsVerticalScrollIndicator={false}
          >
            {
              faqList.map((item,index)=>{
                return (
                  <View key={index}>
                    <Text style={styles.quesText}>
                      {`${item.id}. ${item.ques}`}
                    </Text>
                    <Text style={styles.ansText}>
                      {`${item.ans}`}
                    </Text>
                  </View>
                )
              })
            }
          </ScrollView>
        ) : (
          <View style={styles.mainView1}>
            <Text style={styles.contactText}>
              {'Contact us via'}
            </Text>
            <Text style={styles.infoText}>
              {'info@bdiskovered.com'}
            </Text>
            <Text style={styles.addressText}>
              {'Lavel 1, Gate Avenue, South Zone, DIFC, Dubai, UAE'}
            </Text>
          </View>
        )}
      </View>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(FaqScreen);
