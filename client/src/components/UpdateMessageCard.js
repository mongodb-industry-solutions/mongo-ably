import React, {useState} from 'react'
import Card from '@leafygreen-ui/card';

const UpdateMessageCard = ({msg}) => {
    let {_id, vehicleId, vin, make, model, year, firmwareUpdate, updateStatus} = msg
    const [expandedNodes, setExpandedNodes] = useState({}); // Initialize an empty object to track expanded nodes
    
    const tree = [
        {
            title: 'Vehicle Id',
            value: vehicleId
        },
        {
            title: 'Vin',
            value: vin
        },
        {
            title: 'Make',
            value: make
        },
        {
            title: 'Model',
            value: model
        },
        {
            title: 'Year',
            value: year
        },
        {
            title: 'Firmware Update',
            nodes: [
                {
                    title: 'Update ID',
                    value: firmwareUpdate.updateId
                },
                {
                    title: 'Current Version',
                    value: firmwareUpdate.currentVersion
                },
                {
                    title: 'New Version',
                    value: firmwareUpdate.newVersion
                },
                {
                    title: 'Release Date',
                    value: firmwareUpdate.releaseDate
                },
                {
                    title: 'Release Notes',
                    nodes: [
                        {
                            title: 'summary',
                            value: firmwareUpdate.releaseNotes?.summary
                        },
                        {
                            title: 'details',
                            nodes: firmwareUpdate.releaseNotes?.details?.map((detail, index) => (
                                {title: String(index),
                                value: detail}
                            ))
                        },
                        {
                            title: 'important Notes',
                            nodes: firmwareUpdate.releaseNotes?.importantNotes?.map((importantNote, index) => (
                                {title: String(index),
                                value: importantNote}
                            ))
                        }
                    ]
                },
                {
                    title: 'Update Process',
                    nodes: [
                        {
                            title: 'Estimated Duration',
                            value: firmwareUpdate.updateProcess?.estimatedDuration
                        },
                        {
                            title: 'Required baterry level',
                            value: firmwareUpdate.updateProcess?.requiredBatteryLevel
                        },
                        {
                            title: 'Required Network Connectivity',
                            value: firmwareUpdate.updateProcess?.requiredNetworkConnectivity
                        },
                        {
                            title: 'Pre Update Checks',
                            nodes: firmwareUpdate.updateProcess?.preUpdateChecks?.map((preUpdateCheck, index) => (
                                {title: String(index),
                                value: preUpdateCheck}
                            ))                       
                        },
                        {
                            title: 'Steps',
                            nodes: firmwareUpdate.updateProcess?.steps?.map((step, index) => (
                                {
                                    title: String(index),
                                    nodes: Object.keys(step).map(nestedStepKey => (
                                        {
                                            title: nestedStepKey,
                                            value: String(step[nestedStepKey])
                                        }
                                    ))
                                }
                            ))                       
                        },
                        {
                            title: 'Post Update Checks',
                            nodes: firmwareUpdate.updateProcess?.postUpdateActions?.map((postUpdateAction, index) => (
                                {title: String(index),
                                value: postUpdateAction}
                            ))                       
                        },
                    ]
                },
                {
                    title: 'Rollback Options',
                    nodes: [
                        {
                            title: 'Available',
                            value: String(firmwareUpdate.rollbackOption?.available)
                        },
                        {
                            title: 'Rollback Version',
                            value: firmwareUpdate.rollbackOption?.rollbackVersion
                        },
                        {
                            title: 'Conditions',
                            value: firmwareUpdate.rollbackOption?.conditions
                        }
                    ]
                }
            ]
        },
        {
            title: 'Update Status',
            nodes: [
                {
                    title: 'Status',
                    value: String(updateStatus.status)
                },
                {
                    title: 'Scheduled Time',
                    value: updateStatus.scheduledTime
                },
                {
                    title: 'User Consent',
                    value: String(updateStatus.userConsent)
                },
                {
                    title: 'Notification Methods',
                    nodes: updateStatus.notificationMethods?.map((notificationMethod, index) => (
                        {
                            title: String(index),
                            value: notificationMethod
                        }
                    ))
                },
            ]
        }
    ]

  // This function toggles the expanded state of a node
  const handleNodeToggle = (nodeId) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [nodeId]: !prevState[nodeId], // Toggle the node's expanded state
    }));
  };

    const renderTree = (nodes) => {
        return nodes.map((node, index) => {
            let id = `${_id}-${node.title.toLowerCase().trim()}-${index}`
            return (
                <div key={id}>
                    <div
                    onClick={() => handleNodeToggle(id)} // Toggle when clicked
                    style={{ cursor: 'pointer' }}
                    >
                    <p className='mb-0'> { node.nodes ? (expandedNodes[id] ? '[-]' : '[+]') : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>} <strong>{node.title}: </strong> {node.value} </p>
                    </div>
                    {expandedNodes[id] && node.nodes && ( // Render children if expanded
                    <div style={{ marginLeft: 20 }}>
                        {renderTree(node.nodes)}
                    </div>
                    )}
                </div>
                )
        });
      };
    return (
        <Card
            key={msg.id}
            className="card-styles"
            as="article"
        >
            <div>
                {renderTree(tree)}
            </div>
        </Card>
    )
}

export default UpdateMessageCard