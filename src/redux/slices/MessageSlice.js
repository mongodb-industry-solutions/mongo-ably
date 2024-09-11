import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const MessageSlice = createSlice({
    name: "Message",
    initialState: {
        filter: '',
        list: [
            // {
            //     "id": "5cf10d16-de86-4499-9fba-143078842f2c",
            //     "content": "Another message for you!",
            //     "timestamp": "2024-09-03T00:32:45.960Z"
            // }
        ],
        updates: [
            // {
            //     "_id": "66d5f862cb3c467a1acbe984",
            //     "vehicleId": "1HGCM82633A123456",
            //     "vin": "1HGCM82633A123456",
            //     "make": "Renault",
            //     "model": "Mégane",
            //     "year": 2021,
            //     "firmwareUpdate": {
            //         "updateId": "FWU-2024-09-01-001",
            //         "currentVersion": "v2.5.3",
            //         "newVersion": "v2.6.0",
            //         "releaseDate": "2024-09-01T00:00:00Z",
            //         "releaseNotes": {
            //             "summary": "This firmware update enhances the vehicle's infotainment system and improves overall system stability.",
            //             "details": [
            //                 "Enhanced GPS navigation accuracy",
            //                 "Improved Bluetooth connectivity",
            //                 "Fixed issues with voice recognition",
            //                 "Security patches for known vulnerabilities",
            //                 "Optimized battery management for electric models"
            //             ],
            //             "importantNotes": [
            //                 "The vehicle will be inoperable during the update process, which may take up to 30 minutes.",
            //                 "Ensure the vehicle is parked in a safe location with stable internet connectivity.",
            //                 "Do not turn off the ignition or attempt to drive the vehicle during the update."
            //             ]
            //         },
            //         "updateProcess": {
            //             "estimatedDuration": "30 minutes",
            //             "requiredBatteryLevel": "50%",
            //             "requiredNetworkConnectivity": "Wi-Fi or 4G LTE",
            //             "preUpdateChecks": [
            //                 "Battery level check",
            //                 "Network connectivity check",
            //                 "System diagnostics"
            //             ],
            //             "steps": [
            //                 {
            //                     "stepNumber": 1,
            //                     "description": "Download firmware package",
            //                     "estimatedDuration": "10 minutes"
            //                 },
            //                 {
            //                     "stepNumber": 2,
            //                     "description": "Verify package integrity",
            //                     "estimatedDuration": "5 minutes"
            //                 },
            //                 {
            //                     "stepNumber": 3,
            //                     "description": "Install firmware",
            //                     "estimatedDuration": "10 minutes"
            //                 },
            //                 {
            //                     "stepNumber": 4,
            //                     "description": "Reboot and apply settings",
            //                     "estimatedDuration": "5 minutes"
            //                 }
            //             ],
            //             "postUpdateActions": [
            //                 "Reboot vehicle systems",
            //                 "Perform system diagnostics",
            //                 "Notify the user via in-vehicle notifications"
            //             ]
            //         },
            //         "rollbackOption": {
            //             "available": true,
            //             "rollbackVersion": "v2.5.3",
            //             "conditions": "Rollback is only possible within 24 hours of update if any critical issues are detected."
            //         }
            //     },
            //     "updateStatus": {
            //         "status": "pending",
            //         "scheduledTime": "2024-09-02T02:00:00Z",
            //         "userConsent": true,
            //         "notificationMethods": [
            //             "email",
            //             "in-vehicle notification",
            //             "mobile app notification"
            //         ]
            //     }
            // }
        ]
    },
    reducers: {
        setFilterMessage: (state, action) => {
            return {...state, filter: action.payload}
        },
        addMessageToList: (state, action) => {
            return {...state, list: [...state.list, {...action.payload}]}
        },
        addMessagesToList: (state, action) => {
            console.log(action.payload)
            return {...state, list: [...state.list, ...action.payload]}
        },
        removeMessageFromList: (state, action) => {
            state.list = state.list.filter(message => message.id !== action.payload.id)
            return state
        },
        addMessageToUpdates: (state, action) => {
            return {...state, updates: [...state.updates, {...action.payload}]}
        },
        addMessagesToUpdates: (state, action) => {
            console.log(action.payload)
            return {...state, updates: [...state.updates, ...action.payload]}
        },
        removeMessageFromUpdates: (state, action) => {
            state.updates = state.updates.filter(message => message.id !== action.payload.id)
            return state
        }
    }
})

export const {
    addMessageToList, 
    addMessagesToList,
    removeMessageFromList, 
    setFilterMessage,
    addMessageToUpdates,
    addMessagesToUpdates,
    removeMessageFromUpdates
} = MessageSlice.actions

export default MessageSlice.reducer
