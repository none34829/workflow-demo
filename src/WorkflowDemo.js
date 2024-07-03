/*import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Check, Edit2, PlusCircle, AlertCircle, FileText, Clipboard, Search, File, UserCheck, Trash2, Save, List } from 'lucide-react';

const WorkflowBuilder = () => {
  const [availableTools, setAvailableTools] = useState([
    {
      name: 'Case Intake',
      icon: <Clipboard className="w-6 h-6" />,
      content: [
        { type: 'input', label: 'Client Name', value: '' },
        { type: 'select', label: 'Case Type', value: '', options: ['Contract Dispute', 'Intellectual Property', 'Employment Law', 'Corporate Law'] },
        { type: 'textarea', label: 'Case Summary', value: '' },
      ]
    },
    {
      name: 'Document Analysis',
      icon: <FileText className="w-6 h-6" />,
      content: [
        { type: 'checkbox', label: 'Contract Review', value: false },
        { type: 'checkbox', label: 'Legal Compliance Check', value: false },
        { type: 'textarea', label: 'Document Analysis Notes', value: '' },
      ]
    },
    {
      name: 'Legal Research',
      icon: <Search className="w-6 h-6" />,
      content: [
        { type: 'input', label: 'Research Topic', value: '' },
        { type: 'select', label: 'Research Database', value: '', options: ['LexisNexis', 'Westlaw', 'HeinOnline'] },
        { type: 'textarea', label: 'Research Findings', value: '' },
      ]
    },
    {
      name: 'Draft Document',
      icon: <File className="w-6 h-6" />,
      content: [
        { type: 'select', label: 'Document Type', value: '', options: ['Contract', 'Legal Memo', 'Court Filing'] },
        { type: 'textarea', label: 'Document Content', value: '' },
        { type: 'checkbox', label: 'Ready for Review', value: false },
      ]
    },
    {
      name: 'Client Review',
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        { type: 'textarea', label: 'Client Feedback', value: '' },
        { type: 'checkbox', label: 'Approved by Client', value: false },
        { type: 'input', label: 'Next Steps', value: '' },
      ]
    }
  ]);

  const [workflow, setWorkflow] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [savedWorkflows, setSavedWorkflows] = useState([]);
  const [currentWorkflowName, setCurrentWorkflowName] = useState('');
  const [isDroppableEnabled, setIsDroppableEnabled] = useState(false);

  useEffect(() => {
    // Enable Droppable after component mount
    setIsDroppableEnabled(true);
  }, []);

  const addStepToWorkflow = (tool) => {
    setWorkflow([...workflow, { ...tool, id: Date.now().toString() }]);
  };

  const removeStepFromWorkflow = (index) => {
    const newWorkflow = [...workflow];
    newWorkflow.splice(index, 1);
    setWorkflow(newWorkflow);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(workflow);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWorkflow(items);
  };

  const saveWorkflow = () => {
    if (currentWorkflowName) {
      setSavedWorkflows([...savedWorkflows, { name: currentWorkflowName, steps: workflow }]);
      setCurrentWorkflowName('');
      alert('Workflow saved successfully!');
    } else {
      alert('Please enter a name for your workflow.');
    }
  };

  const loadWorkflow = (savedWorkflow) => {
    setWorkflow(savedWorkflow.steps);
    setCurrentWorkflowName(savedWorkflow.name);
  };

  const handleContentChange = (stepIndex, contentIndex, value) => {
    const newWorkflow = [...workflow];
    newWorkflow[stepIndex].content[contentIndex].value = value;
    setWorkflow(newWorkflow);
  };

  const renderStepContent = (step, stepIndex) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">{step.name}</h3>
        {step.content.map((item, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">{item.label}</label>
            {item.type === 'input' && (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleContentChange(stepIndex, index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                disabled={!editMode}
              />
            )}
            {item.type === 'select' && (
              <select
                value={item.value}
                onChange={(e) => handleContentChange(stepIndex, index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                disabled={!editMode}
              >
                <option value="">Select {item.label}</option>
                {item.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>{option}</option>
                ))}
              </select>
            )}
            {item.type === 'textarea' && (
              <textarea
                value={item.value}
                onChange={(e) => handleContentChange(stepIndex, index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                rows="3"
                disabled={!editMode}
              ></textarea>
            )}
            {item.type === 'checkbox' && (
              <input
                type="checkbox"
                checked={item.value}
                onChange={(e) => handleContentChange(stepIndex, index, e.target.checked)}
                className="mt-1 rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                disabled={!editMode}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-green-100 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">jhana.ai Legal Workflow Builder</h1>
      
      <div className="flex mb-8">
        <div className="w-1/3 pr-4">
          <h2 className="text-xl font-semibold mb-4">Available Tools</h2>
          {availableTools.map((tool, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm flex items-center justify-between">
              <span>{tool.name}</span>
              <button onClick={() => addStepToWorkflow(tool)} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-semibold mb-4">Your Workflow</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            {isDroppableEnabled && (
              <Droppable droppableId="workflow">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] bg-white p-4 rounded-lg shadow-md ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}`}
                  >
                    {workflow.map((step, index) => (
                      <Draggable key={step.id} draggableId={step.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 bg-white rounded shadow-sm"
                          >
                            {renderStepContent(step, index)}
                            <div className="flex justify-end p-2">
                              <button onClick={() => removeStepFromWorkflow(index)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </DragDropContext>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          value={currentWorkflowName}
          onChange={(e) => setCurrentWorkflowName(e.target.value)}
          placeholder="Enter workflow name"
          className="px-4 py-2 border rounded-md"
        />
        <button
          onClick={saveWorkflow}
          className="px-6 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
        >
          <Save className="w-5 h-5 mr-2 inline-block" />
          Save Workflow
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Saved Workflows</h2>
        <div className="space-y-2">
          {savedWorkflows.map((savedWorkflow, index) => (
            <button
              key={index}
              onClick={() => loadWorkflow(savedWorkflow)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            >
              <List className="w-5 h-5 mr-2 inline-block" />
              {savedWorkflow.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
        >
          <Edit2 className="w-5 h-5 mr-2 inline-block" />
          {editMode ? 'View Mode' : 'Edit Mode'}
        </button>
      </div>
    </div>
  );
};

export default WorkflowBuilder;*/


import React, { useState } from 'react';
import { ArrowRight, Settings, PlayCircle, Clock, FileText, Book, Globe, HardDrive } from 'lucide-react';
import { Icon } from '@iconify/react';
const WorkflowDemo = () => {
  const [showSettings, setShowSettings] = useState(false);

  const steps = [
    { name: 'Input', icon: <FileText /> },
    { name: 'Process 1', icon: <Book /> },
    { name: 'Process 2', icon: <Globe /> },
    { name: 'Conditional Logic', icon: <HardDrive /> },
  ];

  const deliverables = [
    { name: 'Deliverable 1', icon: <FileText /> },
    { name: 'Deliverable 2', icon: <FileText /> },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center">
              <button 
                className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
                onClick={() => setShowSettings(true)}
              >
                {step.icon}
              </button>
              <span className="mt-2 text-sm">{step.name}</span>
            </div>
            {index < steps.length - 1 && <ArrowRight className="mx-4" />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-center mb-8">
        {deliverables.map((deliverable, index) => (
          <div key={deliverable.name} className="flex flex-col items-center mx-4">
            <button className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
              {deliverable.icon}
            </button>
            <span className="mt-2 text-sm">{deliverable.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Run Now
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Run Later
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Set Trigger Event
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Step Settings</h2>
            <div className="mb-4">
              <label className="block mb-2">Date:</label>
              <input type="date" className="border rounded px-2 py-1" />
            </div>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowSettings(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowDemo;