import React, { useContext, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  Dimensions 
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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
    <View style={styles.rowFront}>
      <TouchableOpacity 
        style={styles.taskItem}
        onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
        activeOpacity={1}
      >
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
      </TouchableOpacity>
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <View style={styles.statusActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.success }]}
          onPress={() => updateTaskStatus(item.id, 'completed')}
        >
          <Text style={styles.actionText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.warning }]}
          onPress={() => updateTaskStatus(item.id, 'in_progress')}
        >
          <Text style={styles.actionText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.danger }]}
          onPress={() => updateTaskStatus(item.id, 'cancelled')}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.primaryLight }]}
          onPress={() => navigation.navigate('EditTask', { task: item })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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

      <SwipeListView
        data={sortedTasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        leftOpenValue={220}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        keyExtractor={item => item.id}
        style={styles.list}
        swipeToOpenPercent={30}
        disableRightSwipe={false}
        disableLeftSwipe={false}
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
  rowFront: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginVertical: 6,
    height: 80,
    ...SHADOWS.small,
  },
  taskItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 6,
    height: 80,
  },
  statusActions: {
    flexDirection: 'row',
    gap: 8,
    height: '100%',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: '100%',
    borderRadius: 12,
    ...SHADOWS.small,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    width: 68,
    height: '100%',
    borderRadius: 12,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 8,
    height: '100%',
  },
}); 