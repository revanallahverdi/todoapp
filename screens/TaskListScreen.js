import React, { useContext, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  FlatList
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { COLORS, SHADOWS } from '../constants/theme';

export const TaskListScreen = ({ navigation }) => {
  const { tasks, updateTaskStatus, deleteTask } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState('date');

  const formatStatus = (status) => {
    switch(status) {
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.status.localeCompare(b.status);
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskCard}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
    >
      <View style={styles.taskContent}>
        <View>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDate}>
            {new Date(item.executionDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {formatStatus(item.status)}
          </Text>
        </View>
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.danger }]}
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === 'date' ? 'status' : 'date')}
        >
          <Text style={styles.sortButtonText}>Sort by: {sortBy}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  sortButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  sortButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  addButton: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginVertical: 6,
    padding: 16,
    ...SHADOWS.small,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  statusContainer: {
    backgroundColor: COLORS.background,
    padding: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionText: {
    color: COLORS.white,
    fontWeight: '600',
  },
}); 