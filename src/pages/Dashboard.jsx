import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Card, Button } from "react-bootstrap";
import { FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/products").then(res => setTotal(res.data.length));
    }, []);

    return (
        <div className="container mt-4"></div>
    );
}