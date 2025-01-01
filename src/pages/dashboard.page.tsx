import React from "react";
import axiosInstance from "@/utils/axiosinstance";

const DashboardPage = () => {
    
      
    const handleTestRequest = async () => {
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/hello');
        } catch (error) {
            console.error("Error making API request:", error);
            
        }
    };

    return (
        <div> 
            <h1>Dashboard</h1>
            <button onClick={handleTestRequest}>Test Axios Request</button>
        </div>
    );
};

export default DashboardPage;
