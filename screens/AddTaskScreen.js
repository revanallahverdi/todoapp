import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from '../context/TaskContext';
import { COLORS, SHADOWS } from '../constants/theme';

export const AddTaskScreen = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [executionDate, setExecutionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    const newTask = {
      title,
      description,
      location,
      executionDate: executionDate.toISOString(),
    };

    await addTask(newTask);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>Select Date: {executionDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={executionDate}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setExecutionDate(selectedDate);
              }
            }}
          />
        )}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    ...SHADOWS.small,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    ...SHADOWS.medium,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 