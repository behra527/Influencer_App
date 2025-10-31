import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const Messages = ({ navigation }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alex Doe',
      isUser: false,
      text: "Hey Olivia! I saw your profile on Adsbarter and I'm really impressed with your work. I think you'd be a perfect fit for our new campaign.",
      time: '10:30 AM',
      isOffer: false
    },
    {
      id: 2,
      sender: 'You',
      isUser: true,
      text: "Hi Alex, thank you! I'm glad you liked my portfolio. I'd love to hear more about the campaign.",
      time: '10:31 AM',
      isOffer: false
    },
    {
      id: 3,
      sender: 'Alex Doe',
      isUser: false,
      text: "Here are the details of the offer:",
      time: '10:35 AM',
      isOffer: false
    },
    {
      id: 4,
      sender: 'Alex Doe',
      isUser: false,
      text: "",
      time: '10:35 AM',
      isOffer: true,
      offerData: {
        title: 'EcoWear Summer Line',
        budget: '$500',
        description: "We're looking for a creator to produce 2 TikTok videos showcasing our new sustainable summer collection.",
        image: '👕👗👡👒🕶️🌸'
      }
    },
    {
      id: 5,
      sender: 'You',
      isUser: true,
      text: "This looks fantastic! I've reviewed the offer and I'm very interested. Let's do it!",
      time: '10:40 AM',
      isOffer: false
    },
    {
      id: 6,
      sender: 'Alex Doe',
      isUser: false,
      text: "Great! I've just sent over the official hire request through the platform. Please accept it when you get a chance.",
      time: '10:41 AM',
      isOffer: false
    }
  ]);
  const scrollViewRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        isUser: true,
        text: messageText.trim(),
        time: getCurrentTime(),
        isOffer: false
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText('');
      
      // Scroll to bottom after adding message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleFileAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newMessage = {
          id: messages.length + 1,
          sender: 'You',
          isUser: true,
          text: `📎 ${file.name}`,
          time: getCurrentTime(),
          isOffer: false,
          isFile: true,
          fileName: file.name,
          fileSize: file.size,
          fileUri: file.uri
        };
        
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        // Scroll to bottom after adding file
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        
        Alert.alert('File Added', `File "${file.name}" has been attached to the conversation.`);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to attach file. Please try again.');
    }
  };

  const handleViewOffer = () => {
    // Navigate to offer details
    console.log('View Offer pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>AD</Text>
            </View>
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Doe</Text>
            <Text style={styles.profileTitle}>Fashion & Lifestyle Creator</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#2d3748" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Date Separator */}
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {/* Messages */}
            {messages.map((message) => (
              <View key={message.id} style={styles.messageContainer}>
                {message.isFile ? (
                  <View style={[
                    styles.messageBubble,
                    styles.userMessage,
                    styles.fileMessage
                  ]}>
                    <View style={styles.fileContainer}>
                      <MaterialIcons name="attach-file" size={20} color="#3b82f6" />
                      <View style={styles.fileInfo}>
                        <Text style={styles.fileName}>{message.fileName}</Text>
                        <Text style={styles.fileSize}>
                          {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : 'Unknown size'}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.messageTime, styles.userMessageTime]}>
                      {message.time}
                    </Text>
                  </View>
                ) : message.isOffer ? (
              <View style={styles.offerCard}>
                <View style={styles.offerImageContainer}>
                  <Text style={styles.offerImageText}>{message.offerData.image}</Text>
                </View>
                <View style={styles.offerDetails}>
                  <Text style={styles.offerTitle}>{message.offerData.title}</Text>
                  <Text style={styles.offerBudget}>Budget: {message.offerData.budget}</Text>
                  <Text style={styles.offerDescription}>{message.offerData.description}</Text>
                  <TouchableOpacity style={styles.viewOfferButton} onPress={handleViewOffer}>
                    <Text style={styles.viewOfferText}>View Offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.senderMessage
              ]}>
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.senderMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.isUser ? styles.userMessageTime : styles.senderMessageTime
                ]}>
                  {message.time}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton} onPress={handleFileAttachment}>
          <MaterialIcons name="attach-file" size={24} color="#6b7280" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#6b7280" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#6b7280" />
          <Text style={styles.navText}>Offers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="chat" size={24} color="#3b82f6" />
          <Text style={[styles.navText, styles.activeNavText]}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="shopping-bag" size={24} color="#6b7280" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#6b7280" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  profileTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateText: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 12,
    color: '#6b7280',
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
  },
  senderMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  senderMessageText: {
    color: '#2d3748',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  userMessageTime: {
    color: '#ffffff',
    opacity: 0.8,
  },
  senderMessageTime: {
    color: '#6b7280',
  },
  offerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  offerImageText: {
    fontSize: 24,
  },
  offerDetails: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  offerBudget: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
    marginBottom: 12,
  },
  viewOfferButton: {
    backgroundColor: '#a78bfa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewOfferText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  activeNavText: {
    color: '#3b82f6',
  },
  fileMessage: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInfo: {
    marginLeft: 8,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  fileSize: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 2,
  },
});

export default Messages;
