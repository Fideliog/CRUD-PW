import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nome: "",
        preco: "",
        ativo: true,
        data_criacao: new Date().toISOString().split("T")[0],
        data_atualizacao: new Date().toISOString().split("T")[0]
    });
        
    useEffect (() => {
        if (id) {
            api.get(`/products/${id}`).then(res => setProduct (res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({...product, [name]: type === "checkbox" ? checked: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await api.put("/products/${id}", product);
        } else {
            await api.post("/products", product);
        }
        navigate("/products");
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar Produto": "Novo Produto"}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={product.nome}
                        onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" name="preco" value={product.preco} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Ativo" name="ativo" checked={product.ativo} onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="success">Salvar</Button>
            </Form>
        </div>
    );
}