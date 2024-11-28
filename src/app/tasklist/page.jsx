"use client"
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '@coreui/coreui/dist/css/coreui.min.css'
import {CNavbar , CContainer , CNavbarBrand , CNavbarToggler, CNavbarNav , CCollapse , CNavItem , CNavLink , CDropdownToggle , CDropdown} from '@coreui/react';
import Logout from '../logout/page'

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        startTime: '',
        endTime: '',
        priority: 1,
        status: 'pending',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [visible, setVisible] = useState(false)
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/task/getTasks' ,{
                    params: {
                        priority,
                        status,
                        sortBy,
                        sortOrder,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [priority, status, sortBy, sortOrder]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateTask = async () => {
        try {
            const response = await api.post('/task/create', newTask);
            setTasks((prev) => [...prev, response.data]);
            setNewTask({ title: '', startTime: '', endTime: '', priority: 1, status: 'pending' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}`);
            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setEditTaskId(task._id);
        setNewTask({
            title: task.title,
            startTime: task.startTime.slice(0, 16),
            endTime: task.endTime.slice(0, 16),
            priority: task.priority,
            status: task.status,
        });
    };

    const handleSaveTask = async () => {
        try {
            const response = await api.put(`/task/${editTaskId}`, newTask);
            setTasks((prev) =>
                prev.map((task) => (task._id === editTaskId ? response.data : task))
            );
            setNewTask({ title: '', startTime: '', endTime: '', priority: 1, status: 'pending' });
            setIsEditing(false);
            setEditTaskId(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

return (
    <>
        <CNavbar expand="lg" className="bg-indigo-700" colorScheme="dark">
    <CContainer fluid>
        <CNavbarBrand href=" " className='text-white text-8xl font-extrabold'>
            Todo App
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="mr-auto"> {/* Left-aligned navbar items */}
                <CNavItem className='font-bold'>
                    <CNavLink href="/tasklist" active>
                        Task List
                    </CNavLink>
                </CNavItem>

                <CNavItem className='font-bold'>
                    <CNavLink href="/dashboard" active>
                        Dashboard
                    </CNavLink>
                </CNavItem>
            </CNavbarNav>

            <CNavbarNav className="ml-auto"> {/* Right-aligned navbar items */}
                <CNavItem className='font-bold'>
                    <Logout />
                </CNavItem>
            </CNavbarNav>
        </CCollapse>
    </CContainer>
        </CNavbar>


        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {isEditing ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            isEditing ? handleSaveTask() : handleCreateTask();
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Task Title */}
                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={handleInputChange}
                            required
                            className="border rounded-lg p-2 w-full"
                        />

                        {/* Start Time */}
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={newTask.startTime}
                            onChange={handleInputChange}
                            required
                            className="border rounded-lg p-2 w-full"
                        />

                        {/* End Time */}
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={newTask.endTime}
                            onChange={handleInputChange}
                            required
                            className="border rounded-lg p-2 w-full"
                        />

                        {/* Priority */}
                        <select
                            name="priority"
                            value={newTask.priority}
                            onChange={handleInputChange}
                            required
                            className="border rounded-lg p-2 w-full"
                        >
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    Priority {value}
                                </option>
                            ))}
                        </select>

                        {/* Status */}
                        <select
                            name="status"
                            value={newTask.status}
                            onChange={handleInputChange}
                            required
                            className="border rounded-lg p-2 w-full"
                        >
                            <option value="pending">Pending</option>
                            <option value="finished">Finished</option>
                        </select>

                        {/* Submit Button */}
                        <div className="col-span-1 md:col-span-2">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                            >
                                {isEditing ? 'Save Changes' : 'Add Task'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Filter and Sort Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Filter and Sort Tasks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Priority Filter */}
                        <div>
                            <label className="block mb-1">Priority:</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">All</option>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block mb-1">Status:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>

                        {/* Sort By Filter */}
                        <div>
                            <label className="block mb-1">Sort By:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">None</option>
                                <option value="startTime">Start Time</option>
                                <option value="endTime">End Time</option>
                                <option value="priority">Priority</option>
                                <option value="status">Status</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="block mb-1">Sort Order:</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Start Time</th>
                            <th className="border border-gray-300 px-4 py-2">End Time</th>
                            <th className="border border-gray-300 px-4 py-2">Priority</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id}>
                                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(task.startTime).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(task.endTime).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}
