import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { COLORS, SHADOWS } from '../constants/theme';

export const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { tasks, updateTaskStatus, deleteTask } = useContext(TaskContext);
  
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(taskId, newStatus);
    Alert.alert('Success', 'Task status updated');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{task.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{task.description || 'No description'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{task.location || 'No location specified'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Execution Date</Text>
          <Text style={styles.text}>
            {new Date(task.executionDate).toLocaleString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.status, { color: getStatusColor(task.status) }]}>
            {task.status}
          </Text>
        </View>

        <View style={styles.statusButtons}>
          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#2196F3' }]}
            onPress={() => handleStatusChange('in_progress')}
          >
            <Text style={styles.buttonText}>In Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleStatusChange('completed')}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: '#F44336' }]}
            onPress={() => handleStatusChange('cancelled')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return '#4CAF50';
    case 'in_progress': return '#2196F3';
    case 'cancelled': return '#F44336';
    default: return '#757575';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    ...SHADOWS.small,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 