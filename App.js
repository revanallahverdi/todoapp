import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskListScreen } from './screens/TaskListScreen';
import { AddTaskScreen } from './screens/AddTaskScreen';
import { TaskDetailScreen } from './screens/TaskDetailScreen';
import { TaskProvider } from './context/TaskContext';
import { EditTaskScreen } from './screens/EditTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen 
            name="TaskList" 
            component={TaskListScreen} 
            options={{ title: 'My Tasks' }}
          />
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen} 
            options={{ title: 'Add New Task' }}
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen} 
            options={{ title: 'Task Details' }}
          />
          <Stack.Screen 
            name="EditTask" 
            component={EditTaskScreen} 
            options={{ title: 'Edit Task' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
