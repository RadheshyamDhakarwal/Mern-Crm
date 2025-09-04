import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import api from '../../http';

const Task = ({selectedEmployee,selectedDate}) => {
  const [tasks, setTasks] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [remark, setRemark] = useState('');

  const users = (localStorage.getItem("user"));
  const _id = selectedEmployee||users?.id;

  useEffect(() => {
    fetchTasks();
  }, [selectedEmployee,selectedDate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`task/user-today/${_id}?date=${selectedDate || new Date().toISOString().split('T')[0]}`);
      const taskData = res.data.tasks;
      const leadData = res.data.leads;
        // console.log(res);
        
      const tasksWithLeads = taskData.map(task => ({
        ...task,
        leads: leadData.filter(lead => lead.taskID === task._id)
      }));

      setTasks(tasksWithLeads);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleUpdateClick = (task) => {
    setModalData(task);
  };

  const handleModalChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

 

  const initialData = {
    columns: {
      Todo: { id: "Todo", title: "Todo", bgColor: "#E6F0F2", tasks: [] },
      Progress: { id: "Progress", title: "Progress", bgColor: "#DFF6FF", tasks: [] },
      Pending: { id: "Pending", title: "Pending", bgColor: "#fff2ca", tasks: [] },
      Done: { id: "Done", title: "Done", bgColor: '#c5ffe4', tasks: [] },
    },
    columnOrder: ["Todo", "Progress", "Pending", "Done"],
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const updatedData = {
      columns: {
        Todo: { ...data.columns.Todo, tasks: [] },
        Progress: { ...data.columns.Progress, tasks: [] },
        Pending: { ...data.columns.Pending, tasks: [] },
        Done: { ...data.columns.Done, tasks: [] },
      },
      columnOrder: data.columnOrder,
    };
  
    tasks.forEach(task => {
      const status = task.Status || "Todo";
      if (updatedData.columns[status]) {
        updatedData.columns[status].tasks.push(task);
      }
    });
  
    setData(updatedData);
  }, [tasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);
      const newColumn = { ...start, tasks: newTasks };
      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // For status changes that require remarks
    if (["Pending", "Done"].includes(finish.id)) {
      const [moved] = data.columns[source.droppableId].tasks.filter(t => t._id === draggableId);
      setCurrentTask(moved);
      setShowRemarkModal(true);
      return;
    }

    // For other status changes
    await updateTaskStatus(draggableId, finish.id);
    
    // Optimistically update UI
    const startTasks = Array.from(start.tasks);
    const [moved] = startTasks.splice(source.index, 1);
    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, moved);

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [start.id]: { ...start, tasks: startTasks },
        [finish.id]: { ...finish, tasks: finishTasks },
      },
    };

    setData(newData);
  };

  const updateTaskStatus = async (taskId, status, remark = '') => {
    try {
      await api.put('https://api.sevenunique.com/api/task/update-status', {
        taskId,
        Status: status,
        remark
      });
      toast.success(`Task status updated to ${status}`);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status");
      console.error(error);
    }
  };

  const handleRemarkSubmit = async () => {
    if (currentTask) {
      const newStatus = data.columnOrder.find(col => 
        ["Pending", "Done"].includes(col) && col !== currentTask.Status
      );
      
      if (newStatus) {
        await updateTaskStatus(currentTask._id, newStatus, remark);
        
        // Update UI optimistically
        const sourceCol = data.columns[currentTask.Status || "Todo"];
        const destCol = data.columns[newStatus];
        
        const sourceTasks = sourceCol.tasks.filter(t => t._id !== currentTask._id);
        const destTasks = [...destCol.tasks, {...currentTask, Status: newStatus}];
        
        setData({
          ...data,
          columns: {
            ...data.columns,
            [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
            [destCol.id]: { ...destCol, tasks: destTasks },
          }
        });
      }
      
      setShowRemarkModal(false);
      setRemark('');
      setCurrentTask(null);
    }
  };

  const TaskCard = ({ task, index }) => (
    
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        
        
        <div
          className="card mb-3 p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 10px rgba(0,0,0,0.3)" : "",
          }}
        >
          <div className="card-body">
            <h5 className="card-title fw-semibold">{task.title}</h5>
            <p className="text-muted small mb-1">{task.description}</p>
            <p className="text-muted small mb-1">Assigned by: {task.assignedBy.name}</p>
            <p className="text-muted small mb-1">Date: {new Date(task.createdAt).toLocaleDateString()}</p>
            <p className="text-muted small">Status: {task.Status}</p>
            {task.remark && (
              <p className="text-muted small">
                Remark: <span className="fst-italic">{task.remark}</span>
              </p>
            )}
            <div className="d-grid">
            {task && task.leads.length > 0 && (
        <Link to={`viewlead/${task._id}`}>
          <button className="btn btn-sm btn-info">
            View Lead
          </button>
        </Link>
      )}
            </div>
          </div>
        </div>
      )
      }
    </Draggable>
  );

  const Column = ({ column, tasks }) => (
    <div className="col-sm-6 col-md-3 mb-4">
      <div className="p-3 rounded" style={{ backgroundColor: column.bgColor }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="h6">{column.title}</h5>
          <span className="badge bg-primary">{tasks.length}</span>
        </div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-vh-25 ${snapshot.isDraggingOver ? "bg-light p-2 rounded" : ""}`}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <section className="">
        <div className="card">
          <div className="card-header">
            <h4>Today's Tasks</h4>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row">
            {data.columnOrder.map(columnId => {
              const column = data.columns[columnId];
              const columnTasks = column.tasks;
              return <Column key={columnId} column={column} tasks={columnTasks} />;
            })}
          </div>
        </DragDropContext>
      </section>

     

      {/* Remark Modal */}
      <Modal show={showRemarkModal} onHide={() => setShowRemarkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Remark for {currentTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Status will be changed to: 
              <span className="fw-bold ms-2">
                {data.columnOrder.find(col => 
                  ["Pending", "Done"].includes(col) && col !== currentTask?.Status
                )}
              </span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter remark..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="mt-2"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowRemarkModal(false);
            setRemark('');
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRemarkSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Task;